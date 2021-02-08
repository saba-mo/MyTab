const User = require('./db/models/user')
const Group = require('./db/models/group')

//checking if the user identity is the identity associated with this group
const isInGroup = async (req, res, next) => {
  const user = await User.findOne({
    where: {
      id: req.user.id,
    },
    include: {
      model: Group,
    },
  })

  const thisGroup = user.groups.filter(
    (group) => group.id == req.params.groupId
  )
  thisGroup.length ? next() : res.send("You don't have permission")
}

//checking if the user identity is the identity associated with user in params
const isIdentity = async (req, res, next) => {
  const user = await User.findOne({
    where: {
      id: req.user.id,
    },
  })

  user.id == req.params.userId ? next() : res.send("You don't have permission")
}

module.exports = {isInGroup, isIdentity}
