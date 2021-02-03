import React from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {_loadExpenses} from '../../store/expenses/expenses'

export class AllExpenses extends React.Component {
  constructor() {
    super()
  }

  componentDidMount() {
    this.props.loadExpenses(this.props.user.id)
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
                  {/* <Link to={`/expenses/${expense.user_exepnse.expense_Id}`}> */}
                  {expense.name} ${expense.totalCost} {/* </Link> */}
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
    expenses: state.expenses,
    user: state.user,
  }
}

const mapDispatchToProps = (dispatch) => ({
  loadExpenses: (userId) => dispatch(_loadExpenses(userId)),
})

export default connect(mapStateToProps, mapDispatchToProps)(AllExpenses)
