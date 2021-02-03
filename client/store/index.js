import {createStore, combineReducers, applyMiddleware} from 'redux'
import {createLogger} from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import user from './user/user'
import friends from './friends/friends'
import singleFriend from './friends/singleFriend'
import groups from './groups/groups'
import singleGroup from './groups/SingleGroup'
import groupExpenses from './expenses/expenses'
// import singleExpense from './expenses/singleExpense'

const reducer = combineReducers({
  user: user,
  groups: groups,
  singleGroup: singleGroup,
  friends: friends,
  singleFriend: singleFriend,
  groupExpenses: groupExpenses,
  // singleExpense: singleExpense,
})
const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({collapsed: true}))
)
const store = createStore(reducer, middleware)

export default store
export * from './user/user'
export * from './friends/friends'
export * from './friends/singleFriend'
export * from './groups/groups'
export * from './groups/SingleGroup'
export * from './expenses/expenses'
// export * from './expenses/singleExpense'
