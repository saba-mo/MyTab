import React from 'react'
import {connect} from 'react-redux'
import {_loadBalance} from '../../store'

export class TotalBalance extends React.Component {
  componentDidMount() {
    this.props.loadBalance(this.props.user.id)
  }

  render() {
    const {balance} = this.props

    if (balance === 0) {
      return (
        <div>
          <div>Total Balance</div>
          <div>You are all settled up</div>
        </div>
      )
    } else if (balance > 0) {
      return (
        <div>
          <div>Total Balance</div>
          <div>You are owed ${balance}</div>
        </div>
      )
    } else {
      return (
        <div>
          <div>Total Balance</div>
          <div>You owe ${balance * -1}</div>
        </div>
      )
    }
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
