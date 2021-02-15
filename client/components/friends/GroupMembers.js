import React from 'react'
import {connect} from 'react-redux'

import {
  _loadFriends,
  _loadGroupMembers,
  _addGroupMember,
  _deleteGroupMember,
} from '../../store'
import {List, Avatar, Button, Skeleton, Menu, Dropdown, message} from 'antd'
import {DownOutlined} from '@ant-design/icons'

// import Button from antd
// ant example loads 3 (the number stored in count) fake data inputs that are randomly generated every time fakeDataUrl is called
// const count = 3
// const fakeDataUrl = `https://randomuser.me/api/?results=${count}&inc=name,gender,email,nat&noinfo`

export class GroupMembers extends React.Component {
  constructor() {
    super()
    this.state = {
      numberOfMembers: 0,
      // initLoading: true,
      // loading: false,
      // data: [],
      // list: [],
    }

    this.attemptToRemoveMember = this.attemptToRemoveMember.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.friendsNotInGroup = this.friendsNotInGroup.bind(this)
    // this.onLoadMore = this.onLoadMore.bind(this)
  }

  componentDidMount() {
    this.props.loadGroupMembers(this.props.groupId)
    this.props.loadFriends(this.props.user.id)
  }

  // Ant process for componentDidMount:
  // the component mounts with 3 randomly generated names for the data array from fakeDataUrl and they are placed in the list array
  // componentDidMount() {
  //   this.getData((res) => {
  //     this.setState({
  //       initLoading: false,
  //       data: res.results,
  //       list: res.results,
  //     })
  //   })
  // }

  // Ant process for getData:
  // using an npm package ant requests (reqwest) three randomly generated name sets of data from fakeDataUrl, they are return in json type using api call .get
  // getData = (callback) => {
  //   reqwest({
  //     url: fakeDataUrl,
  //     type: 'json',
  //     method: 'get',
  //     contentType: 'application/json',
  //     success: (res) => {
  //       callback(res)
  //     },
  //   })
  // }

  // Ant process for onLoadMore:
  // sets the state list array with concatinated data aray plus three more seen as loading, while getData is running the stat loading is true.
  // gets more data from fakeDataUrl (res) then adds to data array, sets the state with the data and updates the list array to equal the data array, once done it updates the loading to false. Lastly a window.dipatchEvent

  // onLoadMore = () => {
  //   this.setState({
  //     loading: true,
  //     list: this.state.data.concat(
  //       [...new Array(3)].map(() => ({
  //         loading: true,
  //         // name: {}
  //       }))
  //     ),
  //   })
  //   this.getData((res) => {
  //     const data = this.state.data.concat(res.results)
  //     this.setState(
  //       {
  //         data,
  //         list: data,
  //         loading: false,
  //       },
  //       () => {
  //         // Resetting window's offsetTop so as to display react-virtualized demo underfloor.
  //         // In real scene, you can using public method of react-virtualized:
  //         // https://stackoverflow.com/questions/46700726/how-to-use-public-method-updateposition-of-react-virtualized
  //         window.dispatchEvent(new Event('resize'))
  //       }
  //     )
  //   })
  // }

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
    message.info(`You added a friend`)
  }

  // if group member has outstanding balance in the group, alert they cannot be removed, else remove them
  async attemptToRemoveMember(groupId, memberId, lengthOfMembersArray, item) {
    this.setState({numberOfMembers: lengthOfMembersArray})
    await this.props.deleteGroupMember(groupId, memberId)
    if (this.props.groupMembers.length === this.state.numberOfMembers) {
      message.info('You cannot remove a member with a balance in the group.')
    } else message.info(`You have removed ${item.firstName} from this group`)
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

    // const {initLoading, loading} = this.state
    // const loadMore =
    //   !initLoading && !loading ? (
    //     <div
    //       style={{
    //         textAlign: 'center',
    //         marginTop: 12,
    //         height: 32,
    //         lineHeight: '32px',
    //       }}
    //     >
    //       <Button onClick={this.onLoadMore}>loading more</Button>
    //     </div>
    //   ) : null

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
            // loading={initLoading}
            itemLayout="horizontal"
            // loadMore={loadMore}
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
        <div id="add-friend-dropdown">
          <Dropdown overlay={addFriendMenu}>
            <a
              className="add-to-group-dropdown"
              onClick={(e) => e.preventDefault()}
            >
              Add a friend to this group <DownOutlined />
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
