import axios from 'axios'

export const GET_SINGLE_GROUP = 'GET_SINGLE_GROUP'

const setSingleGroup = (group) => ({
  type: GET_SINGLE_GROUP,
  group,
})

export const _getSingleGroup = (groupId) => {
  return async (dispatch) => {
    try {
      const {data} = await axios.get(`/api/groups/singleGroup/${groupId}`)
      dispatch(setSingleGroup(data))
    } catch (err) {
      console.log(err.message)
    }
  }
}

const initialState = {}

const singleGroupReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_SINGLE_GROUP:
      return action.group
    default:
      return state
  }
}

export default singleGroupReducer
