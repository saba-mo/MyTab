import React from 'react'
import {connect} from 'react-redux'
import {_loadGroupExpenses, _settleOnePortion} from '../../store/'
import currency from 'currency.js'
import BalanceDemo from './antBalanceProfiles'

export class GroupBalances extends React.Component {
  constructor() {
    super()
    this.state = {}
    this.settleThisPortion = this.settleThisPortion.bind(this)
    this.render = this.render.bind(this)
  }

  componentDidMount() {
    this.props.loadGroupExpenses(this.props.groupId)
  }

  // takes item object, toggles boolean value of "settled" to true, then sends to the thunk along with groupId
  settleThisPortion(itemToSettle) {
    itemToSettle.settled = true
    const {groupId} = this.props
    this.props.settleAPortion(itemToSettle, groupId)
    this.setState({})
    this.render()
  }

  render() {
    const {groupExpenses, user} = this.props

    let expenses = []
    let totalOwedToUser = 0
    let totalUserOwes = 0
    groupExpenses.forEach((expense) => {
      let owedToUser = expense.users[0]
      expense.items.forEach((item) => {
        let owingUser = item.user
        let amount = item.amount
        if (owingUser.id === user.id) {
          if (item.settled === false) {
            totalUserOwes += amount
          }
        } else if (owedToUser.id === user.id) {
          if (item.settled === false) {
            totalOwedToUser += amount
          }
        }
        expenses.push({
          owedToUserId: owedToUser.id,
          owedToUser: owedToUser.firstName,
          owingUserId: owingUser.id,
          owingUser: owingUser.firstName,
          amount: currency(amount).format(),
          expenseName: expense.name,
          expenseId: expense.id,
          item,
        })
      })
    })

    return (
      <div>
        <BalanceDemo
          expenses={expenses}
          totalOwedToUser={currency(totalOwedToUser).format()}
          totalUserOwes={currency(totalUserOwes).format()}
          settleThisPortion={this.settleThisPortion}
          user={user}
        />
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    groupExpenses: state.groupExpenses,
    user: state.user,
  }
}

const mapDispatchToProps = (dispatch) => ({
  loadGroupExpenses: (groupId) => dispatch(_loadGroupExpenses(groupId)),
  settleAPortion: (itemToSettle, groupId) =>
    dispatch(_settleOnePortion(itemToSettle, groupId)),
})

export default connect(mapStateToProps, mapDispatchToProps)(GroupBalances)
