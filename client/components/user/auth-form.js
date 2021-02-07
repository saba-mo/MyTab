import React from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import {auth, authSignUp} from '../../store/'

/**
 * COMPONENT
 */
const AuthForm = (props) => {
  const {name, displayName, handleSubmit, error} = props

  return (
    <div>
      <form onSubmit={handleSubmit} name={name}>
        <div>
          {displayName === 'Sign Up' ? (
            <div>
              <label htmlFor="firstName">
                <small>First Name*</small>
              </label>
              <input name="firstName" type="text" />

              <label htmlFor="lastName">
                <small>Last Name*</small>
              </label>
              <input name="lastName" type="text" />
            </div>
          ) : (
            ''
          )}
          <label htmlFor="email">
            <small>Email*</small>
          </label>
          <input name="email" type="text" />
        </div>
        <div>
          <label htmlFor="password">
            <small>Password*</small>
          </label>
          <input name="password" type="password" />
        </div>
        <h6 className="required">*Required field</h6>
        <div>
          <button type="submit">{displayName}</button>
        </div>
        {error && error.response && <div> {error.response.data} </div>}
      </form>
      <div className="container">
        <a href="/auth/amazon" id="LoginWithAmazon">
          <img
            border="0"
            alt="Login with Amazon"
            src="https://images-na.ssl-images-amazon.com/images/G/01/lwa/btnLWA_gold_156x32.png"
            width="156"
            height="32"
          />
        </a>
      </div>
    </div>
  )
}

/**
 * CONTAINER
 *   Note that we have two different sets of 'mapStateToProps' functions -
 *   one for Login, and one for Signup. However, they share the same 'mapDispatchToProps'
 *   function, and share the same Component. This is a good example of how we
 *   can stay DRY with interfaces that are very similar to each other!
 */
const mapLogin = (state) => {
  return {
    name: 'login',
    displayName: 'Login',
    error: state.user.error,
  }
}

const mapSignup = (state) => {
  return {
    name: 'signup',
    displayName: 'Sign Up',
    error: state.user.error,
  }
}

const mapDispatch = (dispatch) => {
  return {
    handleSubmit(evt) {
      evt.preventDefault()
      const formName = evt.target.name
      const email = evt.target.email.value
      const password = evt.target.password.value
      if (!email || !password) {
        evt.preventDefault()
        alert('A required field is missing.')
        return
      }
      if (formName === 'signup') {
        const firstName = evt.target.firstName.value
        const lastName = evt.target.lastName.value
        if (!firstName || !lastName) {
          evt.preventDefault()
          alert('A required field is missing.')
          return
        }
        dispatch(authSignUp(firstName, lastName, email, password, formName))
      } else {
        dispatch(auth(email, password, formName))
      }
    },
  }
}

export const Login = connect(mapLogin, mapDispatch)(AuthForm)
export const Signup = connect(mapSignup, mapDispatch)(AuthForm)

/**
 * PROP TYPES
 */
AuthForm.propTypes = {
  name: PropTypes.string.isRequired,
  displayName: PropTypes.string.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  error: PropTypes.object,
}
