const router = require('express').Router()
const {User, Group, Expense} = require('../db/models')
const {isIdentity} = require('../express-gate-auth')
module.exports = router

// GET all users
router.get('/', async (req, res, next) => {
  try {
    const users = await User.findAll({
      attributes: ['id', 'email'],
    })
    res.json(users)
  } catch (err) {
    next(err)
  }
})

// GET all of a user's groups
router.get('/:userId/groups', isIdentity, async (req, res, next) => {
  try {
    const user = await User.findByPk(req.params.userId)
    const groups = await user.getGroups()
    res.json(groups)
  } catch (err) {
    next(err)
  }
})

//ADD a group
router.post('/:userId/groups', async function (req, res, next) {
  try {
    const newGroup = await Group.create(req.body)
    await newGroup.addUsers([req.user])
    res.send(newGroup)
  } catch (err) {
    next(err)
  }
})

//DELETE a group
router.delete('/:userId/groups/:groupId', async (req, res, next) => {
  try {
    // get all expenses for the group
    const groupExpenses = await Expense.findAll({
      where: {groupId: req.params.groupId},
    })
    // destroy all of them and their associated items in the db
    for (let i = 0; i < groupExpenses.length; i++) {
      let expense = groupExpenses[i]
      const expenseItems = await expense.getItems()
      expenseItems.forEach((item) => item.destroy())
      await expense.destroy()
    }

    // destroy the group in the db
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
