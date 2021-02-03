import React from 'react'
import {connect} from 'react-redux'
import {_createGroup} from '../../store/groups/groups'
import {Link} from 'react-router-dom'

export class CreateGroupForm extends React.Component {
  constructor() {
    super()
    this.state = {
      title: '',
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
    this.props.createGroup(this.state)
    this.setState({
      title: '',
    })
  }
  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label htmlFor="name">Group Name:</label>
        <input
          type="text"
          name="title"
          value={this.state.title}
          onChange={this.handleChange}
        />
        <button type="submit">Create Group</button>
      </form>
    )
  }
}
const mapState = (state) => {
  return {
    groups: state.groups,
  }
}
const mapDispatch = (dispatch) => {
  return {
    createGroup: (newGroup) => dispatch(_createGroup(newGroup)),
  }
}
export default connect(mapState, mapDispatch)(CreateGroupForm)
