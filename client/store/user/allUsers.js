import axios from 'axios'

/* ACTION TYPES */
const GET_ALL_USERS = 'GET_ALL_USERS'

/* ACTION CREATORS */
const getAllUsers = (users) => ({
  type: GET_ALL_USERS,
  users,
})

/* INITIAL STATE */
const initialState = []

/* THUNK CREATORS */
export const _loadAllUsers = () => async (dispatch) => {
  try {
    const {data} = await axios.get('api/users/')
    dispatch(getAllUsers(data))
  } catch (error) {
    console.error(
      'All the users should be here, but the thunk threw this error instead: ',
      error
    )
  }
}

/* REDUCER */
const allUsersReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_USERS:
      return action.users
    default:
      return state
  }
}

/* EXPORT */
export default allUsersReducer
