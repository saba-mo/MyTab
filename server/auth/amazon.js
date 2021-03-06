const passport = require('passport')
const router = require('express').Router()
const AmazonStrategy = require('passport-amazon').Strategy
const {User} = require('../db/models')
module.exports = router

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
