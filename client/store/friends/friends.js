import axios from 'axios'
import history from '../../history'

/* ACTION TYPES */
const GET_FRIENDS = 'GET_FRIENDS'
const ADD_FRIEND = 'ADD_FRIEND'
const DELETE_FRIEND = 'DELETE_FRIEND'

/* ACTION CREATORS */
const getFriends = (friends) => ({
  type: GET_FRIENDS,
  friends: friends,
})

const addFriend = (friend) => ({
  type: ADD_FRIEND,
  friend,
})

const deleteFriend = (friendId) => ({
  type: DELETE_FRIEND,
  friendId,
})

/* INITIAL STATE */
const initialState = []

/* THUNK CREATORS */
export const _loadFriends = (userId) => async (dispatch) => {
  try {
    const {data} = await axios.get(`/api/friends/${userId}`)
    dispatch(getFriends(data))
  } catch (error) {
    console.log(
      'All your friends should be here, but they are not because: ',
      error
    )
  }
}

export const _addFriend = (userId, email) => async (dispatch) => {
  try {
    const {data} = await axios.post(`/api/friends/${userId}`, {email})
    dispatch(addFriend(data))
  } catch (error) {
    console.log(
      'Your new friend should be here, but they are not because: ',
      error
    )
  }
}

export const _deleteFriend = (userId, friendId) => async (dispatch) => {
  try {
    await axios.delete(`/api/friends/${userId}/${friendId}`)
    dispatch(deleteFriend(friendId))
  } catch (error) {
    console.log(
      'Your friend should have been deleted, but they are not because: ',
      error
    )
  }
}

/* REDUCER */
const friendsReducer = (friends = initialState, action) => {
  switch (action.type) {
    case GET_FRIENDS:
      return action.friends
    case ADD_FRIEND:
      return action.friend
    case DELETE_FRIEND:
      return [
        ...friends.filter(
          (friend) =>
            parseInt(friend.Friends.friendId) !== parseInt(action.friendId)
        ),
      ]
    default:
      return friends
  }
}

/* EXPORT */
export default friendsReducer
