import React from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {_loadGroupExpenses} from '../../store/expenses/expenses'

export class AllExpenses extends React.Component {
  constructor() {
    super()
  }

  componentDidMount() {
    this.props.loadGroupExpenses(this.props.user.id)
  }

  noExpenses = (expenseList) => {
    if (expenseList.length < 1) {
      return 'Add your expenses to MyTab'
    }
  }

  render() {
    const expenseList = this.props.expenses
    return (
      <div>
        <main>
          <h2>My Expenses on MyTab</h2>
        </main>
        <div id="full-expense-list">
          {this.noExpenses(expenseList)}
          <ul>
            {expenseList.map((expense) => {
              return (
                <div key={`expense-${expense.user_expense.expense_Id}`}>
                  <Link to={`/expenses/${expense.user_expense.expense_Id}`}>
                    {expense.name}
                  </Link>
                  ${expense.totalCost}
                </div>
              )
            })}
          </ul>
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
  loadGroupExpenses: (userId) => dispatch(_loadGroupExpenses(userId)),
})

export default connect(mapStateToProps, mapDispatchToProps)(AllExpenses)
