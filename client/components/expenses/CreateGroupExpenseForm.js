import React from 'react'
import {connect} from 'react-redux'
import {_addGroupExpense, _loadGroupMembers} from '../../store'
import currency from 'currency.js'
import {notification} from 'antd'

export class CreateGroupExpenseForm extends React.Component {
  constructor(props) {
    super()
    this.state = {
      name: '',
      totalCost: '',
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
      message: 'Added!',
      description: 'Your expense has been added.',
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
    try {
      event.preventDefault()
      this.props.toggleForm()
      this.props.addGroupExpense(this.props.groupId, {
        name: this.state.name,
        totalCost: currency(this.state.totalCost).value,
        paidBy: this.state.paidBy,
        owedByMember: this.state.owedByMember,
      })
      this.openSuccessNotification('success')
    } catch (error) {
      console.error(
        'Failed to handle expense submission due to this error: ',
        error
      )
    }
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
    if (paidBy[0].id === this.props.user.id) {
      paidByName = 'Your'
    } else {
      paidByName = paidBy[0].firstName + ' ' + paidBy[0].lastName + "'s"
    }

    return (
      <div className="expense-form-container">
        <form onSubmit={this.handleSubmit}>
          <label htmlFor="name">Expense Name:</label>
          <input
            className="expense-form"
            type="text"
            name="name"
            value={this.state.name}
            onChange={this.handleChange}
            placeholder="Ex: Quarantine Brunch"
            required
          />
          <label htmlFor="totalCost">Cost:</label>
          <input
            className="form-state, expense-form"
            type="number"
            name="totalCost"
            step="0.01"
            min={0}
            value={this.state.totalCost === 0 ? '' : this.state.totalCost}
            onChange={this.handleChange}
            placeholder="Ex: 100 or 9.39"
            required
          />
          <label htmlFor="paidBy">Paid By:</label>
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
                      member.id === this.state.paidBy
                        ? 'Paid by'
                        : 'Ex: 100 or 9.39'
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
              className="create-expense-button"
              type="submit"
              disabled={totalOwed === 0 || totalOwed > this.state.totalCost}
            >
              Create Expense
            </button>
          </div>
        </form>
      </div>
    )
  }
}

const mapState = (state) => {
  return {
    user: state.user,
    groupExpenses: state.groupExpenses,
    groupMembers: state.groupMembers,
  }
}

const mapDispatch = (dispatch) => {
  return {
    addGroupExpense: (groupId, newExpenseObject) =>
      dispatch(_addGroupExpense(groupId, newExpenseObject)),
    loadGroupMembers: (groupId) => dispatch(_loadGroupMembers(groupId)),
  }
}

export default connect(mapState, mapDispatch)(CreateGroupExpenseForm)
