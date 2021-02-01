const User = require('./user')
const Group = require('./group')
const User_Group = require('./user_group')

/**
 * If we had any associations to make, this would be a great place to put them!
 * ex. if we had another model called BlogPost, we might say:
 *
 *    BlogPost.belongsTo(User)
 */

/**
 * We'll export all of our models here, so that any time a module needs a model,
 * we can just require it from 'db/models'
 * for example, we can say: const {User} = require('../db/models')
 * instead of: const User = require('../db/models/user')
 */

Group.belongsToMany(User, {through: User_Group})

module.exports = {
  User,
  Group,
  User_Group,
}
