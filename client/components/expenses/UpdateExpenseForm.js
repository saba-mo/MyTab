import React from 'react'
import {connect} from 'react-redux'
import {_loadGroupMembers, _updateExpense} from '../../store'
import currency from 'currency.js'

export class UpdateExpenseForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      name: props.expense.name,
      totalCost: props.expense.totalCost,
      paidBy: props.expense.paidBy[0].id,
      owedByMember: {},
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleAmountOwedChange = this.handleAmountOwedChange.bind(this)
  }

  componentDidMount() {
    this.props.loadGroupMembers(this.props.groupId)
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
    this.props.toggleForm()
    this.props.updateExpense(this.props.groupId, this.props.expense.id, {
      name: this.state.name,
      totalCost: currency(this.state.totalCost).value,
      paidBy: this.state.paidBy,
      owedByMember: this.state.owedByMember,
    })
  }

  render() {
    console.log('PROPS: ', this.props)
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
      <form onSubmit={this.handleSubmit}>
        <label htmlFor="name">Edit Name*:</label>
        <input
          type="text"
          name="name"
          value={this.state.name}
          onChange={this.handleChange}
          placeholder="Ex: Quarantine Brunch"
        />
        <label htmlFor="totalCost">Edit Cost*:</label>
        <div>$</div>
        <input
          className="form-state"
          type="number"
          name="totalCost"
          step="0.01"
          min={0}
          value={this.state.totalCost === 0 ? '' : this.state.totalCost}
          onChange={this.handleChange}
          placeholder="Ex: 100 or 9.39"
        />
        <label htmlFor="paidBy">Edit Paid By*</label>
        <select
          value={this.state.paidBy}
          onChange={this.handleChange}
          name="paidBy"
        >
          <option value="member">select</option>
          {this.props.groupMembers.map((member) => (
            <option key={`member-${member.id}`} value={member.id}>
              {member.firstName} {member.lastName}
            </option>
          ))}
        </select>
        <h6 className="required">* Required field</h6>
        {this.props.groupMembers.map((member) => (
          <div className="container" key={member.id}>
            <div>
              {member.firstName} {member.lastName}
            </div>
            <div>
              Amount Owed: $
              <input
                disabled={member.id === this.state.paidBy}
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
        <div>
          <div>Total Cost: {currency(this.state.totalCost).format()}</div>
          <div>Total Owed: {currency(totalOwed).format()}</div>
          {remainder - totalOwed &&
          remainder - totalOwed != this.state.totalCost ? (
            <div className="error">
              {paidByName} share: $
              {currency(remainder - totalOwed).value.toFixed(2)}
            </div>
          ) : (
            ''
          )}
        </div>
        <button
          type="submit"
          disabled={totalOwed === 0 || totalOwed > this.state.totalCost}
        >
          Update Expense
        </button>
        {totalOwed > this.state.totalCost && (
          <div className="error">
            Total Cost cannot be greater than Total Owed
          </div>
        )}
        {totalOwed === 0 && (
          <div className="error">Total Owed must be greater than 0</div>
        )}
      </form>
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
