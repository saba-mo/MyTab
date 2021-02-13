import React from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {
  _loadGroupExpenses,
  _loadGroupMembers,
  _deleteGroupExpense,
} from '../../store'
import {CreateGroupExpenseForm} from '../index'
import currency from 'currency.js'
import {List, Avatar} from 'antd'

export class GroupExpenses extends React.Component {
  constructor() {
    super()
    this.state = {showForm: false}

    this.toggleShowForm = this.toggleShowForm.bind(this)
    this.checkMembersList = this.checkMembersList.bind(this)
    this.deleteExpense = this.deleteExpense.bind(this)
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

  deleteExpense(expenseId) {
    if (
      window.confirm(
        'Are you sure you want to delete this expense? This will remove this expense for all members involved.'
      )
    ) {
      const {groupId} = this.props
      this.props.deleteGroupExpense(groupId, expenseId)
    }
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
        <div id="group-expense-list">
          {this.noExpenses(groupExpenses)}
          <List
            className="group-expenses"
            itemLayout="horizontal"
            dataSource={groupExpenses}
            renderItem={(item) => (
              <List.Item
                actions={[
                  <a
                    key="group-expense"
                    onClick={() => this.deleteExpense(item.id)}
                  >
                    Delete expense
                  </a>,
                  <a key="group-expense" onClick={() => console.log('edit')}>
                    Edit expense
                  </a>,
                ]}
              >
                <List.Item.Meta
                  avatar={
                    <Avatar src="https://i.pinimg.com/564x/f5/95/b8/f595b89bc0216e93537cf81ff799cbef.jpg" />
                  }
                  title={
                    <Link
                      to={`/groups/singleGroup/${item.groupId}/expenses/${item.id}`}
                    >
                      {item.name}
                    </Link>
                  }
                />
                <div>
                  {currency(item.totalCost).format()} paid by:{' '}
                  {item.users[0].firstName} {item.users[0].lastName}
                </div>
              </List.Item>
            )}
          />
          <h3>Total group expenses: {currency(groupTotal).format()}</h3>
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
  deleteGroupExpense: (groupId, expenseId) =>
    dispatch(_deleteGroupExpense(groupId, expenseId)),
})

export default connect(mapStateToProps, mapDispatchToProps)(GroupExpenses)
