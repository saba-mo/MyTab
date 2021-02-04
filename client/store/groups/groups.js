import axios from 'axios'

export const GET_GROUPS = 'GET_GROUPS'
export const CREATE_GROUP = 'CREATE_GROUP'
// export const DELETE_ROBOT = 'DELETE_ROBOT';

export const setGroups = (groups) => ({
  type: GET_GROUPS,
  groups,
})

export const createGroup = (group) => ({
  type: CREATE_GROUP,
  group,
})

export const _getGroups = (userId) => async (dispatch) => {
  try {
    const {data} = await axios.get(`/api/groups/${userId}`)
    dispatch(setGroups(data))
  } catch (err) {
    console.log("can't get groups!", err)
  }
}

export const _createGroup = (newGroup) => async (dispatch) => {
  try {
    const {data} = await axios.post('/api/groups', newGroup)
    dispatch(createGroup(data))
  } catch (err) {
    console.log("can't create a group!", err)
  }
}

// export const deleteRobot = (robot) => ({
//   type: DELETE_ROBOT,
//   robot
// });

// export const removeRobot = (robot) => async (dispatch) => {
//   try {
//     await axios.delete(`/api/robots/${robot.id}`)
//     dispatch(deleteRobot(robot))
//   } catch (err) {
//     console.log(err)
//   }
// };

const initialState = []

const groupsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_GROUPS:
      return action.groups
    case CREATE_GROUP:
      return [...state, action.group]
    // case DELETE_ROBOT:
    //   return state.filter((robot) => robot.id !== action.robot.id);
    default:
      return state
  }
}

export default groupsReducer
