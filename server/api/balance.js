const router = require('express').Router()
const {User, Item} = require('../db/models')
module.exports = router
const {isIdentity} = require('../express-gate-auth')
const currency = require('currency.js')

// GET the logged in user's total balance across all groups by subtracting
// total amount of all unsettled items associated to the user (total they owe)
// from total amount of all unsettled items associated to expenses in the user's name (total they're owed)
router.get('/:userId', isIdentity, async (req, res, next) => {
  try {
    const user = await User.findByPk(req.params.userId)
    const expenses = await user.getExpenses()
    const expenseIds = expenses.map((expense) => expense.id)

    const itemsUserOwes = await user.getItems({where: {settled: false}})
    let amountUserOwes = itemsUserOwes.reduce(
      (accum, item) => accum + item.amount,
      0
    )

    let amountUserOwed = 0
    for (let i = 0; i < expenseIds.length; i++) {
      let thisExpenseId = expenseIds[i]
      let itemsUserOwed = await Item.findAll({
        where: {expenseId: thisExpenseId, settled: false},
      })
      const totalOwedForExpense = itemsUserOwed.reduce(
        (accum, item) => accum + item.amount,
        0
      )
      amountUserOwed += totalOwedForExpense
    }

    let balance = amountUserOwed - amountUserOwes
    amountUserOwed = currency(amountUserOwed).value
    amountUserOwes = currency(amountUserOwes).value
    balance = currency(balance).value
    const balanceBreakdown = [balance, amountUserOwed, amountUserOwes]
    res.json(balanceBreakdown)
  } catch (err) {
    next(err)
  }
})
