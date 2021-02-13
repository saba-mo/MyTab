import React from 'react'
import {connect} from 'react-redux'
import {_updateGroup} from '../../store/groups/singleGroup'

export class UpdateGroupForm extends React.Component {
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
    this.props.toggleForm()
    this.props.updateGroup(this.props.singleGroup.id, {title: this.state.title})
    this.setState({
      title: '',
    })
  }
  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label htmlFor="name">Update Group Name:</label>
        <input
          type="text"
          name="title"
          value={this.state.title}
          onChange={this.handleChange}
        />
        <button type="submit">Save</button>
      </form>
    )
  }
}
const mapState = (state) => {
  return {
    singleGroup: state.singleGroup,
    groups: state.groups,
  }
}

const mapDispatch = (dispatch) => {
  return {
    updateGroup: (groupId, group) => dispatch(_updateGroup(groupId, group)),
  }
}
export default connect(mapState, mapDispatch)(UpdateGroupForm)
