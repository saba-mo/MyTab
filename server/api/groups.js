const router = require('express').Router()
const {Group} = require('../db/models')

router.get('/', async (req, res, next) => {
  try {
    const groups = await Group.findAll({})
    res.send(groups)
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
