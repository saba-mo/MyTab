import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import Groups from '../group/Groups'
import {Link} from 'react-router-dom'

const UserHome = (props) => {
  const {firstName} = props
  const {email} = props
  const {userId} = props

  return (
    <div>
      {firstName ? <h3>Welcome, {firstName}!</h3> : <h3>Welcome, {email}!</h3>}
      <div className="wrapper">
        <img
          className="groupImg"
          src="images/groupImage.png"
          alt="Second slide"
          height="400px"
        />
        <Link src="images/groupImage.png" to={`/groups/${userId}`}>
          View Groups
        </Link>
        {/* <Groups /> */}
      </div>
    </div>
  )
}

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    firstName: state.user.firstName,
    email: state.user.email,
    userId: state.user.id,
  }
}

export default connect(mapState)(UserHome)

/**
 * PROP TYPES
 */
UserHome.propTypes = {
  firstName: PropTypes.string,
  email: PropTypes.string,
}
