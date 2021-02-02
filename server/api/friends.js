const router = require('express').Router()
const {User, Friend} = require('../db/models')

router.get('/:userId', async (req, res, next) => {
  try {
    const thisUser = await User.findByPk(req.params.userId)
    const friends = await Friend.findAll({
      where: {
        userId: req.params.userId,
      },
      // explicitly select only the id and email fields - even though
      // users' passwords are encrypted, it won't help if we just
      // send everything to anyone who asks!
      //   attributes: ['id', 'email']
    })
    res.json(friends)
  } catch (err) {
    next(err)
  }
})

module.exports = router
