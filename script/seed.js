const {green, red} = require('chalk')
const {Op} = require('sequelize')
const db = require('../server/db')
const {User, Group, Expense, Item} = require('../server/db/models')
const groupData = require('./dummyDataGroups')
const userData = require('./dummyDataUser')
const expenseData = require('./dummyDataExpenses')

async function seed() {
  await db.sync({force: true})
  console.log('db synced!')

  await Promise.all(
    groupData.map((group) => {
      return Group.bulkCreate(group)
    })
  )
  await Promise.all(
    userData.map((user) => {
      return User.bulkCreate(user)
    })
  )
  await Promise.all(
    expenseData.map((expense) => {
      return Expense.bulkCreate(expense)
    })
  )
  console.log(green('seeded successfully'))
}

// this function is first finding things already in the database, then associating them
async function associations() {
  // gives an array of objects that are newly created users that meet the where condition
  // this where condition includes @ so currently it finds all the Users. We can change this at will
  let usersToAssoc = await User.findAll({
    where: {
      email: {
        [Op.like]: '%@%',
      },
    },
  })

  // gives an array of objects that are newly created groups
  let groupsToAssoc = await Group.findAll()

  // gives an array of objects that are newly created expenses
  let expensesToAssoc = await Expense.findAll()

  // associations creation loops
  // loops through all the groups, assigns two users to each group. Many users will be in more than one group this way
  for (let i = 0; i < groupsToAssoc.length; i++) {
    await usersToAssoc[i].addGroups([groupsToAssoc[i]])
    await usersToAssoc[i + 1].addGroups([groupsToAssoc[i]])
  }

  // loops through all the expenses, assigns one user to each expense. Quick and dirty association for our limited dummy data.
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

  let user2 = await User.findByPk(2)
  await user2.addFriends([6, 5])
  await usersToAssoc[4].addFriends([2])
  await usersToAssoc[5].addFriends([2])

  let group10 = await Group.create({title: 'Princess Bride'})
  await group10.addUsers([2, 5, 6])
}

// We've separated the `seed` function from the `runSeed` function.
// This way we can isolate the error handling and exit trapping.
// The `seed` function is concerned only with modifying the database.
async function runSeed() {
  console.log(green('seeding...'))
  try {
    await seed()
    await associations()
  } catch (err) {
    console.log('error seeding:', red(err))
    process.exitCode = 1
  } finally {
    console.log('closing db connection')
    await db.close()
    console.log('db connection closed')
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
