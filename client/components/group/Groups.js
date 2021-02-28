import React from 'react'
import {connect} from 'react-redux'
import {_getGroups, _deleteGroup, _loadBalance} from '../../store'
import {Link} from 'react-router-dom'
import {TotalBalance, CreateGroupForm} from '../index'
import {List, Card, Col, notification} from 'antd'

export class Groups extends React.Component {
  constructor() {
    super()
    this.state = {showForm: false}

    this.toggleShowForm = this.toggleShowForm.bind(this)
    this.handleDeleteGroup = this.handleDeleteGroup.bind(this)
    this.openSuccessNotification = this.openSuccessNotification.bind(this)
  }

  componentDidMount() {
    this.props.getGroups(this.props.match.params.userId)
    // check if user is trying to access someone else's groups list
    if (this.props.user.id !== Number(this.props.match.params.userId)) {
      window.location = '/home'
    }
  }

  openSuccessNotification = (type) => {
    notification[type]({
      message: 'Group Deleted',
      description: 'The group no longer exists.',
      placement: 'bottomRight',
    })
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
      this.props.loadBalance(this.props.user.id)
      this.openSuccessNotification('success')
    }
  }

  render() {
    if (this.props.groups.length > 0) {
      return (
        <div>
          <List
            grid={{
              gutter: 16,
              xs: 1,
              sm: 2,
              md: 3,
              lg: 3,
              xl: 3,
              xxl: 3,
            }}
            dataSource={this.props.groups}
            renderItem={(group) => (
              <List.Item>
                <Card title={group.title}>
                  <Link to={`/groups/singleGroup/${group.id}`}>Open</Link>
                  <Col span={1} />
                  {[
                    <Link
                      key="list-loadmore-more"
                      onClick={() => this.handleDeleteGroup(group.id)}
                    >
                      Delete
                    </Link>,
                  ]}
                </Card>
              </List.Item>
            )}
          />
          <CreateGroupForm toggleForm={this.toggleShowForm} />
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

/*
*
Code below is code prior to adding Ant Design
*
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
            <img src={group.imageUrl} alt="Group Image" />
            <Link to={`/groups/${group.id}`}>View Detail</Link>
            <button type="button" onClick={() => this.props.deleteGroup(group)}>X</button>
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
*/

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
    loadBalance: (userId) => dispatch(_loadBalance(userId)),
  }
}

export default connect(mapState, mapDispatch)(Groups)
