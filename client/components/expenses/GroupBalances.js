import React from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {_loadGroupExpenses, _settleAPortion} from '../../store/'
import {CreateGroupExpenseForm} from '../index'
import currency from 'currency.js'

export class GroupBalances extends React.Component {
  constructor() {
    super()
    this.settleThisPortion = this.settleThisPortion.bind(this)
  }

  componentDidMount() {
    this.props.loadGroupExpenses(this.props.groupId)
  }

  settleThisPortion(paidBy, userSettlingUp, itemToSettle, amountToSettle) {
    console.log('item coming in: ', itemToSettle)
    console.log('boolean: ', itemToSettle.settled)
    console.log('amount coming in: ', amountToSettle)
    console.log('user to settle coming in: ', userSettlingUp)
    console.log('paid by coming in: ', paidBy)

    itemToSettle.settled = true
    console.log('boolean: ', itemToSettle.settled)

    this.props.settleAPortion(
      paidBy,
      userSettlingUp,
      itemToSettle,
      amountToSettle
    )
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
          totalUserOwes += amount
        } else if (owedToUser.id === user.id) {
          totalOwedToUser += amount
        }
        expenses.push([
          owedToUser,
          owingUser,
          amount,
          expense.name,
          expense.id,
          item,
        ])
      })
    })

    return (
      <div>
        <h3>
          Total Owed to {user.firstName} {user.lastName}: $
          {totalOwedToUser.toFixed(2)}
        </h3>
        <table>
          <thead>
            <tr>
              <th>Expense</th>
              <th>Paid By</th>
              <th>Ower</th>
              <th>Amount</th>
              <th />
            </tr>
          </thead>
          <tbody>
            {expenses
              .filter((expense) => expense[0].id === user.id)
              .map((expense) => (
                <tr key={expense[4]}>
                  <td>{expense[3]}</td>
                  <td>
                    {expense[0].firstName} {expense[0].lastName}
                  </td>
                  <td>
                    {expense[1].firstName} {expense[1].lastName}
                  </td>
                  <td>${expense[2]}</td>
                  <td>
                    <button
                      type="submit"
                      onClick={() =>
                        this.settleThisPortion(
                          expense[0],
                          expense[1],
                          expense[5],
                          expense[2]
                        )
                      }
                    >
                      Settle
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>

        <h3>
          Total {user.firstName} {user.lastName} Owes: $
          {totalUserOwes.toFixed(2)}
        </h3>
        <table>
          <thead>
            <tr>
              <th>Expense</th>
              <th>Paid By</th>
              <th>Ower</th>
              <th>Amount</th>
            </tr>
          </thead>
          <tbody>
            {expenses
              .filter((expense) => expense[1].id === user.id)
              .map((expense) => (
                <tr key={expense[4]}>
                  <td>{expense[3]}</td>
                  <td>
                    {expense[0].firstName} {expense[0].lastName}
                  </td>
                  <td>
                    {expense[1].firstName} {expense[1].lastName}
                  </td>
                  <td>${expense[2]}</td>
                </tr>
              ))}
          </tbody>
        </table>

        <h3>Other expenses: </h3>
        <table>
          <thead>
            <tr>
              <th>Expense</th>
              <th>Paid By</th>
              <th>Ower</th>
              <th>Amount</th>
            </tr>
          </thead>
          <tbody>
            {expenses
              .filter(
                (expense) => ![expense[0].id, expense[1].id].includes(user.id)
              )
              .map((expense) => (
                <tr key={expense[4]}>
                  <td>{expense[3]}</td>
                  <td>
                    {expense[0].firstName} {expense[0].lastName}
                  </td>
                  <td>
                    {expense[1].firstName} {expense[1].lastName}
                  </td>
                  <td>${expense[2]}</td>
                </tr>
              ))}
          </tbody>
        </table>
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
  settleAPortion: (paidBy, userSettlingUp, itemToSettle, amountToSettle) =>
    dispatch(
      _settleAPortion(paidBy, userSettlingUp, itemToSettle, amountToSettle)
    ),
})

export default connect(mapStateToProps, mapDispatchToProps)(GroupBalances)
