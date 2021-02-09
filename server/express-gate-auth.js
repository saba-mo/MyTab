const {User, Group} = require('./db/models')

//checking if the user identity is the identity associated with user in params
const isIdentity = async (req, res, next) => {
  const user = await User.findOne({
    where: {
      id: req.user.id,
    },
  })
  user.id == req.params.userId
    ? next()
    : res.send('You do not have permission.')
}

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
  // console.log('id: ', user.id, 'params: ', req.params.groupId)

  console.log('g: ', thisGroup, 'l: ', thisGroup.length)

  thisGroup.length ? next() : res.redirect(`/groups/${req.user.id}`)
}

//checking if the user identity is the identity associated with this friend
const isFriend = async (req, res, next) => {
  const user = await User.findOne({
    where: {
      id: req.user.id,
    },
  })
  const myFriends = await user.getFriends()
  const thisFriend = myFriends.filter(
    (friend) => friend.id == req.params.friendId
  )
  console.log(thisFriend)

  // change to redirect
  thisFriend.length ? next() : res.send([])
  // thisFriend.length ? next() : res.send("You don't have permission")
}

module.exports = {isInGroup, isFriend, isIdentity}
