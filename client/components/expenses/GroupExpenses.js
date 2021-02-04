import React from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {_loadGroupExpenses} from '../../store/expenses/expenses'

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
    console.log('ge: ', groupExpenses)

    return (
      <div>
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
                  Paid by: (name to come) ${expense.totalCost}
                </div>
              )
            })}
          </ul>
          <button type="submit">Add an Expense</button>
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
