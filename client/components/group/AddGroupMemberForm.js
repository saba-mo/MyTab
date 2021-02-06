import React from 'react'
import {connect} from 'react-redux'
import {_loadFriends, _loadGroupMembers} from '../../store'

class AddGroupMemberForm extends React.Component {
  constructor() {
    super()
    this.state = {memberId: ''}
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.availableFriends = this.availableFriends.bind(this)
  }

  // filters out user's friends that are already in group so they don't appear in dropdown menu
  availableFriends(friends, groupMembers) {
    let availableFriends
    for (let i = 0; i < groupMembers.length; i++) {
      let member = groupMembers[i]
      availableFriends = friends.filter((friend) => friend.id !== member.id)
    }
    return availableFriends
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
    this.props.loadGroupMembers(this.props.groupId)
  }

  render() {
    const availableFriends = this.availableFriends(
      this.props.friends,
      this.props.groupMembers
    )
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
              {/* how to filter list to not show who is already in this group */}
              {availableFriends.map((friend) => (
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
    groupMembers: state.groupMembers,
  }
}

const mapDispatchToProps = (dispatch) => ({
  // addFriend: (userId, email) => dispatch(_addFriend(userId, email)),
  loadFriends: (userId) => dispatch(_loadFriends(userId)),
  loadGroupMembers: (groupId) => dispatch(_loadGroupMembers(groupId)),
})

export default connect(mapStateToProps, mapDispatchToProps)(AddGroupMemberForm)
