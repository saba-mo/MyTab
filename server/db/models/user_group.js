const Sequelize = require('sequelize')
const db = require('../db')
const User = require('./index')

const User_Group = db.define('member_group', {
  balance: {
    type: Sequelize.FLOAT,
    defaultValue: 0,
    allowNull: false,
  },
  user_id: {
    type: Sequelize.INTEGER,
    references: {
      model: User,
      key: 'id',
    },
  },
})

module.exports = User_Group
