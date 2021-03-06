import React from 'react'
import {connect} from 'react-redux'
import {_addFriend, _loadFriends, _loadAllUsers} from '../../store'
import {notification} from 'antd'

class AddFriendForm extends React.Component {
  constructor() {
    super()
    this.state = {email: ''}
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.openSuccessNotification = this.openSuccessNotification.bind(this)
    this.openFailureSelfNotification = this.openFailureSelfNotification.bind(
      this
    )
    this.openFailureNoAccountNotification = this.openFailureNoAccountNotification.bind(
      this
    )
    this.openFailureAlreadyFriendsNotification = this.openFailureAlreadyFriendsNotification.bind(
      this
    )
  }

  componentDidMount() {
    this.props.loadFriends(this.props.user.id)
    this.props.loadAllUsers()
  }

  handleChange(event) {
    this.setState({[event.target.name]: event.target.value})
  }

  openSuccessNotification = (type) => {
    notification[type]({
      message: 'Friend Added',
      description: 'You are now friends on MyTab.',
      placement: 'bottomRight',
    })
  }

  openFailureSelfNotification = (type) => {
    notification[type]({
      message: 'Request failed',
      description: 'You cannot add yourself.',
      placement: 'bottomRight',
    })
  }

  openFailureNoAccountNotification = (type) => {
    notification[type]({
      message: 'Request failed',
      description:
        'Ask your friend to make a MyTab account so you can add them!',
      placement: 'bottomRight',
    })
  }

  openFailureAlreadyFriendsNotification = (type) => {
    notification[type]({
      message: 'Request failed',
      description: 'You are already friends.',
      placement: 'bottomRight',
    })
  }

  handleSubmit(event) {
    event.preventDefault()
    this.props.toggleForm()
    const checkIfFriends = this.props.friends.filter(
      (friend) => friend.email === this.state.email
    )
    const checkIfUser = this.props.allUsers.filter(
      (user) => user.email === this.state.email
    )

    if (this.props.user.email === this.state.email) {
      this.openFailureSelfNotification('error')
    } else if (checkIfFriends.length) {
      this.openFailureAlreadyFriendsNotification('error')
    } else if (!checkIfUser.length) {
      this.openFailureNoAccountNotification('error')
    } else {
      this.props.addFriend(this.props.user.id, this.state.email)
      this.setState({email: ''})
      this.openSuccessNotification('success')
    }
  }

  render() {
    const {email} = this.state
    return (
      <div className="friend-form-container">
        <form onSubmit={this.handleSubmit}>
          <div>
            <label htmlFor="email">
              <h5>Find your friend by their email.</h5>
              <p>Friends must first create an account with MyTab.</p>
            </label>
            <br />
            <input
              className="friend-form"
              name="email"
              type="email"
              value={email}
              placeholder="Ex: hello@world.com"
              onChange={this.handleChange}
            />
          </div>

          <div>
            <button type="submit">Add My Friend</button>
          </div>
        </form>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
    friends: state.friends,
    allUsers: state.allUsers,
  }
}

const mapDispatchToProps = (dispatch) => ({
  addFriend: (userId, email) => dispatch(_addFriend(userId, email)),
  loadFriends: (userId) => dispatch(_loadFriends(userId)),
  loadAllUsers: () => dispatch(_loadAllUsers()),
})

export default connect(mapStateToProps, mapDispatchToProps)(AddFriendForm)
