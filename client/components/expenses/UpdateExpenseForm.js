import React from 'react'
import {connect} from 'react-redux'
// import {_updateExpense} from '../../store'
import {_loadGroupMembers} from '../../store'
// import {Link} from 'react-router-dom'

export class UpdateExpenseForm extends React.Component {
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
    event.preventDefault()
    this.props.toggleForm()
    // this.props.updateExpense(this.props.singleGroup.id, {title: this.state.title})
    this.setState({
      name: '',
      totalCost: '',
      paidBy: '',
    })
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
        <input
          type="text"
          name="totalCost"
          value={this.state.totalCost}
          onChange={this.handleChange}
        />
        <label htmlFor="paidBy">Paid by</label>
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
        <div>
          <button type="submit">Edit</button>
        </div>
      </form>
    )
  }
}
const mapState = (state) => {
  return {
    // singleGroup: state.singleGroup,
    // groups: state.groups,
    groupMembers: state.groupMembers,
  }
}

const mapDispatch = (dispatch) => {
  return {
    loadGroupMembers: (groupId) => dispatch(_loadGroupMembers(groupId)),
    // updateExpense: (groupId, group) => dispatch(_updateExpense(groupId, group)),
  }
}
export default connect(mapState, mapDispatch)(UpdateExpenseForm)
