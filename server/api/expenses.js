const router = require('express').Router()
const {User, Expense, Group} = require('../db/models')

// // GET all of user's expenses
// router.get('/:userId', async (req, res, next) => {
//   try {
//     const id = parseInt(req.params.userId)
//     if (isNaN(id)) return res.sendStatus(404)

//     const thisUser = await User.findByPk(id)
//     if (!thisUser) return res.sendStatus(404)

//     let expenses = await thisUser.getExpenses({
//       attributes: ['name', 'totalCost', 'groupId'],
//     })

//     res.json(expenses)
//   } catch (err) {
//     next(err)
//   }
// })

// GET all of group's expenses
router.get('route to indivdiual group', async (req, res, next) => {
  try {
    // make sure params matches what's in the individual group route
    const groupId = parseInt(req.params.groupId)
    if (isNaN(groupId)) return res.sendStatus(404)

    const thisGroup = await Group.findByPk(groupId)

    // filter attributes
    const groupExpenses = await thisGroup.getExpenses()
    // will it send back an empty array if there are no expenses?
    res.json(groupExpenses)
  } catch (err) {
    next(err)
  }
})

// GET a user's individual expense and show its group name
// router.get('/:userId/:expenseId', async (req, res, next) => {
//   try {
//     const expenseId = parseInt(req.params.expenseId)
//     if (isNaN(expenseId)) return res.sendStatus(404)

//     const thisExpense = await Expense.findByPk(expenseId, {
//       attributes: ['id', 'name', 'totalCost', 'groupId'],
//       include: {
//         model: Group,
//         attributes: ['title'],
//       },
//     })
//     if (!thisExpense) return res.sendStatus(404)

//     res.json(thisExpense)
//   } catch (err) {
//     next(err)
//   }
// })

module.exports = router
