import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {TotalBalance} from '../index'

const UserHome = (props) => {
  const {firstName} = props
  const {userId} = props

  return (
    <div>
      <h3>Welcome, {firstName}!</h3>
      <TotalBalance />
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
