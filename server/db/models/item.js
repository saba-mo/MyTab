const Sequelize = require('sequelize')
const db = require('../db')

const Item = db.define('item', {
  name: {
    type: Sequelize.STRING,
  },

  cost: {
    type: Sequelize.INTEGER,
    validate: {
      min: 0,
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
