import React from 'react'
import {connect} from 'react-redux'
import {_addFriend} from '../../store/'

const defaultState = {
  email: '',
}

class AddFriend extends React.Component {
  constructor() {
    super()
    this.state = defaultState
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange(event) {
    this.setState({[event.target.name]: event.target.value})
  }
  handleSubmit(event) {
    event.preventDefault()
    try {
      this.props.addFriend(this.props.user.id, this.state.email)
      //need to add a failure or success message here
      this.setState(defaultState)
    } catch (error) {
      console.log('Hmm, having a hard time with this.', error)
    }
  }

  render() {
    const {email} = this.state
    /*
    *
    delete this console.log once complete
    *
    */
    console.log('state in add', this.state)
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <div>
            <label htmlFor="email">
              <small>What is your friend's email address?</small>
            </label>
            <input
              name="email"
              type="text"
              value={email}
              onChange={this.handleChange}
            />
          </div>
          <div>
            <button type="submit">Add Friend</button>
          </div>
        </form>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
  }
}

const mapDispatchToProps = (dispatch) => ({
  addFriend: (userId, email) => dispatch(_addFriend(userId, email)),
})

export default connect(mapStateToProps, mapDispatchToProps)(AddFriend)
