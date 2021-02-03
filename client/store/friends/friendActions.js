import {
  GET_FRIENDS,
  ADD_FRIEND,
  ADD_FRIEND_ERROR,
  ADD_FRIEND_SUCCESS,
  DELETE_FRIEND,
} from './friendTypes'

/* ACTION CREATORS */
export const getFriends = (friends) => ({
  type: GET_FRIENDS,
  friends: friends,
})

export const addFriend = (friend) => ({
  type: ADD_FRIEND,
  friend,
})

export const addFriendError = (error) => ({
  type: ADD_FRIEND_ERROR,
  data: null,
  error: error,
})

export const addFriendSuccess = (results) => ({
  type: ADD_FRIEND_SUCCESS,
  data: results,
  error: null,
})

export const deleteFriend = (friendId) => ({
  type: DELETE_FRIEND,
  friendId,
})
