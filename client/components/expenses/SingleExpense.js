import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {_loadAnExpense, _deleteGroupExpense} from '../../store/'
import {UpdateExpenseForm} from '../index'
import currency from 'currency.js'
import {EditOutlined, RollbackOutlined} from '@ant-design/icons'
import {Button} from 'antd'

class SingleExpense extends React.Component {
  constructor() {
    super()
    this.state = {showForm: false}

    this.toggleShowForm = this.toggleShowForm.bind(this)
    this.goBack = this.goBack.bind(this)
  }

  componentDidMount() {
    const {groupId, expenseId} = this.props.match.params
    this.props.loadAnExpense(groupId, expenseId)
  }

  toggleShowForm() {
    this.setState({showForm: !this.state.showForm})
  }

  goBack(groupId) {
    window.location.assign(`/groups/singleGroup/${groupId}`)
  }

  render() {
    const {expense} = this.props

    return (
      <div className="expense-individual">
        <h4>
          {expense.name} {currency(expense.totalCost).format()}
        </h4>
        <div>
          {this.state.showForm ? (
            <UpdateExpenseForm
              toggleForm={this.toggleShowForm}
              groupId={this.props.match.params.groupId}
            />
          ) : (
            <Button
              className="edit-expense-button"
              icon={<EditOutlined />}
              onClick={this.toggleShowForm}
              size="small"
            >
              Edit Expense
            </Button>
          )}
        </div>
        <br />
        <div>
          <Link to={`/groups/${expense.groupId}`}>
            <Button
              className="edit-expense-button"
              icon={<RollbackOutlined />}
              size="small"
            >
              Back
            </Button>
          </Link>
        </div>
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
})

export default connect(mapStateToProps, mapDispatchToProps)(SingleExpense)
