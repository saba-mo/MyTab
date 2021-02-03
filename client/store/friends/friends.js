import axios from 'axios'
import history from '../../history'

/* ACTION TYPES */
const GET_FRIENDS = 'GET_FRIENDS'

/* ACTION CREATORS */
const getFriends = (friends) => ({
  type: GET_FRIENDS,
  friends: friends,
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

/* REDUCER */
const friendsReducer = (friends = initialState, action) => {
  switch (action.type) {
    case GET_FRIENDS:
      return action.friends
    default:
      return friends
  }
}

/* EXPORT */
export default friendsReducer
