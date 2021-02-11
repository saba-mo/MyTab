import React from 'react'
import {connect} from 'react-redux'
import {_loadBalance} from '../../store'
import currency from 'currency.js'

export class TotalBalance extends React.Component {
  componentDidMount() {
    this.props.loadBalance(this.props.user.id)
  }

  render() {
    const {balanceBreakdown} = this.props

    if (balanceBreakdown[0] === 0) {
      return (
        <div>
          <div>Total Balance on MyTab</div>
          <div>You are all settled up</div>
        </div>
      )
    } else if (balanceBreakdown[0] > 0) {
      return (
        <div>
          <div>
            Total Balance on MyTab: {currency(balanceBreakdown[0]).format()}
          </div>
          <div className="positiveBalance">
            You are owed {currency(balanceBreakdown[1]).format()}
          </div>
          <div className="negativeBalance">
            You owe {currency(balanceBreakdown[2]).format()}
          </div>
        </div>
      )
    } else {
      return (
        <div>
          <div>
            Total Balance on MyTab: {currency(balanceBreakdown[0]).format()}
          </div>
          <div className="positiveBalance">
            You are owed {currency(balanceBreakdown[1]).format()}
          </div>
          <div className="negativeBalance">
            You owe {currency(balanceBreakdown[2]).format()}
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
  balanceBreakdown: state.balanceBreakdown,
  user: state.user,
})

const mapDispatch = (dispatch) => ({
  loadBalance: (userId) => dispatch(_loadBalance(userId)),
})

export default connect(mapState, mapDispatch)(TotalBalance)
