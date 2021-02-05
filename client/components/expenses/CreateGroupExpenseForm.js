import React from 'react'
import {connect} from 'react-redux'
import {_addGroupExpense} from '../../store/expenses/expenses'

const defaultState = {
  name: '',
  totalCost: '',
  members: [],
}

export class CreateGroupExpenseForm extends React.Component {
  constructor() {
    super()
    this.state = defaultState
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    })
  }

  handleSubmit(event) {
    event.preventDefault()
    try {
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

      console.log(
        'FORM: state.cost in group expense form',
        this.state.totalCost
      )
      console.log('FORM: initial type of ', typeof this.state.totalCost)

      // console.log('FORM: type of ', typeof this.state.totalCost)

      console.log('sending to thunk groupId', this.props.groupId)
      console.log('sending to thunk ExName', this.state.name)
      console.log('sending to thunk Cost', this.state.totalCost)

      this.props.addGroupExpense(
        this.props.groupId,
        this.state.name,
        this.state.totalCost
      )
      this.setState(defaultState)
    } catch (error) {
      console.log('Failed to handle expense submission due to: ', error)
    }
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
          {/*this is where i'll map over the group members  */}
          <option value="volvo">Volvo</option>
          <option value="saab">Saab</option>
          <option value="mercedes">Mercedes</option>
          <option value="audi">Audi</option>
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
  }
}
const mapDispatch = (dispatch) => {
  return {
    addGroupExpense: (groupId, newExpenseName, newExpenseCost) =>
      dispatch(_addGroupExpense(groupId, newExpenseName, newExpenseCost)),
  }
}
export default connect(mapState, mapDispatch)(CreateGroupExpenseForm)
