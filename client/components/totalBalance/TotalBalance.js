import React from 'react'
import {connect} from 'react-redux'
import {_loadBalance} from '../../store'

export class TotalBalance extends React.Component {
  componentDidMount() {
    this.props.loadBalance(this.props.user.id)
  }

  render() {
    const {balance} = this.props
    // if (this.props.balance && this.props.balance.length) {
    //   balance = this.props.balance[0]
    // }
    return (
      <div className="totalBalance">
        <div>Total Balance {balance}</div>

        {/* check if 0, say all settled up; if positve say you are owed; if negative say you owe  */}
        {/* see Groups component for 3 part conditional render */}
        {/* <div>
        {positiveBalance ? (
          <div>You are owed ${balance}</div>
        ) : (
          <div>You owe ${balance}</div>
        )}
      </div> */}
      </div>
    )
  }
}

/**
 * CONTAINER
 */
const mapState = (state) => ({
  balance: state.balance,
  user: state.user,
})

const mapDispatch = (dispatch) => ({
  loadBalance: (userId) => dispatch(_loadBalance(userId)),
})

export default connect(mapState, mapDispatch)(TotalBalance)
