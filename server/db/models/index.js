const User = require('./user')
const Group = require('./group')
const User_Group = require('./user_group')
// const Expense = require('./expense')

User.belongsToMany(User, {as: 'friends', through: 'Friends'})

Group.belongsToMany(User, {through: User_Group, foreignKey: 'group_Id'})
User.belongsToMany(Group, {through: User_Group, foreignKey: 'user_Id'})

// Expense.belongsToMany(Member, {through: Member_Expense});
// Member.belongsToMany(Expense, {through: Member_Expense});

//Group.belongsToMany(Expense)
//Expense.belongsToMany(Group)

//Item.belongsTo(Expense)
//Expense.hasMany(Item)

module.exports = {
  User,
  Group,
  User_Group,
  // Expense
}
