import React from 'react'
import {connect} from 'react-redux'
import {_loadGroupExpenses, _settleOnePortion} from '../../store/'
import {CreateGroupExpenseForm} from '../index'
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

    const groupTotal = groupExpenses.reduce(
      (accumulator, currentValue) => accumulator + currentValue.totalCost,
      0
    )

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
        {/* <h3>
          Total Owed to {user.firstName} {user.lastName}:{' '}
          {currency(totalOwedToUser).format()}
        </h3>
        <table>
          <thead>
            <tr>
              <th>Expense</th>
              <th>Paid By</th>
              <th>Owes Funds</th>
              <th>Amount</th>
              <th />
            </tr>
          </thead>
          <tbody>
            {expenses
              .filter((expense) => expense[0].id === user.id)
              .map((expense) => (
                <tr key={expense[5].id}>
                  <td>{expense[3]}</td>
                  <td>
                    {expense[0].firstName} {expense[0].lastName}
                  </td>
                  <td>
                    {expense[1].firstName} {expense[1].lastName}
                  </td>
                  <td>{currency(expense[2]).format()}</td>
                  <td>
                    <button
                      type="submit"
                      onClick={() => this.settleThisPortion(expense[5])}
                    >
                      Settle
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>

        <h3>
          Total {user.firstName} {user.lastName} Owes:{' '}
          {currency(totalUserOwes).format()}
        </h3>
        <table>
          <thead>
            <tr>
              <th>Expense</th>
              <th>Paid By</th>
              <th>Owes Funds</th>
              <th>Amount</th>
              <th />
            </tr>
          </thead>
          <tbody>
            {expenses
              .filter((expense) => expense[1].id === user.id)
              .map((expense) => (
                <tr key={expense[5].id}>
                  <td>{expense[3]}</td>
                  <td>
                    {expense[0].firstName} {expense[0].lastName}
                  </td>
                  <td>
                    {expense[1].firstName} {expense[1].lastName}
                  </td>
                  <td>{currency(expense[2]).format()}</td>
                  <td>
                    <button
                      type="submit"
                      onClick={() => this.settleThisPortion(expense[5])}
                    >
                      Settle
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>

        <h3>Other group expenses: </h3>
        <table>
          <thead>
            <tr>
              <th>Expense</th>
              <th>Paid By</th>
              <th>Owes Funds</th>
              <th>Amount</th>
            </tr>
          </thead>
          <tbody>
            {expenses
              .filter(
                (expense) => ![expense[0].id, expense[1].id].includes(user.id)
              )
              .map((expense) => (
                <tr key={expense[5].id}>
                  <td>{expense[3]}</td>
                  <td>
                    {expense[0].firstName} {expense[0].lastName}
                  </td>
                  <td>
                    {expense[1].firstName} {expense[1].lastName}
                  </td>
                  <td>{currency(expense[2]).format()}</td>
                </tr>
              ))}
          </tbody>
        </table> */}
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
