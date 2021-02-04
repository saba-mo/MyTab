import React from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {_loadFriends, _deleteFriend} from '../../store'
import {AddFriendForm} from '../../components'

export class AllFriends extends React.Component {
  constructor(props) {
    super(props)
    this.handleDelete = this.handleDelete.bind(this)
  }

  componentDidMount() {
    this.props.loadFriends(this.props.user.id)
  }

  handleDelete = (userId, friendToDelete) => {
    this.props.deleteFriend(userId, friendToDelete)
  }

  noFriends = (friendList) => {
    if (friendList.length < 1) {
      return 'Add your friends to MyTab'
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
        {this.noFriends(friendList)}
        <div id="full-friend-list">
          <ul>
            {friendList.map((friendItem) => {
              return (
                <div key={`friend-${friendItem.id}`}>
                  <Link to={`/friend/${friendItem.id}`}>
                    {friendItem.firstName} {friendItem.lastName}
                  </Link>
                  <button
                    type="button"
                    onClick={() => this.handleDelete(user, friendItem.id)}
                  >
                    Remove
                  </button>
                </div>
              )
            })}
          </ul>
        </div>
        <div id="add-friend">
          <AddFriendForm />
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
