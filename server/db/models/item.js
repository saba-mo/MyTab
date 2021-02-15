const Sequelize = require('sequelize')
const db = require('../db')
const currency = require('currency.js')

const Item = db.define('item', {
  amount: {
    type: Sequelize.FLOAT,
    validate: {
      min: 0,
    },
    get() {
      // Use Currency.js to force an appropriate currency friendly float representation of the value
      return currency(this.getDataValue('amount')).value
    },
    set(value) {
      this.setDataValue('amount', currency(value).value)
    },
  },
  settled: {
    type: Sequelize.BOOLEAN,
    defaultValue: false,
  },
})

module.exports = Item
