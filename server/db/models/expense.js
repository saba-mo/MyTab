const Sequelize = require('sequelize')
const db = require('../db')
const currency = require('currency.js')

const Expense = db.define('expense', {
  name: {
    type: Sequelize.STRING,
    // allowNull: false,
    // validate: {
    //   notEmpty: true,
    //   notNull: true,
    // },
  },
  totalCost: {
    type: Sequelize.FLOAT,
    validate: {
      min: 0,
    },
    get() {
      // broken down of return state to more easily read as an engineer:
      // let storedValue = this.getDataValue('totalCost')
      // let currency = currency(storedValue)
      // let floatValue = currency.value
      // return floatValue

      // Use Currency.js to force an appropriate currency friendly float representation of the value
      return currency(this.getDataValue('totalCost')).value
    },
    set(value) {
      this.setDataValue('totalCost', currency(value).value)
    },
  },
  settled: {
    type: Sequelize.BOOLEAN,
    defaultValue: false,
  },
})

module.exports = Expense
