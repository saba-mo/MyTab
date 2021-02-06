import React from 'react'
import {connect} from 'react-redux'
import {_loadFriends, _loadGroupMembers, _addGroupMember} from '../../store'

class AddGroupMemberForm extends React.Component {
  constructor() {
    super()
    this.state = {member: ''}
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.friendsNotInGroup = this.friendsNotInGroup.bind(this)
  }

  componentDidMount() {
    this.props.loadFriends(this.props.user.id)
    this.props.loadGroupMembers(this.props.groupId)
  }

  // filters out user's friends that are already in group so they don't appear in dropdown menu
  // BUG: when you add a friend to the group, it removes them from the dropdown but replaces it with a friend who is already in the group...
  friendsNotInGroup(friends, groupMembers) {
    let availableFriends
    for (let i = 0; i < groupMembers.length; i++) {
      let member = groupMembers[i]
      availableFriends = friends.filter((friend) => friend.id !== member.id)
    }
    return availableFriends
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    })
  }

  handleSubmit(event) {
    if (!this.state.member) {
      event.preventDefault()
      alert('A required field is missing.')
      return
    }
    event.preventDefault()
    this.props.toggleForm()
    this.props.addGroupMember(this.props.groupId, {member: this.state.member})
    this.setState({member: ''})
  }

  render() {
    const friendsNotInGroup = this.friendsNotInGroup(
      this.props.friends,
      this.props.groupMembers
    )
    console.log('friends array: ', friendsNotInGroup)
    return (
      <form onSubmit={this.handleSubmit}>
        <label htmlFor="member">Add a friend to this group*</label>
        <select
          value={this.state.member}
          onChange={this.handleChange}
          name="member"
        >
          <option value="member">select</option>
          {friendsNotInGroup.map((friend) => (
            <option key={`friend-${friend.id}`} value={friend.id}>
              {friend.firstName} {friend.lastName}
            </option>
          ))}
        </select>
        <h6 className="required">* Required field</h6>
        <button type="submit">Add</button>
      </form>
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
  addGroupMember: (groupId, memberId) =>
    dispatch(_addGroupMember(groupId, memberId)),
  loadFriends: (userId) => dispatch(_loadFriends(userId)),
  loadGroupMembers: (groupId) => dispatch(_loadGroupMembers(groupId)),
})

export default connect(mapStateToProps, mapDispatchToProps)(AddGroupMemberForm)
