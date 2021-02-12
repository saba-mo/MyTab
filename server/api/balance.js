const router = require('express').Router()
const {User, Item} = require('../db/models')
module.exports = router
const currency = require('currency.js')

// GET the logged in user's total balance across all groups
router.get('/:userId', async (req, res, next) => {
  try {
    //   find the user
    const user = await User.findByPk(req.params.userId)
    // find their expenses
    const expenses = await user.getExpenses()
    const expenseIds = expenses.map((expense) => expense.id)

    // find unsettled items associated to user - what the user owes - and total the amounts
    const itemsUserOwes = await user.getItems({where: {settled: false}})
    // total user owes to other members
    let amountUserOwes = itemsUserOwes.reduce(
      (accum, item) => accum + item.amount,
      0
    )

    // find unsettled items associated to user's expenses - what is owed to the user - and total the amounts
    // total user is owed by other members
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
