import React from 'react'
import {connect} from 'react-redux'
import {_getGroups, _deleteGroup} from '../../store'
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
    this.props.getGroups(this.props.user.id)
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

  handleDeleteGroup(userId, groupId) {
    if (
      window.confirm(
        'Are you sure? You will be deleting the group and expenses for all members.'
      )
    ) {
      this.props.deleteGroup(userId, groupId)
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
              md: 2,
              lg: 3,
              xl: 3,
              xxl: 3,
            }}
            dataSource={this.props.groups}
            renderItem={(group) => (
              <List.Item>
                <Card title={group.title}>
                  <Link to={`/groups/${group.id}`}>Open</Link>
                  <Col span={1} />
                  {[
                    <Link
                      key="list-loadmore-more"
                      onClick={() =>
                        this.handleDeleteGroup(this.props.user.id, group.id)
                      }
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

const mapState = (state) => {
  return {
    groups: state.groups,
    user: state.user,
  }
}

const mapDispatch = (dispatch) => {
  return {
    getGroups: (userId) => dispatch(_getGroups(userId)),
    deleteGroup: (userId, groupId) => dispatch(_deleteGroup(userId, groupId)),
  }
}

export default connect(mapState, mapDispatch)(Groups)
