const Sequelize = require('sequelize')
const db = require('../db')
const currency = require('currency.js')

const Item = db.define('item', {
  name: {
    type: Sequelize.STRING,
  },

  cost: {
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
      return currency(this.getDataValue('cost')).value
    },
    set(value) {
      this.setDataValue('cost', currency(value).value)
    },
  },

  quantity: {
    type: Sequelize.INTEGER,
    validate: {
      min: 0,
    },
  },
})

module.exports = Item
