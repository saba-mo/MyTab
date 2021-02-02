const Sequelize = require('sequelize')
const db = require('../db')

const Friend = db.define('friend', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
})

module.exports = Friend
