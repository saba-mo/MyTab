const router = require('express').Router()
const {Group, User, Expense, Item} = require('../db/models')

// UPDATE single group expense
router.put(
  '/singleGroup/:groupId/expenses/:expenseId',
  async (req, res, next) => {
    try {
      const thisExpense = await Expense.findByPk(req.params.expenseId)
      const updatedExpense = await thisExpense.update({
        name: req.body.name,
        totalCost: req.body.totalCost,
      })
      await updatedExpense.setUsers([req.body.paidBy])
      res.json(updatedExpense)
    } catch (err) {
      next(err)
    }
  }
)
