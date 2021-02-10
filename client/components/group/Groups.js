import React from 'react'
import {connect} from 'react-redux'
import {_getGroups, _deleteGroup} from '../../store'
import {Link} from 'react-router-dom'
import {TotalBalance, CreateGroupForm} from '../index'

export class Groups extends React.Component {
  constructor() {
    super()
    this.state = {showForm: false}

    this.toggleShowForm = this.toggleShowForm.bind(this)
    this.handleDeleteGroup = this.handleDeleteGroup.bind(this)
  }

  componentDidMount() {
    this.props.getGroups(this.props.user.id)
  }

  toggleShowForm() {
    this.setState({showForm: !this.state.showForm})
  }

  handleDeleteGroup(groupId) {
    if (
      window.confirm(
        'Are you sure? You will be deleting the group and expenses for all members.'
      )
    ) {
      this.props.deleteGroup(groupId)
    }
  }

  render() {
    if (this.props.groups.length > 0) {
      return (
        <div>
          <TotalBalance />
          <h4>See the groups you belong to, and create a new one.</h4>
          <div className="editGroupPencil">
            {this.state.showForm ? (
              <CreateGroupForm toggleForm={this.toggleShowForm} />
            ) : (
              <img
                className="groupImg"
                src="/images/plus.png"
                height="64px"
                width="64px"
                title="Add a group"
                onClick={this.toggleShowForm}
              />
            )}
          </div>
          {this.props.groups.map((group) => {
            return (
              <div key={group.id}>
                <Link to={`/groups/singleGroup/${group.id}`}>
                  <div>Group Name: {group.title}</div>
                </Link>
                <button
                  type="button"
                  onClick={() => this.handleDeleteGroup(group.id)}
                >
                  X
                </button>
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
          <TotalBalance />
          <h4>See the groups you belong to, and create a new one.</h4>
          <p>No groups to show, want to add one?</p>
          <CreateGroupForm toggleForm={this.toggleShowForm} />
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
    deleteGroup: (groupId) => dispatch(_deleteGroup(groupId)),
  }
}

export default connect(mapState, mapDispatch)(Groups)
