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

router.get('/:id', async (req, res, next) => {
  try {
    const group = await User.findByPk(req.params.id, {
      include: [{model: Group}],
    })
    res.json(group)
  } catch (err) {
    next(err)
  }
})

// router.post('/', (req, res, next) => {
//   try {
//     Robot.create(req.body)
//     .then(robot => res.json(robot))
//   } catch (err) {
//     next(err)
//   }
// })

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
