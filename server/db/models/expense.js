const Sequelize = require('sequelize')
const db = require('../db')

const Expense = db.define('expense', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
      notNull: true,
    },
  },

  totalCost: {
    type: Sequelize.FLOAT,
    validate: {
      min: 0,
    },
  },
})

module.exports = Expense
