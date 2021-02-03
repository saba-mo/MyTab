import axios from 'axios'

const GET_AN_EXPENSE = 'GET_AN_EXPENSE'

const getAnExpense = (expense) => ({
  type: GET_AN_EXPENSE,
  expense,
})

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

const initialState = {}

const singleExpenseReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_AN_EXPENSE:
      return action.expense
    default:
      return state
  }
}

export default singleExpenseReducer
