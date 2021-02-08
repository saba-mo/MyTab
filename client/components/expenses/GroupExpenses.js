import React from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {_loadGroupExpenses} from '../../store/expenses/expenses'
import {CreateGroupExpenseForm} from '../index'

export class GroupExpenses extends React.Component {
  constructor() {
    super()
    this.state = {showForm: false}

    this.toggleShowForm = this.toggleShowForm.bind(this)
  }

  componentDidMount() {
    this.props.loadGroupExpenses(this.props.groupId)
  }

  toggleShowForm() {
    this.setState({showForm: !this.state.showForm})
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
        <div className="editGroupPencil">
          {this.state.showForm ? (
            <CreateGroupExpenseForm
              toggleForm={this.toggleShowForm}
              groupId={this.props.groupId}
            />
          ) : (
            <img
              className="groupImg"
              src="/images/plus.png"
              height="64px"
              width="64px"
              onClick={this.toggleShowForm}
            />
          )}
        </div>
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
                  {expense.users[0].lastName} ${expense.totalCost}
                </div>
              )
            })}
          </ul>
          <h3>Total: ${groupTotal.toFixed(2)}</h3>
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
