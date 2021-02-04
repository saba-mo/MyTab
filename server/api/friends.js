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
      attributes: ['firstName', 'lastName', 'email', 'id'],
    })

    res.json(friends)
  } catch (err) {
    next(err)
  }
})

// ADD a friend
router.post('/:userId', async (req, res, next) => {
  try {
    // This request comes along with:
    // 1. User Id
    // 2. friend email
    const id = parseInt(req.params.userId)
    if (isNaN(id)) return res.sendStatus(404)

    const thisUser = await User.findByPk(id)
    if (!thisUser) return res.sendStatus(404)

    const thisFriend = await User.findOne({
      where: {
        email: req.body.email,
      },
    })
    if (!thisFriend) return res.sendStatus(404)

    thisUser.addFriend(thisFriend.id)

    res.json(thisFriend)
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

// DELETE a friend
router.delete('/:userId/:friendId', async (req, res, next) => {
  try {
    const friendId = parseInt(req.params.friendId)
    if (isNaN(friendId)) return res.sendStatus(404)

    const id = parseInt(req.params.userId)
    if (isNaN(id)) return res.sendStatus(404)

    const thisUser = await User.findByPk(id)
    if (!thisUser) return res.sendStatus(404)

    thisUser.removeFriend(friendId)
    res.sendStatus(204)
  } catch (err) {
    next(err)
  }
})

module.exports = router
