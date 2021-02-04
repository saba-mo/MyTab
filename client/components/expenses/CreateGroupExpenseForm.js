import React from 'react'
import {connect} from 'react-redux'
// import {_createGroup} from '../../store/groups/groups'
import {Link} from 'react-router-dom'

export class CreateGroupExpenseForm extends React.Component {
  constructor() {
    super()
    this.state = {
      name: '',
      totalCost: '$',
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
    event.preventDefault()
    // this.props.createExpense(this.state)
    this.setState({
      name: '',
      totalCost: '$',
    })
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label htmlFor="name">Expense Name:</label>
        <input
          type="text"
          name="name"
          value={this.state.name}
          onChange={this.handleChange}
        />
        <label htmlFor="totalCost">Amount:</label>
        <input
          type="text"
          name="totalCost"
          value={this.state.totalCost}
          onChange={this.handleChange}
        />
        <button type="submit">Create Expense</button>
      </form>
    )
  }
}

// is this necessary?
// const mapState = (state) => {
//   return {
//     groupExpenses: state.groupExpenses,
//   }
// }
// const mapDispatch = (dispatch) => {
//   return {
//     createGroupExpense: (newExpense) =>
//       dispatch(_createGroupExpense(newExpense)),
//   }
// }
// export default connect(mapState, mapDispatch)(CreateGroupExpenseForm)
export default CreateGroupExpenseForm
