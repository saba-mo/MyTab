import React from 'react'
import {connect} from 'react-redux'
import {_loadGroupMembers} from '../../store'
// import {AddMemberForm} from '../index'

export class GroupMembers extends React.Component {
  constructor() {
    super()
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

    return (
      <div>
        {/* <CreateGroupExpenseForm groupId={this.props.groupId} /> */}
        <div id="full-member-list">
          {this.noMembers(groupMembers)}
          <ul>
            {groupMembers.map((member) => {
              return (
                <div key={`member-${member.id}`}>
                  {member.firstName} {member.lastName}
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
})

export default connect(mapStateToProps, mapDispatchToProps)(GroupMembers)
