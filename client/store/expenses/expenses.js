import axios from 'axios'

/* ACTION TYPES */
const GET_EXPENSES = 'GET_EXPENSES'

/* ACTION CREATORS */
const getExpenses = (expenses) => ({
  type: GET_EXPENSES,
  expenses,
})

/* INITIAL STATE */
const initialState = []

/* THUNK CREATORS */
export const _loadExpenses = (userId) => async (dispatch) => {
  try {
    const {data} = await axios.get(`/api/expenses/${userId}`)
    dispatch(getExpenses(data))
  } catch (error) {
    console.log(
      'All your expenses should be here, but they are not because: ',
      error
    )
  }
}

/* REDUCER */
const expensesReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_EXPENSES:
      return action.expenses
    default:
      return state
  }
}

/* EXPORT */
export default expensesReducer
