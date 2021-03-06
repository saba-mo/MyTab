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
    this.props.createGroup(this.props.user.id, this.state)
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
        <label htmlFor="name" />
        <input
          type="text"
          name="title"
          placeholder="Enter group name"
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
    user: state.user,
  }
}
const mapDispatch = (dispatch) => {
  return {
    createGroup: (userId, newGroup) => dispatch(_createGroup(userId, newGroup)),
  }
}
export default connect(mapState, mapDispatch)(CreateGroupForm)
