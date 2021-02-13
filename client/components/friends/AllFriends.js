import React from 'react'
import {connect} from 'react-redux'
import {_loadFriends, _deleteFriend} from '../../store'
import {AddFriendForm} from '../../components'
import {List, Avatar, Skeleton} from 'antd'

export class AllFriends extends React.Component {
  constructor(props) {
    super(props)
    this.state = {showForm: false}

    this.toggleShowForm = this.toggleShowForm.bind(this)
    this.handleDelete = this.handleDelete.bind(this)
  }

  componentDidMount() {
    this.props.loadFriends(this.props.user.id)
  }

  toggleShowForm() {
    this.setState({showForm: !this.state.showForm})
  }

  handleDelete = (userId, friendToDelete) => {
    this.props.deleteFriend(userId, friendToDelete)
  }

  noFriends = (friendList) => {
    if (friendList.length < 1) {
      return 'Add your friends to MyTab.'
    }
  }

  render() {
    const friendList = this.props.friends
    const user = this.props.user.id
    return (
      <div>
        <main>
          <h2>My Friends on MyTab</h2>
        </main>
        <div className="editGroupPencil">
          {this.state.showForm ? (
            <AddFriendForm toggleForm={this.toggleShowForm} />
          ) : (
            <img
              className="groupImg"
              src="/images/plus.png"
              height="64px"
              width="64px"
              title="Add a friend"
              onClick={this.toggleShowForm}
            />
          )}
        </div>
        <div id="full-friend-list">
          {this.noFriends(friendList)}
          <List
            className="friends-list"
            itemLayout="horizontal"
            dataSource={friendList}
            renderItem={(item) => (
              <List.Item
                actions={[
                  <a
                    key="friend"
                    onClick={() => this.handleDelete(user, item.id)}
                  >
                    Remove friend
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
                  <div> {item.email}</div>
                </Skeleton>
              </List.Item>
            )}
          />
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    friends: state.friends,
    user: state.user,
  }
}

const mapDispatchToProps = (dispatch) => ({
  loadFriends: (userId) => dispatch(_loadFriends(userId)),
  deleteFriend: (userId, friend) => dispatch(_deleteFriend(userId, friend)),
})

export default connect(mapStateToProps, mapDispatchToProps)(AllFriends)
