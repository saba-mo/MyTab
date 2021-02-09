import axios from 'axios'

/* ACTION TYPES */
const GET_AN_EXPENSE = 'GET_AN_EXPENSE'
const UPDATE_EXPENSE = 'UPDATE_EXPENSE'
const SETTLE_SINGLE_EXPENSE = 'SETTLE_SINGLE_EXPENSE'

/* ACTION CREATORS */
const getAnExpense = (expense) => ({
  type: GET_AN_EXPENSE,
  expense,
})

const settleSingleExpense = (expense) => ({
  type: SETTLE_SINGLE_EXPENSE,
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
    // *
    // *
    // *
    // *
    console.log('thunk load an expense: ', data)
    // *
    // *
    // *

    dispatch(getAnExpense(data))
  } catch (error) {
    console.log('Cannot find your expense because: ', error)
  }
}

export const _settleSingleExpense = (groupId, expenseId, expense) => async (
  dispatch
) => {
  try {
    console.log('thunk incoming expense: ', expense)
    //settled is true, as changed in component/singleexpense.js before sending here

    const {data} = await axios.put(
      `/api/groups/singleGroup/${groupId}/expenses/${expenseId}`,
      {
        expense,
      }
    )
    console.log('thunk update an expense: ', data)
    //settled is false after the put request
    // .then((response) => {
    //   console.log('response to put: ', response)
    // })

    dispatch(settleSingleExpense(data))
  } catch (error) {
    console.log(`The expense was not settled due to an error: `, error)
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
    console.log('Cannot update your expense because: ', error)
  }
}

/* INITIAL STATE */
const initialState = {}

/* REDUCER */
const singleExpenseReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_AN_EXPENSE:
      return action.expense
    case SETTLE_SINGLE_EXPENSE:
      return {...state, ...action.expense}
    case UPDATE_EXPENSE:
      return {...state, ...action.expense}
    default:
      return state
  }
}

export default singleExpenseReducer
