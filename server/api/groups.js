const router = require('express').Router()
const {Group, User} = require('../db/models')

//ORIGINAL GET ROUTE
// router.get('/', async (req, res, next) => {
//   try {
//     const groups = await Group.findAll({
//       include: [User]
//     })
//     res.send(groups)
//   } catch (err) {
//     next(err)
//   }
// })

router.get('/:userId', async (req, res, next) => {
  try {
    const user = await User.findByPk(req.params.userId, {
      include: [{model: Group}],
    })
    res.json(user.groups)
  } catch (err) {
    next(err)
  }
})

router.get('/singleGroup/:groupId', async (req, res, next) => {
  try {
    const group = await Group.findByPk(req.params.groupId)
    res.json(group)
  } catch (error) {
    next(error)
  }
})

router.post('/', async function (req, res, next) {
  try {
    const newGroup = await Group.create(req.body)
    res.send(newGroup)
  } catch (err) {
    next(err)
  }
})

// router.delete('/:id', (req, res, next) => {
//   try {
//     Robot.destroy({
//       where: {
//         id: req.params.id
//       }
//     })
//     res.status(204).end()
//   } catch (err) {
//     next(err)
//   }
// })

module.exports = router
