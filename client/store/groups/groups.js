import axios from 'axios'

export const GET_GROUPS = 'GET_GROUPS'
export const CREATE_GROUP = 'CREATE_GROUP'
export const DELETE_GROUP = 'DELETE_GROUP'

export const setGroups = (groups) => ({
  type: GET_GROUPS,
  groups,
})

export const createGroup = (group) => ({
  type: CREATE_GROUP,
  group,
})

export const deleteGroup = (groupId) => ({
  type: DELETE_GROUP,
  groupId,
})

export const _getGroups = (userId) => async (dispatch) => {
  try {
    const {data} = await axios.get(`/api/groups/${userId}`)
    dispatch(setGroups(data))
  } catch (err) {
    console.error("can't get groups because the thunk threw this error: ", err)
  }
}

export const _createGroup = (newGroup) => async (dispatch) => {
  try {
    // future addition: first create a check for a group existing, that this user is a part of, with the same name
    const {data} = await axios.post('/api/groups', newGroup)
    dispatch(createGroup(data))
  } catch (err) {
    console.error(
      "can't create a group because the thunk threw this error: ",
      err
    )
  }
}

export const _deleteGroup = (groupId) => async (dispatch) => {
  try {
    await axios.delete(`/api/groups/${groupId}`)
    dispatch(deleteGroup(groupId))
  } catch (err) {
    console.error(
      "can't delete this group because the thunk threw this error: ",
      err
    )
  }
}

const initialState = []

const groupsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_GROUPS:
      return action.groups
    case CREATE_GROUP:
      return [...state, action.group]
    case DELETE_GROUP:
      return state.filter((group) => group.id !== action.groupId)
    default:
      return state
  }
}

export default groupsReducer
