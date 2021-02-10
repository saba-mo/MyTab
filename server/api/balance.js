const router = require('express').Router()
const {User, Item} = require('../db/models')
module.exports = router
const currency = require('currency.js')

// get the logged in user's total balance across all groups
router.get('/:userId', async (req, res, next) => {
  try {
    //   find the user
    const user = await User.findByPk(req.params.userId)
    // find their expenses
    const expenses = await user.getExpenses()
    const expenseIds = expenses.map((expense) => expense.id)

    // total user has spent on bills...not needed?
    // const expenseTotal = expenses.reduce(
    //   (accum, expense) => accum + expense.totalCost,
    //   0
    // )

    // find unsettled items associated to user - what the user owes - and total the amounts
    const itemsUserOwes = await user.getItems({where: {settled: false}})
    // total user owes to other members
    const amountUserOwes = itemsUserOwes.reduce(
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
    balance = currency(balance).value
    res.json(balance)
    // res.json(users)
  } catch (err) {
    next(err)
  }
})

// GET route for user's balance that finds all the expenses associated to them and
// subtracts the cost of items associated to this user (what they owe) and adds the
// cost of items associated to the user's expenses (what they are owed)
