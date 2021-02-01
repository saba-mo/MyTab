import React from 'react'
import {connect} from 'react-redux'
// import { fetchRobots, removeRobot } from '../redux/robots';
import {Link} from 'react-router-dom'
// import RobotForm from './RobotForm'

export class Groups extends React.Component {
  componentDidMount() {
    this.props.getGroups()
  }

  render() {
    if (this.props.groups.length > 0) {
      return (
        <div>
          {/* <RobotForm /> */}
          {this.props.groups.map((group) => {
            return (
              <div key={group.id}>
                <div>Group Name: {group.name}</div>
                <img src={group.imageUrl} alt="Group Image" />
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
  }
}

const mapDispatch = (dispatch) => {
  return {
    getGroups: () => dispatch(_getGroups()),
    deleteGroup: (group) => dispatch(_deleteGroup(group)),
  }
}

export default connect(mapState, mapDispatch)(Groups)
