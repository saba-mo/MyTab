const Sequelize = require('sequelize')
const db = require('../db')

const Expense = db.define('expense', {
  name: {
    type: Sequelize.STRING,
  },

  totalCost: {
    type: Sequelize.FLOAT,
  },
})

module.exports = Expense
