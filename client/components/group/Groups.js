import React from 'react'
import {connect} from 'react-redux'
import {_getGroups} from '../../store/groups'
import {Link} from 'react-router-dom'

export class Groups extends React.Component {
  componentDidMount() {
    this.props.getGroups(this.props.user.id)
  }

  render() {
    if (this.props.groups.length > 0) {
      return (
        <div>
          {/* <RobotForm /> */}
          {this.props.groups.map((group) => {
            return (
              <div key={group.id}>
                <div>Group Name: {group.title}</div>
                {/* <img src={group.imageUrl} alt="Group Image" /> */}
                {/* <Link to={`/groups/${group.id}`}>View Detail</Link> */}
                {/* <button type="button" onClick={() => this.props.deleteGroup(group)}>X</button> */}
              </div>
            )
          })}
        </div>
      )
    } else {
      return (
        <div>
          <p>No groups, want to add one?</p>
          {/* <RobotForm /> */}
        </div>
      )
    }
  }
}

const mapState = (state) => {
  return {
    groups: state.groups,
    user: state.user,
  }
}

const mapDispatch = (dispatch) => {
  return {
    getGroups: (userId) => dispatch(_getGroups(userId)),
    // deleteGroup: (group) => dispatch(_deleteGroup(group)),
  }
}

export default connect(mapState, mapDispatch)(Groups)
