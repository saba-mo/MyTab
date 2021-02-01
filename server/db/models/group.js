const Sequelize = require('sequelize')
const db = require('../db')

const Group = db.define('group', {
  title: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
      notNull: true,
    },
  },
})

module.exports = Group
