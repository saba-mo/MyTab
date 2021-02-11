import React from 'react'
import {connect} from 'react-redux'
import {_addFriend} from '../../store'

class AddFriendForm extends React.Component {
  constructor() {
    super()
    this.state = {email: ''}
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange(event) {
    this.setState({[event.target.name]: event.target.value})
  }

  handleSubmit(event) {
    event.preventDefault()
    this.props.toggleForm()
    try {
      this.props.addFriend(this.props.user.id, this.state.email)
      this.setState({email: ''})
    } catch (error) {
      console.error(
        'Hmm, having a hard time adding this friend, here are more details: ',
        error
      )
    }
  }

  render() {
    const {email} = this.state
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <div>
            <label htmlFor="email">
              <div>Add your friends here by entering their email address.</div>
              <small>Friends must first create an account with MyTab.</small>
            </label>
            <input
              name="email"
              type="email"
              value={email}
              placeholder="Ex: hello@world.com"
              onChange={this.handleChange}
            />
          </div>
          <div>
            <button type="submit">Add My Friend</button>
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

export default connect(mapStateToProps, mapDispatchToProps)(AddFriendForm)
