import React from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {_loadGroupExpenses} from '../../store/expenses/expenses'
import {CreateGroupExpenseForm} from '../index'
import currency from 'currency.js'

export class GroupExpenses extends React.Component {
  constructor() {
    super()
  }

  componentDidMount() {
    this.props.loadGroupExpenses(this.props.groupId)
  }

  noExpenses = (expenseList) => {
    if (expenseList.length < 1) {
      return 'Add your expenses here.'
    }
  }

  render() {
    const {groupExpenses} = this.props
    const groupTotal = groupExpenses.reduce(
      (accumulator, currentValue) => accumulator + currentValue.totalCost,
      0
    )
    return (
      <div>
        <CreateGroupExpenseForm groupId={this.props.groupId} />
        <div id="full-expense-list">
          {this.noExpenses(groupExpenses)}
          <ul>
            {groupExpenses.map((expense) => {
              return (
                <div key={`expense-${expense.id}`}>
                  <Link
                    to={`/groups/singleGroup/${expense.groupId}/expenses/${expense.id}`}
                  >
                    {expense.name}
                  </Link>{' '}
                  Paid by {expense.users[0].firstName}{' '}
                  {expense.users[0].lastName}{' '}
                  {currency(expense.totalCost).format()}
                </div>
              )
            })}
          </ul>
          <h3>Total: {currency(groupTotal).format()}</h3>
        </div>
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
})

export default connect(mapStateToProps, mapDispatchToProps)(GroupExpenses)
