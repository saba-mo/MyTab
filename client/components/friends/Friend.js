import React from 'react'

class Friend extends React.Component {
  render() {
    const friend = this.props.friend
    return (
      <div className="friend-individual">
        <h4>
          {' '}
          {friend.firstName} {friend.lastName}
        </h4>
        <h5>{friend.email}</h5>
      </div>
    )
  }
}

export default Friend
