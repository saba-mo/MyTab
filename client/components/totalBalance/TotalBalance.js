import React from 'react'
import {connect} from 'react-redux'
import {logout} from '../../store'

const TotalBalance = () => (
  <div className="totalBalance">
    <div>Total Balance</div>
    {/* might need to use currency.js here */}
    {/* <div>
        {positiveBalance ? (
          <div>You are owed ${balance}</div>
        ) : (
          <div>You owe ${balance}</div>
        )}
      </div> */}
  </div>
)

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    isLoggedIn: !!state.user.id,
  }
}

const mapDispatch = (dispatch) => {
  return {
    handleClick() {
      dispatch(logout())
    },
  }
}

export default connect(mapState, mapDispatch)(TotalBalance)
