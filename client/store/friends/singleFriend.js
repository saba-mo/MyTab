import axios from 'axios'

const GET_A_FRIEND = 'GET_A_FRIEND'

const getAFriend = (friend) => ({
  type: GET_A_FRIEND,
  friend,
})

export const _loadAFriend = (userId, friendId) => async (dispatch) => {
  try {
    const {data} = await axios.get(`/api/friends/${userId}/${friendId}`)
    dispatch(getAFriend(data))
  } catch (error) {
    console.log('Cannot find your friend because: ', error)
  }
}

const initialState = {}

const singleFriendReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_A_FRIEND:
      return action.friend
    default:
      return state
  }
}

export default singleFriendReducer
