const Sequelize = require('sequelize')
const db = require('../db')
const {User, Group} = require('./index')

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
  group_id: {
    type: Sequelize.INTEGER,
    references: {
      model: Group,
      key: 'id',
    },
  },
})

module.exports = User_Group
