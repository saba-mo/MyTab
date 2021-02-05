import React from 'react'
import {connect} from 'react-redux'
import {_addGroupExpense, _loadGroupMembers} from '../../store'

export class CreateGroupExpenseForm extends React.Component {
  constructor() {
    super()
    this.state = {
      name: '',
      totalCost: '',
      members: [],
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.validateForm = this.validateForm.bind(this)
  }

  componentDidMount() {
    this.props.loadGroupMembers(this.props.groupId)
  }

  validateForm(event, str) {
    event.preventDefault()
    alert(str)
  }

  handleChange(event) {
    this.setState({
      // does this take members array into account?
      [event.target.name]: event.target.value,
    })
  }

  handleSubmit(event) {
    if (!this.state.name || !this.state.totalCost) {
      this.validateForm(event, 'A required field is missing.')
      return
    }

    if (!Number(this.state.totalCost)) {
      this.validateForm(event, 'Cost must be a number.')
      return
    }

    if (this.state.members.length < 1) {
      this.validateForm(event, 'Please select at least one group member.')
      return
    }

    event.preventDefault()
    console.log('state: ', this.state)
    this.props.addGroupExpense(this.props.groupId, this.state)
    this.setState({
      name: '',
      totalCost: '',
      members: [],
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
        <input
          className="form-state"
          type="text"
          name="totalCost"
          value={this.state.totalCost}
          onChange={this.handleChange}
        />
        <label htmlFor="members">Assign to*</label>

        <select
          value={this.state.members}
          onChange={this.handleChange}
          name="members"
          multiple
        >
          {this.props.groupMembers.map((member) => (
            // should value be member.id?
            <option key={`member-${member.id}`} value={member.firstName}>
              {member.firstName}
            </option>
          ))}
        </select>
        <h6 className="required">* Required field</h6>
        <button type="submit">Create Expense</button>
      </form>
    )
  }
}

// is this necessary?
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
