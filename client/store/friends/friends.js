import axios from 'axios'
import history from '../../history'

/* ACTION TYPES */
const GET_FRIENDS = 'GET_FRIENDS'
const GET_A_FRIEND = 'GET_FRIEND'

/* ACTION CREATORS */
const getFriends = (friends) => ({
  type: GET_FRIENDS,
  friends: friends,
})

const getAFriend = (friend) => ({
  type: GET_A_FRIEND,
  friend: friend,
})

/* INITIAL STATE */
const initialState = []

/* THUNK CREATORS */

export const _loadAFriend = (friendId) => async (dispatch) => {
  try {
    const {data} = await axios.get(`/api/friends/${friendId}`)
    dispatch(getAFriend(data))
  } catch (error) {
    console.log('Can not friend your friend because: ', error)
  }
}

export const _loadFriends = () => async (dispatch) => {
  try {
    const {data} = await axios.get('/api/friends')
    dispatch(getFriends(data))
  } catch (error) {
    console.log(
      'All your friends should be here, but they are not because: ',
      error
    )
  }
}

/* REDUCER */
const friendsReducer = (friends = initialState, action) => {
  switch (action.type) {
    case GET_A_FRIEND:
      friends = friends.filter(
        (friend) => parseInt(friend.id) !== parseInt(action.friend.id)
      )
      return friends.concat([action.friend])
    case GET_FRIENDS:
      return action.friends
    default:
      return friends
  }
}

/* EXPORT */
export default friendsReducer
