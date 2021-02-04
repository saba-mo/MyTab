import axios from 'axios'
import history from '../../history'
import {
  ADD_FRIEND_ERROR,
  ADD_FRIEND_SUCCESS,
  DELETE_FRIEND,
  GET_FRIENDS,
  INVITE_FRIEND,
  INVALID_EMAIL,
} from './friendTypes'
import {
  addFriendError,
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
    console.log(
      'All your friends should be here, but they are not because: ',
      error
    )
  }
}

export const _addFriend = (userId, email) => async (dispatch) => {
  try {
    if (!email.includes('@')) {
      dispatch(invalidEmail(email))
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
              console.log("Shit's busted, yo", error)
              // dispatch(systemError(error))
              break
          }
        })
    }
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
/* INITIAL STATE */
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
          (friend) =>
            parseInt(friend.Friends.friendId) !== parseInt(action.friendId)
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

// export const friendsErrorReducer = (state = initErrorState, action) => {
//   const {error} = action
//   switch (action.type) {
//     case INVITE_FRIEND:
//       return error: error
//     case INVALID_EMAIL:
//       return error: error
//     default:
//       return state
//   }
// }

/* EXPORT */
export default friendsReducer
