const Sequelize = require('sequelize')
const db = require('../db')
const {User, Group} = require('./index')
const currency = require('currency.js')

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
    get() {
      // Use Currency.js to force an appropriate currency friendly float representation of the value
      return currency(this.getDataValue('balance')).value
    },
    set(value) {
      this.setDataValue('balance', currency(value).value)
    },
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
