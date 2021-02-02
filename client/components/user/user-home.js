import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import Groups from '../group/Groups'
import {Link} from 'react-router-dom'

const UserHome = (props) => {
  const {firstName} = props
  const {email} = props

  return (
    <div>
      {firstName ? <h3>Welcome, {firstName}!</h3> : <h3>Welcome, {email}!</h3>}
      <div className="wrapper">
        {/* <form className="insert">
          <label id="totalL">
            <i className="fas fa-coins" /> How much?
          </label>
          <input type="number" id="total" placeholder="add the total" />

          <label id="totalL">
            <i className="fas fa-users" /> How many?
          </label>
          <input
            type="number"
            id="people"
            placeholder="add the number of people"
          />
          <label id="tipL">
            <i className="fas fa-heart" /> Feelin' generous?{' '}
            <button id="addTip">Add a tip</button>
          </label>
          <div id="tipInput">
            <input
              type="number"
              id="tipPercent"
              placeholder="add % of the total"
            />
          </div>
          <div className="buttonSpace">
            <button id="splitBtn">Split!</button>
            <button id="resetBtn">Reset</button>
          </div>
          <div id="perPerson">0</div>
        </form> */}
        <Link to={'/groups/{userId}'}>View Groups</Link>
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
