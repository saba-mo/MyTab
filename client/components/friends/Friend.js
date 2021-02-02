import React from 'react'
import {connect} from 'react-redux'
import {_loadAFriend} from '../../store/friends/friends'

class Friend extends React.Component {
  constructor() {
    super()
  }

  componentDidMount() {
    console.log('PROPS: ', this.props)

    this.props.loadFriend(
      this.props.user.id,
      this.props.thisFriend.Friends.friendId
    )
  }
  render() {
    console.log('PROPS: ', this.props)
    const friend = this.props.thisFriend
    return (
      <div className="friend-individual">
        <h4>
          {friend.firstName} {friend.lastName}
        </h4>
        <h5>{friend.email}</h5>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  console.log('STATE: ', state)
  return {
    friend: state.friends,
    user: state.user,
  }
}

const mapDispatchToProps = (dispatch) => ({
  loadFriend: (userId, friendId) => dispatch(_loadAFriend(userId, friendId)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Friend)
