const router = require('express').Router()
const currency = require('currency.js')
const {Group, User, Expense, Item} = require('../db/models')
const {isInGroup} = require('../express-gate-auth')

//GET a single group
router.get('/:groupId', isInGroup, async (req, res, next) => {
  try {
    const group = await Group.findByPk(req.params.groupId)
    res.json(group)
  } catch (error) {
    next(error)
  }
})

//Edit a group name
router.put('/:groupId', async (req, res, next) => {
  try {
    const data = await Group.findByPk(req.params.groupId)
    const group = await data.update(req.body)
    res.json(group)
  } catch (err) {
    next(err)
  }
})

// GET all of group's expenses
router.get('/:groupId/expenses', isInGroup, async (req, res, next) => {
  try {
    const groupId = parseInt(req.params.groupId)
    if (isNaN(groupId)) return res.sendStatus(404)

    const thisGroup = await Group.findByPk(groupId)
    if (!thisGroup) res.sendStatus(404)

    const groupExpenses = await thisGroup.getExpenses({
      attributes: ['id', 'name', 'totalCost', 'groupId'],
      include: [{model: User}, {model: Item, include: {model: User}}],
    })

    res.json(groupExpenses)
  } catch (err) {
    next(err)
  }
})

// GET single group expense
router.get('/:groupId/expenses/:expenseId', async (req, res, next) => {
  try {
    const expenseId = parseInt(req.params.expenseId)
    if (isNaN(expenseId)) return res.sendStatus(404)

    const thisExpense = await Expense.findByPk(expenseId, {
      attributes: ['id', 'name', 'totalCost', 'groupId'],
    })
    if (!thisExpense) res.sendStatus(404)

    // find user who paid for this expense and send it back on the expense object
    const paidBy = await thisExpense.getUsers()
    thisExpense.dataValues.paidBy = paidBy
    res.json(thisExpense)
  } catch (err) {
    next(err)
  }
})

// POST a new group expense
router.post('/:groupId/expenses', async (req, res, next) => {
  try {
    // for extra safely checking we can add this todo check after MVP:
    // todo: validate totalCost format, and return a 400 status for non float data e.g if (!Number(req.body.totalCost))

    const expenseCost = currency(req.body.totalCost).value
    const expenseName = req.body.name
    const userId = Number(req.body.paidBy)

    // create expense and associate to group
    let newExpense = await Expense.create(
      {
        name: expenseName,
        totalCost: expenseCost,
        groupId: req.params.groupId,
      },
      {
        include: {
          model: User,
          where: {
            id: userId,
          },
        },
      }
    )

    let items = []
    for (const [itemUserId, amount] of Object.entries(req.body.owedByMember)) {
      if (amount === 0) {
        continue
      }
      await Item.create({amount, userId: itemUserId, expenseId: newExpense.id})
    }

    // associate expense to user who paid
    await newExpense.addUser(userId)

    // find user and send info back with expense
    const thisUser = await newExpense.getUsers()
    newExpense.dataValues.users = thisUser

    newExpense.dataValues.items = items

    res.json(newExpense)
  } catch (err) {
    next(err)
  }
})

//UPDATE single group expense
router.put('/:groupId/expenses/:expenseId', async (req, res, next) => {
  try {
    // request comes in with
    // 1. expense name
    // 2. expense totalCost
    // 3. id of user who paid
    // 4. object of who owes payer money {userId: amount}

    // update expense
    const thisExpense = await Expense.findByPk(Number(req.params.expenseId))
    const updatedExpense = await thisExpense.update({
      name: req.body.name,
      totalCost: req.body.totalCost,
    })
    await updatedExpense.setUsers([req.body.paidBy])

    // update items
    const items = await updatedExpense.getItems()
    // iterate through existing list of items from db before the update
    for (let i = 0; i < items.length; i++) {
      let item = items[i]
      // if the item in the database is also in the request body
      if (req.body.owedByMember[item.userId]) {
        // update that item
        await item.update({
          amount: req.body.owedByMember[item.userId],
          userId: item.userId,
        })
        // else, the item is in the database but not in the request body, so destroy it
      } else await item.destroy()
    }

    // check request for a user id that does not exist in the items array and then create an item
    const newItemOwersStr = Object.keys(req.body.owedByMember)
    const newItemOwers = newItemOwersStr.map((ower) => Number(ower))
    const existingItemOwers = items.map((item) => item.userId)

    // iterate through users who are on the request as owers
    for (let i = 0; i < newItemOwers.length; i++) {
      let owerOnRequest = newItemOwers[i]
      // if the database does not include a row for this user and this item, create one
      if (!existingItemOwers.includes(owerOnRequest)) {
        await Item.create({
          amount: req.body.owedByMember[owerOnRequest],
          userId: Number(owerOnRequest),
          expenseId: thisExpense.id,
        })
      }
    }
    const updatedItems = await updatedExpense.getItems()
    updatedExpense.dataValues.items = updatedItems
    res.json(updatedExpense)
  } catch (err) {
    next(err)
  }
})

