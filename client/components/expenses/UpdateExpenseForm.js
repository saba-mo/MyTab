import React from 'react'
import {connect} from 'react-redux'
import {_loadGroupMembers, _updateExpense} from '../../store'
import currency from 'currency.js'

// * [ ] added dependency currency.js so deal with currency in our database
// * [ ] models user_group and expense deal with FLOAT, not INTEGER
// * [ ] database now able to store dollars and cents instead of all pennies
// * [ ] refactored groups api to reflect use of currency
// * [ ] added note in groups api for a reminder to later add a validation
// * [ ] moved dummydata to script file
// * [ ] update dummydata to have decimals again
// * [ ] update dummydata for user passwords to be password to more easily test as engineers (left two of them with secure passwords)
// * [ ]
const defaultState = {
  name: '',
  totalCost: '',
  paidBy: '',
}

export class UpdateExpenseForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = defaultState
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
    event.preventDefault()
    try {
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

      this.props.addGroupExpense(this.props.groupId, {
        name: this.state.name,
        totalCost: currency(this.state.totalCost).value,
        paidBy: this.state.paidBy,
      })
      this.setState(defaultState)
    } catch (error) {
      console.log('Failed to handle expense submission due to: ', error)
    }
    // this.props.toggleForm()
    // this.props.updateExpense(
    //   this.props.groupId,
    //   this.props.expense.id,
    //   this.state
    // )
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label htmlFor="name">Edit Name:</label>
        <input
          type="text"
          name="name"
          value={this.state.name}
          onChange={this.handleChange}
        />
        <label htmlFor="totalCost">Edit Cost:</label>
        <div>$</div>
        <input
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
        <button type="submit">Save</button>
      </form>
    )
  }
}
const mapState = (state) => {
  return {
    groupMembers: state.groupMembers,
    expense: state.singleExpense,
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
