import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {logout} from '../../store'

const Navbar = ({handleClick, isLoggedIn}) => (
  <div>
    <div className="header">MyTab</div>
    {/* <Link to="/login">Login</Link>
          <Link to="/signup">Sign Up</Link> */}
    <nav>
      {isLoggedIn ? (
        <div>
          {/* The navbar will show these links after you log in */}
          <Link to="/home">Home</Link>
          <a href="#" onClick={handleClick}>
            Logout
          </a>
        </div>
      ) : (
        <div>
          <div className="signup">
            <h1> Track shared expenses worry free with MyTab.</h1>
            <Link to="/login">Login</Link>
            <Link to="/signup">Sign Up</Link>
          </div>
        </div>
      )}
    </nav>
    <h1 />
  </div>
)

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    isLoggedIn: !!state.user.id,
  }
}

const mapDispatch = (dispatch) => {
  return {
    handleClick() {
      dispatch(logout())
    },
  }
}

export default connect(mapState, mapDispatch)(Navbar)

/**
 * PROP TYPES
 */
Navbar.propTypes = {
  handleClick: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired,
}
