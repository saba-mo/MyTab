import {
  ADD_FRIEND_REQUEST,
  ADD_FRIEND_ERROR,
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

export const addFriendRequest = () => ({
  type: ADD_FRIEND_REQUEST,
})

export const addFriendSuccess = (friend) => ({
  type: ADD_FRIEND_SUCCESS,
  friend,
})

export const addFriendError = (error) => ({
  type: ADD_FRIEND_ERROR,
  error: error,
})

export const inviteFriend = () => ({
  type: INVITE_FRIEND,
})

export const invalidEmail = () => ({
  type: INVALID_EMAIL,
})

export const deleteFriend = (friendId) => ({
  type: DELETE_FRIEND,
  friendId,
})
