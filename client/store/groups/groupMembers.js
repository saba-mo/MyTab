import axios from 'axios'

/* ACTION TYPES */
const GET_GROUP_MEMBERS = 'GET_GROUP_MEMBERS'
// const ADD_GROUP_EXPENSE = 'ADD_GROUP_EXPENSE'
// const DELETE_GROUP_EXPENSE = 'DELETE_GROUP_EXPENSE'

/* ACTION CREATORS */
const getGroupMembers = (members) => ({
  type: GET_GROUP_MEMBERS,
  members,
})

// const addGroupExpense = (expense) => ({
//   type: ADD_GROUP_EXPENSE,
//   expense,
// })

// const deleteGroupExpense = (expenseId) => ({
//   type: DELETE_GROUP_EXPENSE,
//   expenseId,
// })

/* INITIAL STATE */
const initialState = []

/* THUNK CREATORS */
export const _loadGroupMembers = (groupId) => async (dispatch) => {
  try {
    const {data} = await axios.get(`/api/groups/singleGroup/${groupId}/members`)
    dispatch(getGroupMembers(data))
  } catch (error) {
    console.log(
      "All the group's members should be here, but they are not because: ",
      error
    )
  }
}

// export const _addGroupExpense = (groupId, expense) => async (dispatch) => {
//   try {
//     const {data} = await axios.post(
//       `/api/groups/singleGroup/${groupId}/expenses`,
//       expense
//     )
//     dispatch(addGroupExpense(data))
//   } catch (error) {
//     console.log(
//       "Your expense should have been added to the group, but it wasn't because: ",
//       error
//     )
//   }
// }

// export const _deleteGroupExpense = (groupId, expenseId) => async (dispatch) => {
//   try {
//     await axios.delete(
//       `/api/groups/singleGroup/${groupId}/expenses/${expenseId}`
//     )
//     dispatch(deleteGroupExpense(expenseId))
//   } catch (error) {
//     console.log(
//       'Your group expense should have been deleted, but it was not because: ',
//       error
//     )
//   }
// }
/* REDUCER */
const groupMembersReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_GROUP_MEMBERS:
      return action.members
    // case ADD_GROUP_EXPENSE:
    //   return [...state, action.expense]
    // case DELETE_GROUP_EXPENSE:
    //   return [...state.filter((expense) => expense.id !== action.expenseId)]
    default:
      return state
  }
}

/* EXPORT */
export default groupMembersReducer
