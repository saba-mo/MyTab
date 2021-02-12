import {
  ADD_FRIEND_SUCCESS,
  DELETE_FRIEND,
  GET_FRIENDS,
  INVITE_FRIEND,
  INVALID_EMAIL,
} from './friendTypes'

/* ACTION CREATORS */
export const getFriends = (friends) => ({
  type: GET_FRIENDS,
  friends: friends,
})

export const addFriendSuccess = (friend) => ({
  type: ADD_FRIEND_SUCCESS,
  friend,
})

export const inviteFriend = (email) => ({
  type: INVITE_FRIEND,
  error: `${email} not in database`,
})

export const invalidEmail = (email, error) => ({
  type: INVALID_EMAIL,
  error: `${email} not a valid email address. Also this error, ${error}`,
})

export const deleteFriend = (friendId) => ({
  type: DELETE_FRIEND,
  friendId,
})
