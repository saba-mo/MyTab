import React from 'react'
import {connect} from 'react-redux'
import {_loadFriends, _loadGroupMembers, _addGroupMember} from '../../store'

class AddGroupMemberForm extends React.Component {
  constructor() {
    super()
    // does member need to be empty object if we want to send the whole friend?
    this.state = {member: ''}
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.friendsNotInGroup = this.friendsNotInGroup.bind(this)
  }

  // filters out user's friends that are already in group so they don't appear in dropdown menu
  friendsNotInGroup(friends, groupMembers) {
    let availableFriends
    for (let i = 0; i < groupMembers.length; i++) {
      let member = groupMembers[i]
      availableFriends = friends.filter((friend) => friend.id !== member.id)
    }
    return availableFriends
  }

  handleChange(event) {
    console.log('value: ', event.target.value)
    // this.setState({
    //   member: event.target.member,
    // })
    this.setState({
      [event.target.name]: event.target.value,
    })
    console.log('state: ', this.state)
  }

  async handleSubmit(event) {
    if (!this.state.member) {
      event.preventDefault()
      alert('A required field is missing.')
      return
    }
    event.preventDefault()
    try {
      await this.props.addGroupMember(this.props.groupId, this.state)
      this.setState({member: ''})
    } catch (error) {
      console.log('Unable to add group member, because: ', error)
    }
  }

  componentDidMount() {
    this.props.loadFriends(this.props.user.id)
    this.props.loadGroupMembers(this.props.groupId)
  }

  render() {
    const friendsNotInGroup = this.friendsNotInGroup(
      this.props.friends,
      this.props.groupMembers
    )
    return (
      <form onSubmit={this.handleSubmit}>
        <label htmlFor="member">Add a friend to this group*</label>
        {/* something is wrong and not allowing state to change */}
        <select
          value={this.state.member}
          onChange={this.handleChange}
          name="member"
        >
          <option value="member">select</option>
          {friendsNotInGroup.map((friend) => (
            <option key={`friend-${friend.id}`} value={friend.firstName}>
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
