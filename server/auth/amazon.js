const passport = require('passport')
const router = require('express').Router()
const AmazonStrategy = require('passport-amazon').Strategy
const {User} = require('../db/models')
module.exports = router

/**
 * For OAuth keys and other secrets, your Node process will search
 * process.env to find environment variables. On your production server,
 * you will be able to set these environment variables with the appropriate
 * values. In development, a good practice is to keep a separate file with
 * these secrets that you only share with your team - it should NOT be tracked
 * by git! In this case, you may use a file called `secrets.js`, which will
 * set these environment variables like so:
 *
 * process.env.GOOGLE_CLIENT_ID = 'your google client id'
 * process.env.GOOGLE_CLIENT_SECRET = 'your google client secret'
 * process.env.GOOGLE_CALLBACK = '/your/google/callback'
 */

if (!process.env.CLIENT_ID || !process.env.CLIENT_SECRET) {
  console.log('Amazon client ID / secret not found. Skipping Amazon OAuth.')
} else {
  const amazonConfig = {
    clientID: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    callbackURL: process.env.REDIRECT_URI,
  }

  const strategy = new AmazonStrategy(
    amazonConfig,
    (token, refreshToken, profile, done) => {
      console.log('profile', profile)
      const amazonId = profile.id
      const email = profile.emails[0].value
      const name = profile.displayName
      const firstName = name.split(' ')[0]
      let lastName = name.split(' ')[1]
      if (!lastName) {
        lastName = '-'
      }

      User.findOrCreate({
        where: {amazonId},
        defaults: {email, firstName, lastName},
      })
        .then(([user]) => done(null, user))
        .catch(done)
    }
  )
  //amazon

  passport.use(strategy)

  router.get('/', passport.authenticate('amazon', {scope: ['profile']}))

  router.get(
    '/callback',
    passport.authenticate('amazon', {
      successRedirect: '/home',
      failureRedirect: '/login',
    })
  )
}
