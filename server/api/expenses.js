const router = require('express').Router()
const {User, Expense, Group} = require('../db/models')

// GET all of user's expenses
router.get('/:userId', async (req, res, next) => {
  try {
    const id = parseInt(req.params.userId)
    if (isNaN(id)) return res.sendStatus(404)

    const thisUser = await User.findByPk(id)
    if (!thisUser) return res.sendStatus(404)

    const expenses = await thisUser.getExpenses({
      attributes: ['name', 'totalCost', 'groupId'],
    })

    // // trying to add group name to each expense object
    // expenses.forEach(async function (expense) {
    //   expense.groupName = await Group.findByPk(expense.groupId)
    // })

    res.json(expenses)
  } catch (err) {
    next(err)
  }
})

// GET individual expense
router.get('/:userId/:expenseId', async (req, res, next) => {
  try {
    const expenseId = parseInt(req.params.expenseId)
    if (isNaN(expenseId)) return res.sendStatus(404)

    const thisExpense = await Expense.findByPk(expenseId, {
      attributes: ['id', 'name', 'totalCost', 'groupId'],
    })
    if (!thisExpense) return res.sendStatus(404)

    res.json(thisExpense)
  } catch (err) {
    next(err)
  }
})

module.exports = router
