import axios from 'axios'

export const GET_SINGLE_GROUP = 'GET_SINGLE_GROUP'
export const UPDATE_GROUP = 'UPDATE_GROUP'

export const updateGroup = (group) => ({
  type: UPDATE_GROUP,
  group,
})

export const setSingleGroup = (group) => ({
  type: GET_SINGLE_GROUP,
  group,
})

export const _getSingleGroup = (groupId) => {
  return async (dispatch) => {
    try {
      const {data} = await axios.get(`/api/groups/singleGroup/${groupId}`)
      dispatch(setSingleGroup(data))
    } catch (err) {
      console.error(
        "can't get this group because the thunk threw this error: ",
        err.message
      )
    }
  }
}

export const _updateGroup = (groupId, group) => async (dispatch) => {
  try {
    const {data} = await axios.put(`/api/groups/singleGroup/${groupId}`, group)
    dispatch(updateGroup(data))
  } catch (err) {
    console.error(
      "can't update this group because the thunk threw this error: ",
      err
    )
  }
}

const initialState = {}

const singleGroupReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_SINGLE_GROUP:
      return action.group
    case UPDATE_GROUP:
      return {...state, ...action.group}
    default:
      return state
  }
}

export default singleGroupReducer
