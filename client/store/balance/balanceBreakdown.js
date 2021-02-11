import axios from 'axios'

/* ACTION TYPES */
const GET_BALANCE = 'GET_BALANCE'

/* ACTION CREATORS */
const getBalance = (balanceBreakdown) => ({
  type: GET_BALANCE,
  balanceBreakdown,
})

/* INITIAL STATE */
const initialState = []

/* THUNK CREATORS */
export const _loadBalance = (userId) => async (dispatch) => {
  try {
    const {data} = await axios.get(`/api/balance/${userId}`)
    dispatch(getBalance(data))
  } catch (error) {
    console.log(
      "The user's balance should be here, but it is not because: ",
      error
    )
  }
}

/* REDUCER */
const balanceReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_BALANCE:
      return action.balanceBreakdown
    default:
      return state
  }
}

/* EXPORT */
export default balanceReducer
