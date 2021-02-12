import React from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {_loadGroupExpenses, _loadGroupMembers} from '../../store'
import {CreateGroupExpenseForm} from '../index'
import currency from 'currency.js'

export class GroupExpenses extends React.Component {
  constructor() {
    super()
    this.state = {showForm: false}

    this.toggleShowForm = this.toggleShowForm.bind(this)
    this.checkMembersList = this.checkMembersList.bind(this)
  }

  componentDidMount() {
    this.props.loadGroupExpenses(this.props.groupId)
    this.props.loadGroupMembers(this.props.groupId)
  }

  checkMembersList() {
    if (this.props.groupMembers.length > 1) {
      this.toggleShowForm()
    } else {
      alert('Add a group member before creating a group expense.')
    }
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
              title="Create an expense"
              onClick={this.checkMembersList}
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
                  </Link>
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
    groupMembers: state.groupMembers,
    user: state.user,
  }
}

const mapDispatchToProps = (dispatch) => ({
  loadGroupExpenses: (groupId) => dispatch(_loadGroupExpenses(groupId)),
  loadGroupMembers: (groupId) => dispatch(_loadGroupMembers(groupId)),
})

export default connect(mapStateToProps, mapDispatchToProps)(GroupExpenses)
