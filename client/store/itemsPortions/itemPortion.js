import axios from 'axios'

/* ACTION TYPES */
const SETTLE_ONE_PORTION = 'SETTLE_ONE_PORTION'

/* ACTION CREATORS */
const settleOnePortion = (expensePortion) => {
  return {
    type: SETTLE_ONE_PORTION,
    expensePortion,
  }
}

/* THUNK CREATORS */
export const _settleOnePortion = (itemToSettle, groupId) => async (
  dispatch
) => {
  try {
    const {data} = await axios.put(
      `/api/groups/singleGroup/${groupId}/expenses/${itemToSettle.expenseId}/${itemToSettle.id}`,
      {
        itemToSettle,
      }
    )
    dispatch(settleOnePortion(data))
  } catch (error) {
    console.error(
      `The expense portion was settled in db, but there was a thunk error: `,
      error
    )
  }
}

/* INITIAL STATE */
const initialState = {}

/* REDUCER */
const singlePortionReducer = (state = initialState, action) => {
  switch (action.type) {
    case SETTLE_ONE_PORTION:
      return {...state, ...action.expensePortion}
    default:
      return state
  }
}

export default singlePortionReducer
