const db = require('../server/db')
const {User, Group, Expense, Item} = require('../server/db/models')
const groupData = require('./dummyDataGroups')
const userData = require('./dummyDataUser')
const expenseData = require('./dummyDataExpenses')
const portionData = require('./dummyDataPortions')

async function seed() {
  await db.sync({force: true})
  console.log('database synced!')

  await Promise.all(
    userData.map((user) => {
      return User.bulkCreate(user)
    })
  )
  await Promise.all(
    groupData.map((group) => {
      return Group.bulkCreate(group)
    })
  )
  await Promise.all(
    expenseData.map((expense) => {
      return Expense.bulkCreate(expense)
    })
  )
  await Promise.all(
    portionData.map((portionOfExpense) => {
      return Item.bulkCreate(portionOfExpense)
    })
  )

  console.log('seeded successfully')
}

// this function is first finding things already in the database, then associating them
async function associations() {
  let usersToAssoc = await User.findAll()
  let groupsToAssoc = await Group.findAll()
  let expensesToAssoc = await Expense.findAll()

  await groupsToAssoc[1].addUser(usersToAssoc[3].id)
  await groupsToAssoc[1].addUser(usersToAssoc[0].id)

  // associations creation loops
  for (let i = 0; i < groupsToAssoc.length; i++) {
    await usersToAssoc[i].addGroups([groupsToAssoc[i]])
    await usersToAssoc[i + 1].addGroups([groupsToAssoc[i]])
  }

  let count = 0
  for (let i = 0; i < expensesToAssoc.length; i++) {
    await usersToAssoc[count].addExpenses([expensesToAssoc[i]])
    count++
    if (count % 4 === 0) {
      count = count / 4
    }
  }

  // loops through all users and associates each of them to one friend, except for last user
  for (let i = 0; i < usersToAssoc.length - 1; i++) {
    await usersToAssoc[i].addFriend(usersToAssoc[i + 1].id)
    await usersToAssoc[i + 1].addFriend(usersToAssoc[i].id)
  }

  // adds more friend and group associations to create variety of group sizes
  let user1 = await User.findByPk(1)
  await user1.addFriends([9, 8, 7, 4])
  await usersToAssoc[8].addFriends([1])
  await usersToAssoc[7].addFriends([1])
  await usersToAssoc[6].addFriends([1])
  await usersToAssoc[3].addFriends([1])
  let group9 = await Group.create({title: 'Titanic'})
  await group9.addUsers([1, 7, 8, 9])
}

// function to create portions assocations
async function portionsOfExpenses() {
  let usersToAssoc = await User.findAll()
  let user2 = await User.findByPk(2)
  await user2.addFriends([6, 5])
  await usersToAssoc[4].addFriends([2])
  await usersToAssoc[5].addFriends([2])
  let group10 = await Group.create({title: 'Princess Bride'})
  await group10.addUsers([2, 5, 6])

  let portionsOfExpensesToAssoc = await Item.findAll()
  await usersToAssoc[1].addItem(portionsOfExpensesToAssoc[0].id)
  await usersToAssoc[0].addItem(portionsOfExpensesToAssoc[1].id)
  await usersToAssoc[3].addItem(portionsOfExpensesToAssoc[2].id)
  await usersToAssoc[1].addItem(portionsOfExpensesToAssoc[3].id)
  await usersToAssoc[2].addItem(portionsOfExpensesToAssoc[4].id)
  await usersToAssoc[2].addItem(portionsOfExpensesToAssoc[5].id)
  await usersToAssoc[0].addItem(portionsOfExpensesToAssoc[6].id)
  await usersToAssoc[0].addItem(portionsOfExpensesToAssoc[7].id)
  await usersToAssoc[1].addItem(portionsOfExpensesToAssoc[8].id)
  await usersToAssoc[3].addItem(portionsOfExpensesToAssoc[9].id)
  await usersToAssoc[0].addItem(portionsOfExpensesToAssoc[10].id)
  await usersToAssoc[3].addItem(portionsOfExpensesToAssoc[11].id)
  await usersToAssoc[0].addItem(portionsOfExpensesToAssoc[12].id)
}

// We've separated the `seed` function from the `runSeed` function.
// This way we can isolate the error handling and exit trapping.
// The `seed` function is concerned only with modifying the database.
async function runSeed() {
  console.log('seeding...')
  try {
    await seed()
    await associations()
    await portionsOfExpenses()
  } catch (error) {
    console.error('error seeding: ', error)
    process.exitCode = 1
  } finally {
    console.log('closing database connection')
    await db.close()
    console.log('database connection closed')
  }
}

// Execute the `seed` function, IF we ran this module directly (`node seed`).
// `Async` functions always return a promise, so we can use `catch` to handle
// any errors that might occur inside of `seed`.
if (module === require.main) {
  runSeed()
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed
