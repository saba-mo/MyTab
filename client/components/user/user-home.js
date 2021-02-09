import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import TotalBalance from '../totalBalance/TotalBalance'

const UserHome = (props) => {
  const {firstName} = props
  const {userId} = props

  return (
    <div>
      <h3>Welcome, {firstName}!</h3>
      <TotalBalance />
      <div className="wrapper">
        <Link to={`/groups/${userId}`}>
          <img
            className="groupImg"
            src="images/groupImage.png"
            // title is the text that appears when you hover over the image
            title="Groups"
            alt="Second slide"
            height="400px"
          />
        </Link>
        {/* <a to={`/groups/${userId}`}>
          <img src="images/groupImage.png" />
            </a> */}
        {/* <Groups /> */}
      </div>
      <div className="wrapper">
        <Link src="images/friendsImage.png" to="/friends">
          <img
            className="groupImg"
            src="images/friendsImage.png"
            // title is the text that appears when you hover over the image
            title="Friends"
            alt="Second slide"
            height="400px"
            width="407.406px"
          />
        </Link>
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
    userId: state.user.id,
  }
}

export default connect(mapState)(UserHome)

/**
 * PROP TYPES
 */
UserHome.propTypes = {
  firstName: PropTypes.string,
}
