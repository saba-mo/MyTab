import React from 'react'
import {connect} from 'react-redux'
import {_addGroupExpense} from '../../store/expenses/expenses'

export class CreateGroupExpenseForm extends React.Component {
  constructor() {
    super()
    this.state = {
      name: '',
      totalCost: '',
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    })
  }

  handleSubmit(event) {
    if (!this.state.name || !this.state.totalCost) {
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
  }
}
const mapDispatch = (dispatch) => {
  return {
    addGroupExpense: (groupId, newExpense) =>
      dispatch(_addGroupExpense(groupId, newExpense)),
  }
}
export default connect(mapState, mapDispatch)(CreateGroupExpenseForm)
