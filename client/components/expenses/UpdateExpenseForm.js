import React from 'react'
import {connect} from 'react-redux'
import {_loadGroupMembers, _updateExpense, _loadAnExpense} from '../../store'
import currency from 'currency.js'

export class UpdateExpenseForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      name: props.expense.name,
      totalCost: props.expense.totalCost,
      paidBy: props.user.id,
      // paidBy: props.expense.paidBy[0].id,
      owedByMember: {},
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleAmountOwedChange = this.handleAmountOwedChange.bind(this)
  }

  componentDidMount() {
    this.props.loadGroupMembers(this.props.groupId)
    this.props.loadAnExpense(this.props.groupId, this.props.expenseId)
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
    if (
      !this.state.name ||
      !this.state.totalCost ||
      !this.state.paidBy ||
      this.state.paidBy === 'select'
    ) {
      event.preventDefault()
      alert('A required field is missing.')
      return
    }
    if (!Number(this.state.totalCost)) {
      event.preventDefault()
      alert('Cost must be a number.')
      return
    }
    event.preventDefault()
    this.props.onClose()
    this.props.updateExpense(this.props.groupId, this.props.expense.id, {
      name: this.state.name,
      totalCost: currency(this.state.totalCost).value,
      paidBy: this.state.paidBy,
      owedByMember: this.state.owedByMember,
    })
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

    let paidBy
    if (this.state.paidBy) {
      paidBy = this.props.groupMembers.filter(
        (member) => member.id == this.state.paidBy
      )
    }

    let paidByName
    if (paidBy && paidBy.length) {
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
            placeholder="Ex: Quarantine Brunch"
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
            placeholder="Ex: 100 or 9.39"
            required
          />
          <label htmlFor="paidBy">Edit Paid By</label>
          <select
            className="expense-form"
            value={this.state.paidBy}
            onChange={this.handleChange}
            name="paidBy"
            required
          >
            <option value="member">select</option>
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
                      member.id === this.state.paidBy ? 'Paid by' : undefined
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
    // expense: state.singleExpense,
    user: state.user,
  }
}

const mapDispatch = (dispatch) => {
  return {
    loadGroupMembers: (groupId) => dispatch(_loadGroupMembers(groupId)),
    updateExpense: (groupId, expenseId, expense) =>
      dispatch(_updateExpense(groupId, expenseId, expense)),
    loadAnExpense: (groupId, expenseId) =>
      dispatch(_loadAnExpense(groupId, expenseId)),
  }
}

export default connect(mapState, mapDispatch)(UpdateExpenseForm)
