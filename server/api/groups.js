const router = require('express').Router()
const {Group, User, Expense} = require('../db/models')
const currency = require('currency.js')

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

router.get('/singleGroup/:groupId', async (req, res, next) => {
  try {
    const group = await Group.findByPk(req.params.groupId)
    res.json(group)
  } catch (error) {
    next(error)
  }
})

router.post('/', async function (req, res, next) {
  try {
    const newGroup = await Group.create(req.body)
    await newGroup.addUsers([req.user])
    res.send(newGroup)
  } catch (err) {
    next(err)
  }
})

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

module.exports = router
