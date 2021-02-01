const Sequelize = require('sequelize')
const db = require('../db')
const {User, Expense} = require('./index')

const User_Expense = db.define('user_expense', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  user_Id: {
    type: Sequelize.INTEGER,
    references: {
      model: User,
      key: 'id',
    },
  },
  expense_Id: {
    type: Sequelize.INTEGER,
    references: {
      model: Expense,
      key: 'id',
    },
  },
})

module.exports = User_Expense
