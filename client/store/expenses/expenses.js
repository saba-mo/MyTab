import axios from 'axios'

/* ACTION TYPES */
const GET_GROUP_EXPENSES = 'GET_GROUP_EXPENSES'
const ADD_GROUP_EXPENSE = 'ADD_GROUP_EXPENSE'
const DELETE_GROUP_EXPENSE = 'DELETE_GROUP_EXPENSE'
const SETTLE_SINGLE_EXPENSE = 'SETTLE_SINGLE_EXPENSE'

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

const settleSingleExpense = (expense) => ({
  type: SETTLE_SINGLE_EXPENSE,
  expense,
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
    console.log(
      "All the group's expenses should be here, but they are not because: ",
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
    console.log(
      "Your expense should have been added to the group, but it wasn't because: ",
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
    console.log(
      'Your group expense should have been deleted, but it was not because: ',
      error
    )
  }
}

export const _settleSingleExpense = (groupId, expenseId, expense) => async (
  dispatch
) => {
  try {
    const {data} = await axios
      .put(`/api/groups/singleGroup/${groupId}/expenses/${expenseId}`, {
        expense,
      })
      .then((response) => {
        console.log('response to put: ', response)
      })

    dispatch(settleSingleExpense(data))
  } catch (error) {
    console.log(`The expense was not settled due to an error: `, error)
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
    case SETTLE_SINGLE_EXPENSE:
      return [...state, action.expense]
    default:
      return state
  }
}

/* EXPORT */
export default groupExpensesReducer
