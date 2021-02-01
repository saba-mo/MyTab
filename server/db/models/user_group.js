const Sequelize = require('sequelize')
const db = require('../db')
const {User, Group} = require('./index')

const User_Group = db.define('user_group', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  balance: {
    type: Sequelize.FLOAT,
    defaultValue: 0,
    allowNull: false,
  },
  user_Id: {
    type: Sequelize.INTEGER,
    references: {
      model: User,
      key: 'id',
    },
  },
  group_Id: {
    type: Sequelize.INTEGER,
    references: {
      model: Group,
      key: 'id',
    },
  },
})

module.exports = User_Group
