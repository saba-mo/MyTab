import React from 'react'
import {connect} from 'react-redux'
import {_addGroupExpense, _loadGroupMembers} from '../../store'

export class CreateGroupExpenseForm extends React.Component {
  constructor() {
    super()
    this.state = {
      name: '',
      totalCost: '',
      paidBy: '',
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  componentDidMount() {
    this.props.loadGroupMembers(this.props.groupId)
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    })
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
    this.props.addGroupExpense(this.props.groupId, this.state)
    this.setState({
      name: '',
      totalCost: '',
      paidBy: '',
    })
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label htmlFor="name">Expense Name*</label>
        <input
          type="text"
          name="name"
          value={this.state.name}
          onChange={this.handleChange}
        />
        <label htmlFor="totalCost">Cost*</label>
        <div>$</div>
        <input
          className="form-state"
          type="text"
          name="totalCost"
          value={this.state.totalCost}
          onChange={this.handleChange}
        />
        <label htmlFor="paidBy">Paid by*</label>
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
        <button type="submit">Create Expense</button>
      </form>
    )
  }
}

const mapState = (state) => {
  return {
    groupExpenses: state.groupExpenses,
    groupMembers: state.groupMembers,
  }
}
const mapDispatch = (dispatch) => {
  return {
    addGroupExpense: (groupId, newExpense) =>
      dispatch(_addGroupExpense(groupId, newExpense)),
    loadGroupMembers: (groupId) => dispatch(_loadGroupMembers(groupId)),
  }
}
export default connect(mapState, mapDispatch)(CreateGroupExpenseForm)
