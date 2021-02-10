import React from 'react'
import {connect} from 'react-redux'
import {_loadBalance} from '../../store'
import currency from 'currency.js'

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
          <div className="positiveBalance">
            You are owed {currency(balance).format()}
          </div>
        </div>
      )
    } else {
      return (
        <div>
          <div>Total Balance</div>
          <div className="negativeBalance">
            You owe {currency(balance * -1).format()}
          </div>
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
