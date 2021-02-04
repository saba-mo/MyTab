import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {_loadAFriend, _deleteFriend} from '../../store/'

class Friend extends React.Component {
  constructor() {
    super()
    this.handleDelete = this.handleDelete.bind(this)
  }

  componentDidMount() {
    this.props.loadFriend(this.props.user.id, this.props.match.params.friendId)
  }

  handleDelete = (userId, friendToDelete) => {
    this.props.deleteFriend(userId, friendToDelete)
    window.location = '/friends'
  }

  render() {
    const {friend} = this.props
    const user = this.props.user.id

    return (
      <div className="friend-individual">
        <div className="pages-view-navbar">
          <Link to="/friends">
            <h3>Back to All Friends </h3>
          </Link>
        </div>
        <h4>
          {friend.firstName} {friend.lastName}
        </h4>
        <h5>{friend.email}</h5>
        <button
          id="remove-friend"
          type="button"
          onClick={() => this.handleDelete(user, friend.id)}
        >
          Remove Friend Connection
        </button>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
    friend: state.singleFriend,
  }
}

const mapDispatchToProps = (dispatch) => ({
  loadFriend: (userId, friendId) => dispatch(_loadAFriend(userId, friendId)),
  deleteFriend: (userId, friend) => dispatch(_deleteFriend(userId, friend)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Friend)
