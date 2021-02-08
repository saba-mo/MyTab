const Sequelize = require('sequelize')
const db = require('../db')

const Item = db.define('item', {
  amount: {
    type: Sequelize.FLOAT,
    validate: {
      min: 0,
    },
  },
  settled: {
    type: Sequelize.BOOLEAN,
    defaultValue: false,
  },
})

module.exports = Item
