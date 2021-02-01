const Sequelize = require('sequelize')
const db = require('../db')
const {User, Group} = require('./index')

const User_Group = db.define('user_group', {
  balance: {
    type: Sequelize.FLOAT,
    defaultValue: 0,
    allowNull: false,
  },
  userId: {
    type: Sequelize.INTEGER,
    references: {
      model: User,
      key: 'id',
    },
  },
  groupId: {
    type: Sequelize.INTEGER,
    references: {
      model: Group,
      key: 'id',
    },
  },
})

module.exports = User_Group
