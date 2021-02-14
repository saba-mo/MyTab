import React from 'react'
import {connect} from 'react-redux'
import {_addFriend, _loadFriends, _loadAllUsers} from '../../store'

class AddFriendForm extends React.Component {
  constructor() {
    super()
    this.state = {email: ''}
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  componentDidMount() {
    this.props.loadFriends(this.props.user.id)
    this.props.loadAllUsers()
  }

  handleChange(event) {
    this.setState({[event.target.name]: event.target.value})
  }

  handleSubmit(event) {
    event.preventDefault()
    this.props.toggleForm()
    try {
      const checkIfFriends = this.props.friends.filter(
        (friend) => friend.email === this.state.email
      )
      const checkIfUser = this.props.allUsers.filter(
        (user) => user.email === this.state.email
      )

      if (this.props.user.email === this.state.email) {
        alert('You cannot add yourself.')
      } else if (checkIfFriends.length) {
        alert('You are already friends.')
      } else if (!checkIfUser.length) {
        alert('Ask your friend to make a MyTab account so you can add them!')
      } else {
        this.props.addFriend(this.props.user.id, this.state.email)
        this.setState({email: ''})
      }
    } catch (error) {
      console.error(
        'Hmm, having a hard time adding this friend, here are more details: ',
        error
      )
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
