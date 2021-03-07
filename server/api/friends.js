const router = require('express').Router()
const {User} = require('../db/models')
const {isIdentity, isFriend} = require('../express-gate-auth')

// GET all of user's friends
router.get('/:userId', isIdentity, async (req, res, next) => {
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
    // 1. user ID
    // 2. friend's email

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

    // confirm the friend to add is not the user/self
    if (thisFriend.dataValues.id === id) return res.sendStatus(404)

    // associate user to the friend and friend to user
    thisUser.addFriend(thisFriend.id)
    thisFriend.addFriend(thisUser.id)

    res.json(thisFriend)
  } catch (err) {
    next(err)
  }
})

// GET individual friend
router.get(
  '/:userId/:friendId',
  isIdentity,
  isFriend,
  async (req, res, next) => {
    try {
      const friendId = parseInt(req.params.friendId)
      if (isNaN(friendId)) return res.sendStatus(404)

      const thisFriend = await User.findByPk(friendId, {
        attributes: ['firstName', 'lastName', 'email', 'id'],
      })
      if (!thisFriend) return res.sendStatus(404)

      res.json(thisFriend)
    } catch (err) {
      next(err)
    }
  }
)

// DELETE a friend
router.delete('/:userId/:friendId', async (req, res, next) => {
  try {
    const friendId = parseInt(req.params.friendId)
    if (isNaN(friendId)) return res.sendStatus(404)

    const id = parseInt(req.params.userId)
    if (isNaN(id)) return res.sendStatus(404)

    const thisUser = await User.findByPk(id)
    if (!thisUser) return res.sendStatus(404)

    const friend = await User.findByPk(friendId)
    if (!friendId) return res.sendStatus(404)

    await friend.removeFriend(thisUser)
    await thisUser.removeFriend(friendId)

    res.sendStatus(204)
  } catch (err) {
    next(err)
  }
})

module.exports = router
