import React from 'react'
import {connect} from 'react-redux'
import {_loadGroupMembers, _deleteGroupMember} from '../../store'
import {AddGroupMemberForm} from '../index'

export class GroupMembers extends React.Component {
  constructor() {
    super()
    this.state = {showForm: false}

    this.toggleShowForm = this.toggleShowForm.bind(this)
  }

  toggleShowForm() {
    this.setState({showForm: !this.state.showForm})
  }

  componentDidMount() {
    this.props.loadGroupMembers(this.props.groupId)
  }

  noMembers = (memberList) => {
    if (memberList.length < 1) {
      return 'Add members to this group here.'
    }
  }

  render() {
    const {groupMembers} = this.props
    console.log('GROUP MEMBERS: ', groupMembers)

    return (
      <div>
        {/* <CreateGroupExpenseForm groupId={this.props.groupId} /> */}
        {this.state.showForm ? (
          <AddGroupMemberForm
            toggleForm={this.toggleShowForm}
            groupId={this.props.groupId}
          />
        ) : (
          <img
            className="groupImg"
            src="/images/plus.png"
            height="64px"
            width="64px"
            onClick={this.toggleShowForm}
          />
        )}
        <div id="full-member-list">
          {this.noMembers(groupMembers)}
          <ul>
            {groupMembers.map((member) => {
              return (
                <div key={`member-${member.id}`}>
                  {member.firstName} {member.lastName}
                  <button
                    type="button"
                    onClick={() =>
                      this.props.deleteGroupMember(
                        this.props.groupId,
                        member.id
                      )
                    }
                  >
                    X
                  </button>
                </div>
              )
            })}
          </ul>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    groupMembers: state.groupMembers,
    user: state.user,
  }
}

const mapDispatchToProps = (dispatch) => ({
  loadGroupMembers: (groupId) => dispatch(_loadGroupMembers(groupId)),
  deleteGroupMember: (groupId, memberId) =>
    dispatch(_deleteGroupMember(groupId, memberId)),
})

export default connect(mapStateToProps, mapDispatchToProps)(GroupMembers)
