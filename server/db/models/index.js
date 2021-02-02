const User = require('./user')
const Group = require('./group')
const User_Group = require('./user_group')
const User_Expense = require('./user_expense')
const Item = require('./item')
const Expense = require('./expense')
const Friend = require('./friend')

User.belongsToMany(User, {as: 'friends', through: Friend})

Group.belongsToMany(User, {through: User_Group, foreignKey: 'group_Id'})
User.belongsToMany(Group, {through: User_Group, foreignKey: 'user_Id'})

Expense.belongsToMany(User, {through: User_Expense, foreignKey: 'expense_Id'})
User.belongsToMany(Expense, {through: User_Expense, foreignKey: 'user_Id'})

Group.hasMany(Expense)
Expense.belongsTo(Group)

Item.belongsTo(Expense)
Expense.hasMany(Item)

module.exports = {
  User,
  Group,
  User_Group,
  Item,
  Expense,
  User_Expense,
  Friend,
}
