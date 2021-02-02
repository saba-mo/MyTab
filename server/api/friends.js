const router = require('express').Router()
const {User} = require('../db/models')

router.get('/:userId', async (req, res, next) => {
  try {
    console.log('magic: ', Object.keys(User.prototype))
    const thisUser = await User.findByPk(req.params.userId)
    const friends = await thisUser.getFriends({
      attributes: ['firstName', 'lastName', 'email'],
    })

    res.json(friends)
  } catch (err) {
    next(err)
  }
})

module.exports = router
