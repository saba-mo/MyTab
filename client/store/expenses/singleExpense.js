import axios from 'axios'

/* ACTION TYPES */
const GET_AN_EXPENSE = 'GET_AN_EXPENSE'
const UPDATE_EXPENSE = 'UPDATE_EXPENSE'

/* ACTION CREATORS */
const getAnExpense = (expense) => ({
  type: GET_AN_EXPENSE,
  expense,
})

const updateExpense = (expense) => ({
  type: UPDATE_EXPENSE,
  expense,
})

/* THUNK CREATORS */
export const _loadAnExpense = (groupId, expenseId) => async (dispatch) => {
  try {
    const {data} = await axios.get(
      `/api/groups/singleGroup/${groupId}/expenses/${expenseId}`
    )
    dispatch(getAnExpense(data))
  } catch (error) {
    console.error(
      'Cannot find your expense because the thunk threw this error: ',
      error
    )
  }
}

export const _updateExpense = (groupId, expenseId, expense) => async (
  dispatch
) => {
  try {
    const {data} = await axios.put(
      `/api/groups/singleGroup/${groupId}/expenses/${expenseId}`,
      expense
    )
    dispatch(updateExpense(data))
  } catch (error) {
    console.error(
      'Cannot update your expense because the thunk threw this error: ',
      error
    )
  }
}

/* INITIAL STATE */
const initialState = {}

/* REDUCER */
const singleExpenseReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_AN_EXPENSE:
      return action.expense
    case UPDATE_EXPENSE:
      return {...state, ...action.expense}
    default:
      return state
  }
}

export default singleExpenseReducer
