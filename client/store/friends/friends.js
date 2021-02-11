import axios from 'axios'
import {ADD_FRIEND_SUCCESS, DELETE_FRIEND, GET_FRIENDS} from './friendTypes'
import {
  addFriendSuccess,
  deleteFriend,
  getFriends,
  invalidEmail,
  inviteFriend,
} from './friendActions'

/* THUNK CREATORS */
export const _loadFriends = (userId) => async (dispatch) => {
  try {
    const {data} = await axios.get(`/api/friends/${userId}`)
    dispatch(getFriends(data))
  } catch (error) {
    console.error(
      'All your friends should be here, but they are not because the thunk threw this error: ',
      error
    )
  }
}

export const _addFriend = (userId, email) => async (dispatch) => {
  try {
    if (!email.includes('@')) {
      dispatch(invalidEmail(email, 'invalid email error'))
    } else {
      await axios
        .post(`/api/friends/${userId}`, {email})
        .then((response) => {
          dispatch(addFriendSuccess(response.data))
        })
        .catch((error) => {
          switch (error.response.status) {
            case 404:
              dispatch(inviteFriend({email}))
              break
            default:
              console.error(
                'Could not add that friend because the thunk threw this error',
                error
              )
              break
          }
        })
    }
  } catch (error) {
    console.error(
      'Your new friend should be here, but they are not because the thunk threw this error: ',
      error
    )
  }
}

export const _deleteFriend = (userId, friendId) => async (dispatch) => {
  try {
    await axios.delete(`/api/friends/${userId}/${friendId}`)
    dispatch(deleteFriend(friendId))
  } catch (error) {
    console.error(
      'Your friend should have been deleted, but they are not because the thunk threw this error: ',
      error
    )
  }
}

/* INITIAL STATES FOR REDUCERS */
const initialState = []
const initErrorState = {error: null}

/* REDUCER */
const friendsReducer = (friends = initialState, action) => {
  switch (action.type) {
    case GET_FRIENDS:
      return action.friends
    case ADD_FRIEND_SUCCESS:
      return [...friends, action.friend]
    case DELETE_FRIEND:
      return [
        ...friends.filter(
          (friend) => parseInt(friend.id) !== parseInt(action.friendId)
        ),
      ]
    default:
      return friends
  }
}

export function friendsErrorReducer(state = initErrorState, action) {
  const {error} = action
  if (error) {
    return {
      error: error,
    }
  }

  return state
}

/* EXPORT */
export default friendsReducer
