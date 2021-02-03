import React from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {_loadFriends} from '../../store/friends/friends'
// , _deleteFriend

export class AllFriends extends React.Component {
  constructor(props) {
    super(props)
    this.handleDelete = this.handleDelete.bind(this)
  }

  componentDidMount() {
    this.props.loadFriends(this.props.user.id)
  }

  handleDelete = (friendToDelete) => {
    this.props.deleteFriend(friendToDelete)
  }

  noFriends = (friendList) => {
    if (friendList.length < 1) {
      return 'Add your friends to MyTab'
    }
  }

  render() {
    const friendList = this.props.friends
    return (
      <div>
        <main>
          <h2>My Friends on MyTab</h2>
        </main>
        <div id="full-friend-list">
          {this.noFriends(friendList)}
          <ul>
            {friendList.map((friendItem) => {
              return (
                <div key={`friend-${friendItem.Friends.friendId}`}>
                  <Link
                    to={{
                      pathname: `/friend/${friendItem.Friends.friendId}`,
                      state: {
                        friend: friendItem,
                      },
                    }}
                  >
                    {friendItem.firstName} {friendItem.lastName}{' '}
                    {friendItem.email}
                  </Link>
                </div>
              )
            })}
          </ul>
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
  deleteFriend: (friend) => dispatch(_deleteFriend(friend)),
})

export default connect(mapStateToProps, mapDispatchToProps)(AllFriends)
