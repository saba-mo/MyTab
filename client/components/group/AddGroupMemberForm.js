import React from 'react'
import {connect} from 'react-redux'
import {_loadFriends} from '../../store'

class AddGroupMemberForm extends React.Component {
  constructor() {
    super()
    this.state = {memberId: ''}
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange(event) {
    this.setState({[event.target.name]: event.target.value})
  }

  async handleSubmit(event) {
    event.preventDefault()
    try {
      // await this.props.addFriend(this.props.user.id, this.state.email)
      this.setState({memberId: ''})
    } catch (error) {
      console.log('Unable to add group member, because: ', error)
    }
  }

  componentDidMount() {
    this.props.loadFriends(this.props.user.id)
  }

  render() {
    console.log(this.props)
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <div>
            <label htmlFor="memberId">Add a friend to this group</label>
            <select
              value={this.state.memberId}
              onChange={this.handleChange}
              name="memberId"
            >
              <option value="member">select</option>
              {this.props.friends.map((friend) => (
                <option key={`friend-${friend.id}`} value={friend.id}>
                  {friend.firstName} {friend.lastName}
                </option>
              ))}
            </select>
            <h6 className="required">* Required field</h6>
          </div>
          <div>
            <button type="submit">Add</button>
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
  }
}

const mapDispatchToProps = (dispatch) => ({
  // addFriend: (userId, email) => dispatch(_addFriend(userId, email)),
  loadFriends: (userId) => dispatch(_loadFriends(userId)),
})

export default connect(mapStateToProps, mapDispatchToProps)(AddGroupMemberForm)
