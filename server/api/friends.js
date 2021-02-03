const router = require('express').Router()
const {User} = require('../db/models')

// GET all of user's friends
router.get('/:userId', async (req, res, next) => {
  try {
    const id = parseInt(req.params.userId)
    if (isNaN(id)) return res.sendStatus(404)

    const thisUser = await User.findByPk(id)
    if (!thisUser) return res.sendStatus(404)

    const friends = await thisUser.getFriends({
      attributes: ['firstName', 'lastName', 'email'],
    })

    res.json(friends)
  } catch (err) {
    next(err)
  }
})

// GET individual friend
router.get('/:userId/:friendId', async (req, res, next) => {
  try {
    const friendId = parseInt(req.params.friendId)
    if (isNaN(friendId)) return res.sendStatus(404)

    const thisFriend = await User.findByPk(friendId, {
      attributes: ['firstName', 'lastName', 'email'],
    })
    if (!thisFriend) return res.sendStatus(404)

    res.json(thisFriend)
  } catch (err) {
    next(err)
  }
})

module.exports = router
