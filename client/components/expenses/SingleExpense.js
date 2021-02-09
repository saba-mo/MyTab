import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {
  _loadAnExpense,
  _deleteGroupExpense,
  _settleSingleExpense,
} from '../../store/'
import {UpdateExpenseForm} from '../index'
import currency from 'currency.js'

class SingleExpense extends React.Component {
  constructor() {
    super()
    this.state = {showForm: false}
    this.deleteAndGoBack = this.deleteAndGoBack.bind(this)
    this.toggleShowForm = this.toggleShowForm.bind(this)
    this.settleAnExpense = this.settleAnExpense.bind(this)
  }

  componentDidMount() {
    const {groupId, expenseId} = this.props.match.params
    this.props.loadAnExpense(groupId, expenseId)
  }

  toggleShowForm() {
    this.setState({showForm: !this.state.showForm})
  }

  deleteAndGoBack() {
    if (
      window.confirm(
        'Are you sure you want to delete this expense? This will remove this expense for all members involved.'
      )
    ) {
      const {groupId, id} = this.props.expense
      this.props.deleteGroupExpense(groupId, id)
      window.location.href = `/groups/singleGroup/${groupId}`
    }
  }

  settleAnExpense() {
    const {groupId, id} = this.props.expense
    this.props.expense.settled = true
    const expense = this.props.expense
    console.log('expense object sending to reducer: ', expense)

    this.props.settleSingleExpense(groupId, id, expense)
    console.log('group id to send with expense: ', groupId)
  }

  render() {
    const {expense} = this.props
    return (
      <div className="expense-individual">
        <div className="pages-view-navbar">
          <Link to={`/groups/singleGroup/${expense.groupId}`}>
            <h3>Back to Group Expenses </h3>
          </Link>
        </div>
        <h4>
          {expense.name} {currency(expense.totalCost).format()}
        </h4>
        <div className="editGroupPencil">
          {this.state.showForm ? (
            <UpdateExpenseForm
              toggleForm={this.toggleShowForm}
              groupId={this.props.match.params.groupId}
            />
          ) : (
            <img
              className="groupImg"
              src="/images/pencil.png"
              // height="400px"
              // width="407.406px"
              onClick={this.toggleShowForm}
            />
          )}
        </div>
        <button type="submit" onClick={this.settleAnExpense}>
          Settle
        </button>
        <button type="submit" onClick={this.deleteAndGoBack}>
          Remove
        </button>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
    expense: state.singleExpense,
  }
}

const mapDispatchToProps = (dispatch) => ({
  deleteGroupExpense: (groupId, expenseId) =>
    dispatch(_deleteGroupExpense(groupId, expenseId)),
  loadAnExpense: (groupId, expenseId) =>
    dispatch(_loadAnExpense(groupId, expenseId)),
  settleSingleExpense: (groupId, expenseId, expense) =>
    dispatch(_settleSingleExpense(groupId, expenseId, expense)),
})

export default connect(mapStateToProps, mapDispatchToProps)(SingleExpense)
