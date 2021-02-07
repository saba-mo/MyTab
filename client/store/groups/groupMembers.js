import axios from 'axios'

/* ACTION TYPES */
const GET_GROUP_MEMBERS = 'GET_GROUP_MEMBERS'
const ADD_GROUP_MEMBER = 'ADD_GROUP_MEMBER'
const DELETE_GROUP_MEMBER = 'DELETE_GROUP_MEMBER'

/* ACTION CREATORS */
const getGroupMembers = (members) => ({
  type: GET_GROUP_MEMBERS,
  members,
})

const addGroupMember = (member) => ({
  type: ADD_GROUP_MEMBER,
  member,
})

const deleteGroupMember = (memberId) => ({
  type: DELETE_GROUP_MEMBER,
  memberId,
})

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

export const _addGroupMember = (groupId, member) => async (dispatch) => {
  try {
    const {data} = await axios.post(
      `/api/groups/singleGroup/${groupId}/members`,
      member
    )
    dispatch(addGroupMember(data))
  } catch (error) {
    console.log(
      "Your friend should have been added to the group, but they weren't because: ",
      error
    )
  }
}

export const _deleteGroupMember = (groupId, memberId) => async (dispatch) => {
  try {
    await axios.delete(`/api/groups/singleGroup/${groupId}/members`, {
      data: {memberId},
    })
    dispatch(deleteGroupMember(memberId))
  } catch (error) {
    console.log(
      'Your group member should have been deleted, but it was not because: ',
      error
    )
  }
}

/* REDUCER */
const groupMembersReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_GROUP_MEMBERS:
      return action.members
    case ADD_GROUP_MEMBER:
      return [...state, action.member]
    case DELETE_GROUP_MEMBER:
      return [...state.filter((member) => member.id !== action.memberId)]
    default:
      return state
  }
}

/* EXPORT */
export default groupMembersReducer
