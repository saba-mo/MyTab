import React from 'react'
import {connect} from 'react-redux'
import {_loadGroupMembers, _updateExpense} from '../../store'
import currency from 'currency.js'
import {notification} from 'antd'

export class UpdateExpenseForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      name: props.expense.name,
      totalCost: props.expense.totalCost,
      paidBy: props.user.id,
      owedByMember: {},
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleAmountOwedChange = this.handleAmountOwedChange.bind(this)
    this.openSuccessNotification = this.openSuccessNotification.bind(this)
  }

  componentDidMount() {
    this.props.loadGroupMembers(this.props.groupId)
  }

  openSuccessNotification = (type) => {
    notification[type]({
      message: 'Updated!',
      description: 'Your expense has been updated.',
      placement: 'bottomRight',
    })
  }

  handleChange(event) {
    let value
    if (event.target.name === 'name') {
      value = event.target.value
    } else {
      // totalCost and owedId should be numbers
      value = Number(event.target.value)
    }
    if (event.target.name === 'paidBy') {
      let owedByMember = this.state.owedByMember
      let memberId = Number(event.target.value)
      delete owedByMember[memberId]
      this.setState({owedByMember})
    }
    this.setState({
      [event.target.name]: value,
    })
  }

  handleAmountOwedChange(memberId, amount) {
    let owedByMember = this.state.owedByMember
    owedByMember[memberId] = amount
    this.setState({owedByMember})
  }

  handleSubmit(event) {
    event.preventDefault()
    this.props.toggleForm()
    this.props.updateExpense(this.props.groupId, this.props.expense.id, {
      name: this.state.name,
      totalCost: currency(this.state.totalCost).value,
      paidBy: this.state.paidBy,
      owedByMember: this.state.owedByMember,
    })
    this.openSuccessNotification('success')
  }

  render() {
    let totalOwed
    if (Object.values(this.state.owedByMember).length === 0) {
      totalOwed = 0
    } else {
      totalOwed = Object.values(this.state.owedByMember).reduce(
        (sum, val) => sum + val
      )
    }
    let remainder = this.state.totalCost

    const paidBy = this.props.groupMembers.filter(
      (member) => member.id == this.state.paidBy
    )

    let paidByName
    if (paidBy.length) {
      if (paidBy[0].id == this.props.user.id) {
        paidByName = 'Your'
      } else {
        paidByName = paidBy[0].firstName + ' ' + paidBy[0].lastName + "'s"
      }
    }

    return (
      <div className="expense-form-container">
        <form onSubmit={this.handleSubmit}>
          <label htmlFor="name">Edit Name:</label>
          <input
            className="expense-form"
            type="text"
            name="name"
            value={this.state.name}
            onChange={this.handleChange}
            placeholder="Ex: Brunch"
            required
          />
          <label htmlFor="totalCost">Edit Cost:</label>
          <input
            className="form-state, expense-form"
            type="number"
            name="totalCost"
            step="0.01"
            min={0}
            value={this.state.totalCost === 0 ? '' : this.state.totalCost}
            onChange={this.handleChange}
            placeholder="Ex: 10.89"
            required
          />
          <label htmlFor="paidBy">Edit Paid By:</label>
          <select
            className="expense-form"
            value={this.state.paidBy}
            onChange={this.handleChange}
            name="paidBy"
            required
          >
            {this.props.groupMembers.map((member) => (
              <option key={`member-${member.id}`} value={member.id}>
                {member.firstName} {member.lastName}
              </option>
            ))}
          </select>
          <div className="expense-form">
            {this.props.groupMembers.map((member) => (
              <div className="container" key={member.id}>
                <div>
                  {member.firstName} {member.lastName} owes:
                  <input
                    disabled={member.id === this.state.paidBy}
                    className="expense-form"
                    min={0}
                    type="number"
                    step="0.01"
                    value={
                      this.state.owedByMember[member.id] === undefined
                        ? ''
                        : this.state.owedByMember[member.id] === 0
                        ? ''
                        : this.state.owedByMember[member.id]
                    }
                    placeholder={
                      member.id === this.state.paidBy ? 'Paid by' : 'Ex: 10.89'
                    }
                    onChange={(event) =>
                      this.handleAmountOwedChange(
                        member.id,
                        Number(event.target.value)
                      )
                    }
                  />
                </div>
              </div>
            ))}
          </div>
          <div>
            <div>Total Cost: {currency(this.state.totalCost).format()}</div>
            <div>Total Owed: {currency(totalOwed).format()}</div>
            {remainder - totalOwed &&
            remainder - totalOwed != this.state.totalCost ? (
              <div className="error">
                {paidByName} share: {currency(remainder - totalOwed).format()}
              </div>
            ) : (
              ''
            )}
          </div>

          {totalOwed > this.state.totalCost && (
            <div className="error">
              Total Cost cannot be greater than Total Owed
            </div>
          )}
          {totalOwed === 0 && (
            <div className="error">Total Owed must be greater than 0</div>
          )}
          <div>
            <button
              type="submit"
              className="create-expense-button"
              disabled={totalOwed === 0 || totalOwed > this.state.totalCost}
            >
              Update Expense
            </button>
          </div>
        </form>
      </div>
    )
  }
}

const mapState = (state) => {
  return {
    groupMembers: state.groupMembers,
    expense: state.singleExpense,
    user: state.user,
  }
}

const mapDispatch = (dispatch) => {
  return {
    loadGroupMembers: (groupId) => dispatch(_loadGroupMembers(groupId)),
    updateExpense: (groupId, expenseId, expense) =>
      dispatch(_updateExpense(groupId, expenseId, expense)),
  }
}

export default connect(mapState, mapDispatch)(UpdateExpenseForm)