// DELETE single group expense
router.delete('/:groupId/expenses/:expenseId', async (req, res, next) => {
  try {
    const expenseId = parseInt(req.params.expenseId)
    const thisExpense = await Expense.findByPk(expenseId)
    if (!thisExpense) res.sendStatus(404)
    // find all items associated to expense and destroy them, too
    const expenseItems = await thisExpense.getItems()
    await expenseItems.forEach((item) => item.destroy())
    await thisExpense.destroy()
    res.sendStatus(204)
  } catch (err) {
    next(err)
  }
})

// GET all of group's members
router.get('/:groupId/members', isInGroup, async (req, res, next) => {
  try {
    const groupId = parseInt(req.params.groupId)
    if (isNaN(groupId)) return res.sendStatus(404)

    const thisGroup = await Group.findByPk(groupId)
    if (!thisGroup) res.sendStatus(404)

    const groupMembers = await thisGroup.getUsers({
      attributes: ['id', 'email', 'firstName', 'lastName'],
    })
    res.json(groupMembers)
  } catch (err) {
    next(err)
  }
})

// ADD a group member
router.post('/:groupId/members', async (req, res, next) => {
  try {
    const id = Number(req.body.member)
    let thisUser = await User.findByPk(id, {
      attributes: ['id', 'firstName', 'lastName', 'email'],
    })
    await thisUser.addGroup(req.params.groupId)
    res.json(thisUser)
  } catch (err) {
    next(err)
  }
})

// DELETE a group member
router.delete('/:groupId/members', async (req, res, next) => {
  try {
    const memberId = Number(req.body.memberId)
    const groupId = Number(req.params.groupId)
    const group = await Group.findByPk(groupId)
    const groupMembers = await group.getUsers({
      attributes: ['id', 'email', 'firstName', 'lastName'],
    })

    const findUnsettledItems = (arr) => {
      const unsettledItemsArr = []
      for (let i = 0; i < arr.length; i++) {
        if (arr[i].settled === false) {
          unsettledItemsArr.push(arr[i])
        }
      }
      return unsettledItemsArr
    }

    // FIRST, check if user paid for (is associcated to) any expenses in this group that still have outstanding items; if so, do not remove this user
    const thisUser = await User.findByPk(memberId)
    const userExpenses = await thisUser.getExpenses()
    const userExpensesInThisGroup = userExpenses.filter(
      (expense) => expense.groupId === groupId
    )
    let userExpensesUnsettledItems = []
    for (let i = 0; i < userExpensesInThisGroup.length; i++) {
      let expense = userExpensesInThisGroup[i]
      expense.dataValues.items = await expense.getItems()
      userExpensesUnsettledItems.push(
        findUnsettledItems(expense.dataValues.items)
      )
    }
    // SECOND, check if user's id is associated to any UNSETTLED items that belong to someone else's expense in this group; if so, do not remove this user
    const groupExpenses = await Expense.findAll({
      where: {groupId},
      include: {model: User},
    })
    // filter out expenses associated to user, as those have already been checked
    const othersGroupExpenses = groupExpenses.filter(
      (expense) => expense.users[0].id !== memberId
    )
    let othersExpensesUnsettledItems = []
    for (let i = 0; i < othersGroupExpenses.length; i++) {
      let expense = othersGroupExpenses[i]
      expense.dataValues.items = await expense.getItems()
      othersExpensesUnsettledItems.push(
        findUnsettledItems(expense.dataValues.items)
      )
    }
    // filter out the items that are not associated to this user
    const unsettledItemsUserOwes = []
    for (let i = 0; i < othersExpensesUnsettledItems.length; i++) {
      let itemsArr = othersExpensesUnsettledItems[i]
      unsettledItemsUserOwes.push(
        itemsArr.filter((item) => item.userId === memberId)
      )
    }

    if (
      userExpensesUnsettledItems.flat().length ||
      unsettledItemsUserOwes.flat().length
    ) {
      res.json(groupMembers)
    } else {
      await group.removeUser(memberId)
      res.sendStatus(204)
    }
  } catch (err) {
    next(err)
  }
})

// UPDATE one portion of an expense within a group by updating Item table column boolean to TRUE
router.put(
  '/:groupId/expenses/:expenseId/item/:itemId',
  async (req, res, next) => {
    try {
      const thisPortion = await Item.findByPk(req.params.itemId)
      const updatedPortion = await thisPortion.update({
        settled: req.body.itemToSettle.settled,
      })
      res.json(updatedPortion)
    } catch (err) {
      next(err)
    }
  }
)

module.exports = router
