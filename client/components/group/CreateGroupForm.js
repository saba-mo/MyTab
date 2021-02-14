import React from 'react'
import {connect} from 'react-redux'
import {_createGroup} from '../../store/'
import {notification} from 'antd'

export class CreateGroupForm extends React.Component {
  constructor() {
    super()
    this.state = {
      title: '',
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.openSuccessNotification = this.openSuccessNotification.bind(this)
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    })
  }

  openSuccessNotification = (type) => {
    notification[type]({
      message: 'Group Added',
      description: 'Open the group and add a member!',
      placement: 'bottomRight',
    })
  }

  handleSubmit(event) {
    event.preventDefault()
    this.props.toggleForm()
    this.props.createGroup(this.state)
    if (this.state.title.length) {
      this.openSuccessNotification('success')
    }
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
