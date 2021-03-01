import React from 'react'
import {connect} from 'react-redux'
import {
  _loadFriends,
  _loadGroupMembers,
  _addGroupMember,
  _deleteGroupMember,
} from '../../store'
import {
  List,
  Avatar,
  Skeleton,
  Menu,
  Dropdown,
  message,
  notification,
} from 'antd'
import {DownOutlined} from '@ant-design/icons'

export class GroupMembers extends React.Component {
  constructor() {
    super()
    this.state = {
      numberOfMembers: 0,
    }

    this.attemptToRemoveMember = this.attemptToRemoveMember.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.friendsNotInGroup = this.friendsNotInGroup.bind(this)
    this.addedSuccessNotification = this.addedSuccessNotification.bind(this)
    this.removeSuccessNotification = this.removeSuccessNotification.bind(this)
  }

  componentDidMount() {
    this.props.loadGroupMembers(this.props.groupId)
    this.props.loadFriends(this.props.user.id)
  }

  // filters out user's friends that are already in group so they don't appear in dropdown menu
  friendsNotInGroup(friends, groupMembers) {
    const availableFriends = []
    for (let i = 0; i < friends.length; i++) {
      let friend = friends[i]
      const inGroup = groupMembers.filter((member) => member.id === friend.id)
      if (!inGroup.length) {
        availableFriends.push(friend)
      }
    }
    return availableFriends
  }

  addedSuccessNotification = (type) => {
    notification[type]({
      message: 'Added',
      description: 'Your friend has been added to this group.',
      placement: 'bottomRight',
    })
  }

  removeSuccessNotification = (type) => {
    notification[type]({
      message: 'Removed',
      description: 'You have removed the member from this group.',
      placement: 'bottomRight',
    })
  }

  removeFailureNotification = (type) => {
    notification[type]({
      message: 'Request failed',
      description: 'You cannot remove a member with a balance in the group.',
      placement: 'bottomRight',
    })
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    })
  }

  handleSubmit({key}) {
    if (key == 0) {
      message.info(`Choose a friend`)
      return
    }
    this.props.addGroupMember(this.props.groupId, {member: key})
    this.addedSuccessNotification('success')
  }

  // if group member has outstanding balance in the group, alert they cannot be removed, else remove them
  async attemptToRemoveMember(groupId, memberId, lengthOfMembersArray, item) {
    this.setState({numberOfMembers: lengthOfMembersArray})
    await this.props.deleteGroupMember(groupId, memberId)
    if (this.props.groupMembers.length === this.state.numberOfMembers) {
      this.removeFailureNotification('error')
    } else this.removeSuccessNotification('success')
  }

  noMembers = (memberList) => {
    if (memberList.length < 1) {
      return 'Add members to this group here.'
    }
  }

  render() {
    const {groupMembers} = this.props
    const lengthOfMembersArray = groupMembers.length
    const friendsNotInGroup = this.friendsNotInGroup(
      this.props.friends || [],
      this.props.groupMembers || []
    )

    //drop down menu for choosing a friend to add to the group
    const addFriendMenu = (
      <Menu onClick={this.handleSubmit}>
        <Menu.Item key="0">Choose a friend</Menu.Item>
        {friendsNotInGroup.map((friend) => (
          <Menu.Item key={`${friend.id}`} value={friend.id}>
            {friend.firstName} {friend.lastName}
          </Menu.Item>
        ))}
      </Menu>
    )

    return (
      <div>
        <div id="full-member-list">
          {this.noMembers(groupMembers)}
          <List
            className="group-member-list"
            itemLayout={window.innerWidth < 700 ? 'vertical' : 'horizontal'}
            dataSource={groupMembers}
            renderItem={(item) => (
              <List.Item
                actions={[
                  <a
                    key="group-member"
                    onClick={() =>
                      this.attemptToRemoveMember(
                        this.props.groupId,
                        item.id,
                        lengthOfMembersArray,
                        item
                      )
                    }
                  >
                    Remove from group
                  </a>,
                ]}
              >
                <Skeleton avatar title={false} loading={item.loading} active>
                  <List.Item.Meta
                    avatar={
                      <Avatar src="https://i.pinimg.com/564x/b0/5d/22/b05d222fdf7ff4d4fbc2902b536cc9b2.jpg" />
                    }
                    title={`${item.firstName} ${item.lastName}`}
                  />
                </Skeleton>
              </List.Item>
            )}
          />
        </div>
        <div id="add-member-dropdown">
          <Dropdown overlay={addFriendMenu}>
            <a onClick={(e) => e.preventDefault()}>
              + Add friend to group <DownOutlined />
            </a>
          </Dropdown>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    groupMembers: state.groupMembers,
    user: state.user,
    friends: state.friends,
  }
}

const mapDispatchToProps = (dispatch) => ({
  loadGroupMembers: (groupId) => dispatch(_loadGroupMembers(groupId)),
  deleteGroupMember: (groupId, memberId) =>
    dispatch(_deleteGroupMember(groupId, memberId)),
  loadFriends: (userId) => dispatch(_loadFriends(userId)),
  addGroupMember: (groupId, memberId) =>
    dispatch(_addGroupMember(groupId, memberId)),
})

export default connect(mapStateToProps, mapDispatchToProps)(GroupMembers)
