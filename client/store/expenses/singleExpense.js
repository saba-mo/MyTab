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
    const {data} = await axios.get(
      `/api/groups/singleGroup/${groupId}/expenses/${expenseId}`
    )
    dispatch(getAnExpense(data))
  } catch (error) {
    console.log('Cannot find your expense because: ', error)
  }
}

export const _settleOnePortion = (paidBy, itemToSettle, groupId) => async (
  dispatch
) => {
  try {
    const {data} = await axios.put(
      `/api/groups/singleGroup/${groupId}/expenses/${itemToSettle.expenseId}/${itemToSettle.id}`,
      {
        itemToSettle,
      }
    )

    console.log('data after axios: ', data)
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
