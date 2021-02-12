import axios from 'axios'

/* ACTION TYPES */
const GET_GROUP_EXPENSES = 'GET_GROUP_EXPENSES'
const ADD_GROUP_EXPENSE = 'ADD_GROUP_EXPENSE'
const DELETE_GROUP_EXPENSE = 'DELETE_GROUP_EXPENSE'

/* ACTION CREATORS */
const getGroupExpenses = (expenses) => ({
  type: GET_GROUP_EXPENSES,
  expenses,
})

const addGroupExpense = (expense) => ({
  type: ADD_GROUP_EXPENSE,
  expense,
})

const deleteGroupExpense = (expenseId) => ({
  type: DELETE_GROUP_EXPENSE,
  expenseId,
})

/* INITIAL STATE */
const initialState = []

/* THUNK CREATORS */
export const _loadGroupExpenses = (groupId) => async (dispatch) => {
  try {
    const {data} = await axios.get(
      `/api/groups/singleGroup/${groupId}/expenses`
    )
    dispatch(getGroupExpenses(data))
  } catch (error) {
    console.error(
      "All the group's expenses should be here, but the thunk threw this error instead: ",
      error
    )
  }
}

export const _addGroupExpense = (groupId, expense) => async (dispatch) => {
  try {
    const {data} = await axios.post(
      `/api/groups/singleGroup/${groupId}/expenses`,
      expense
    )
    dispatch(addGroupExpense(data))
  } catch (error) {
    console.error(
      'Your expense should have been added to the group, but the thunk threw this error instead: ',
      error
    )
  }
}

export const _deleteGroupExpense = (groupId, expenseId) => async (dispatch) => {
  try {
    await axios.delete(
      `/api/groups/singleGroup/${groupId}/expenses/${expenseId}`
    )
    dispatch(deleteGroupExpense(expenseId))
  } catch (error) {
    console.error(
      'Your group expense should have been deleted, but the thunk threw this error instead: ',
      error
    )
  }
}
/* REDUCER */
const groupExpensesReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_GROUP_EXPENSES:
      return action.expenses
    case ADD_GROUP_EXPENSE:
      return [...state, action.expense]
    case DELETE_GROUP_EXPENSE:
      return [...state.filter((expense) => expense.id !== action.expenseId)]
    default:
      return state
  }
}

/* EXPORT */
export default groupExpensesReducer
