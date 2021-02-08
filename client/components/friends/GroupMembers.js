import React from 'react'
import {connect} from 'react-redux'
import {_loadGroupMembers, _deleteGroupMember} from '../../store'
import {AddGroupMemberForm} from '../index'

export class GroupMembers extends React.Component {
  constructor() {
    super()
    this.state = {showForm: false, numberOfMembers: 0}

    this.toggleShowForm = this.toggleShowForm.bind(this)
    this.attemptToRemoveMember = this.attemptToRemoveMember.bind(this)
  }

  toggleShowForm() {
    this.setState({showForm: !this.state.showForm})
  }

  componentDidMount() {
    this.props.loadGroupMembers(this.props.groupId)
  }

  attemptToRemoveMember(groupId, memberId, lengthOfMembersArray) {
    // console.log('length arg: ', lengthOfMembersArray)
    this.setState({numberOfMembers: lengthOfMembersArray})
    // state does not change from 0 the first time you try to delete someone, but does when you try to delete someone else
    // console.log('length on state: ', this.state.numberOfMembers)
    this.props.deleteGroupMember(groupId, memberId)
    // console.log('gm length after delete: ', this.props.groupMembers.length)
    if (this.props.groupMembers.length === this.state.numberOfMembers) {
      alert('You cannot remove a member with a balance in the group.')
    }
  }

  noMembers = (memberList) => {
    if (memberList.length < 1) {
      return 'Add members to this group here.'
    }
  }

  render() {
    const {groupMembers} = this.props
    const lengthOfMembersArray = groupMembers.length

    return (
      <div>
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
                      this.attemptToRemoveMember(
                        this.props.groupId,
                        member.id,
                        lengthOfMembersArray
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
