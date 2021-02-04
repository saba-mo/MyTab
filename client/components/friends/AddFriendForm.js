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

  async handleSubmit(event) {
    event.preventDefault()
    try {
      await this.props.addFriend(this.props.user.id, this.state.email)
      this.setState({email: ''})
    } catch (error) {
      console.log('Hmm, having a hard time with this.', error)
    }
  }

  render() {
    const {email} = this.state
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <div>
            <label htmlFor="email">
              <small>
                Add your friends here by entering their email address
              </small>
            </label>
            <input
              name="email"
              type="email"
              value={email}
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
