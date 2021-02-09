import axios from 'axios'

/* ACTION TYPES */
const GET_AN_EXPENSE = 'GET_AN_EXPENSE'
const UPDATE_EXPENSE = 'UPDATE_EXPENSE'
const SETTLE_ONE_PORTION = 'SETTLE_ONE_PORTION'

/* ACTION CREATORS */
const getAnExpense = (expense) => ({
  type: GET_AN_EXPENSE,
  expense,
})

const settleOnePortion = (expense) => ({
  type: SETTLE_ONE_PORTION,
  expense,
})

const updateExpense = (expense) => ({
  type: UPDATE_EXPENSE,
  expense,
})

/* THUNK CREATORS */
export const _loadAnExpense = (groupId, expenseId) => async (dispatch) => {
  try {
    console.log('before await in thunk: ', groupId, expenseId)

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

// _settleAPortion(paidBy, itemToSettle, groupId)

export const _settleOnePortion = (paidBy, itemToSettle, groupId) => async (
  dispatch
) => {
  try {
    console.log('THUNK: whole item object: ', itemToSettle)
    console.log('THUNK: expense id of item: ', itemToSettle.expenseId)
    console.log('THUNK: amount to settle: ', itemToSettle.amount)
    console.log('THUNK: user to settle: ', itemToSettle.user)
    console.log('THUNK: boolean status of settle: ', itemToSettle.settled)

    console.log('paid by coming in: ', paidBy)
    //settled is true, as changed in component/singleexpense.js before sending here

    const {data} = await axios.put(
      `/api/groups/singleGroup/${groupId}/expenses/${itemToSettle.expenseId}/${itemToSettle.id}`,
      {
        itemToSettle,
      }
    )
    console.log('data after axios: ', data)
    //settled is false after the put request
    // .then((response) => {
    //   console.log('response to put: ', response)
    // })

    // dispatch(settleOnePortion(data))
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
    case SETTLE_ONE_PORTION:
      return {...state, ...action.expense}
    case UPDATE_EXPENSE:
      return {...state, ...action.expense}
    default:
      return state
  }
}

export default singleExpenseReducer
