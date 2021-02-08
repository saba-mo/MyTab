const router = require('express').Router()
const {Group, User, Expense} = require('../db/models')

//GET all groups
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

//GET a single group
router.get('/singleGroup/:groupId', async (req, res, next) => {
  try {
    const group = await Group.findByPk(req.params.groupId)
    res.json(group)
  } catch (error) {
    next(error)
  }
})

//ADD a new group
router.post('/', async function (req, res, next) {
  try {
    const newGroup = await Group.create(req.body)
    await newGroup.addUsers([req.user])
    res.send(newGroup)
  } catch (err) {
    next(err)
  }
})

//DELETE a group
router.delete('/:groupId', (req, res, next) => {
  try {
    Group.destroy({
      where: {
        id: req.params.groupId,
      },
    })
    res.status(204).end()
  } catch (err) {
    next(err)
  }
})

//Edit groups
router.put('/singleGroup/:groupId', async (req, res, next) => {
  try {
    const data = await Group.findByPk(req.params.groupId)
    const group = await data.update(req.body)
    res.json(group)
  } catch (err) {
    next(err)
  }
})

// GET all of group's expenses
router.get('/singleGroup/:groupId/expenses', async (req, res, next) => {
  try {
    const groupId = parseInt(req.params.groupId)
    if (isNaN(groupId)) return res.sendStatus(404)

    const thisGroup = await Group.findByPk(groupId)
    if (!thisGroup) res.sendStatus(404)

    const groupExpenses = await thisGroup.getExpenses({
      attributes: ['id', 'name', 'totalCost', 'groupId'],
      include: {model: User},
    })

    res.json(groupExpenses)
  } catch (err) {
    next(err)
  }
})

// POST a new group expense
router.post('/singleGroup/:groupId/expenses', async (req, res, next) => {
  try {
    const expenseCost = parseFloat(req.body.totalCost)
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

    // TODO: create Item rows from req.body.owedByMember
    // if paidby don't create item

    // associate expense to user who paid
    await newExpense.addUser(userId)

    // find user and send info back with expense
    const thisUser = await newExpense.getUsers()
    newExpense.dataValues.users = thisUser

    res.json(newExpense)
  } catch (err) {
    next(err)
  }
})

// GET single group expense
router.get(
  '/singleGroup/:groupId/expenses/:expenseId',
  async (req, res, next) => {
    try {
      const expenseId = parseInt(req.params.expenseId)
      if (isNaN(expenseId)) return res.sendStatus(404)

      const thisExpense = await Expense.findByPk(expenseId, {
        attributes: ['id', 'name', 'totalCost', 'groupId'],
      })
      if (!thisExpense) res.sendStatus(404)

      res.json(thisExpense)
    } catch (err) {
      next(err)
    }
  }
)

//UPDATE single group expense
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

// DELETE single group expense
router.delete(
  '/singleGroup/:groupId/expenses/:expenseId',
  async (req, res, next) => {
    try {
      const expenseId = parseInt(req.params.expenseId)
      const thisExpense = await Expense.findByPk(expenseId)
      if (!thisExpense) res.sendStatus(404)
      await thisExpense.destroy()
      res.sendStatus(204)
    } catch (err) {
      next(err)
    }
  }
)

// GET all of group's members
router.get('/singleGroup/:groupId/members', async (req, res, next) => {
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
router.post('/singleGroup/:groupId/members', async (req, res, next) => {
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
router.delete('/singleGroup/:groupId/members', async (req, res, next) => {
  try {
    // clean up this code - we might not need to find both the group and the user, but make sure before deleting
    const memberId = Number(req.body.memberId)
    const groupId = Number(req.params.groupId)
    const group = await Group.findByPk(groupId)

    // find user object so later we can check if they have an existing balance
    const thisUser = await User.findByPk(memberId, {include: {model: Group}})
    // filter array of groups user is in so that we only have one array element and therefore know the index of this group
    const thisGroupArray = thisUser.groups.filter(
      (currentGroup) => currentGroup.user_group.group_Id === groupId
    )
    // if the member has a balance in that group (positive or negative), we should not allow the user to remove the member
    // instead, we send back the list of all group members so the front end can check what to display
    if (thisGroupArray[0].user_group.balance !== 0) {
      const groupMembers = await group.getUsers({
        attributes: ['id', 'email', 'firstName', 'lastName'],
      })
      res.json(groupMembers)
    }
    // else move forward with removing user from group
    else {
      await group.removeUser(memberId)
      res.sendStatus(204)
    }
  } catch (err) {
    next(err)
  }
})

module.exports = router
