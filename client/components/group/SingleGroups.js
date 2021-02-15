import React from 'react'
import {connect} from 'react-redux'
import {_getSingleGroup, _updateGroup} from '../../store'
import {
  GroupMembers,
  GroupExpenses,
  UpdateGroupForm,
  GroupBalances,
} from '../../components'
import {EditOutlined} from '@ant-design/icons'
import {Button} from 'antd'

export class SingleGroup extends React.Component {
  constructor() {
    super()
    this.state = {tabName: 'expenses', showForm: false}

    this.tabChange = this.tabChange.bind(this)
    this.toggleShowForm = this.toggleShowForm.bind(this)
    this.renderTab = this.renderTab.bind(this)
  }

  toggleShowForm() {
    this.setState({showForm: !this.state.showForm})
  }

  tabChange(tabName) {
    this.setState({tabName})
  }

  renderTab() {
    switch (this.state.tabName) {
      case 'members':
        return <GroupMembers groupId={this.props.match.params.groupId} />
      case 'expenses':
        return <GroupExpenses groupId={this.props.match.params.groupId} />
      case 'balances':
        return <GroupBalances groupId={this.props.match.params.groupId} />
      default:
        return this.state
    }
  }

  componentDidMount() {
    this.props.getSingleGroup(this.props.match.params.groupId)
  }

  render() {
    const singleGroup = this.props.singleGroup || {}

    if (!singleGroup) return <div>LOADING</div>

    return (
      <div>
        <main>
          <div>
            <div className="editGroupPencil">
              <h2>{this.props.singleGroup.title}</h2>
              {this.state.showForm ? (
                <UpdateGroupForm toggleForm={this.toggleShowForm} />
              ) : (
                <Button
                  className="edit-button"
                  icon={<EditOutlined />}
                  onClick={this.toggleShowForm}
                  size="small"
                >
                  Edit Name
                </Button>
              )}
            </div>
            <div>
              <h5 className="tab_buttons_div">
                <a
                  className={`grp_tab_btns ${
                    this.state.tabName === 'expenses' ? 'selectedTab' : ''
                  }`}
                  onClick={this.tabChange.bind(this, 'expenses')}
                >
                  {' '}
                  Expenses &emsp;{' '}
                </a>
                <a
                  className={`grp_tab_btns ${
                    this.state.tabName === 'members' ? 'selectedTab' : ''
                  }`}
                  onClick={this.tabChange.bind(this, 'members')}
                >
                  {' '}
                  Members &emsp;{' '}
                </a>
                <a
                  className={`grp_tab_btns ${
                    this.state.tabName === 'balances' ? 'selectedTab' : ''
                  }`}
                  onClick={this.tabChange.bind(this, 'balances')}
                >
                  {' '}
                  Balances{' '}
                </a>
              </h5>
              {this.renderTab()}
            </div>
          </div>
        </main>
      </div>
    )
  }
}

const mapState = (state) => {
  return {
    singleGroup: state.singleGroup,
    groups: state.groups,
    user: state.user,
  }
}

const mapDispatch = (dispatch) => {
  return {
    getSingleGroup: (groupId) => dispatch(_getSingleGroup(groupId)),
    updateGroup: (groupId, group) => dispatch(_updateGroup(groupId, group)),
  }
}

export default connect(mapState, mapDispatch)(SingleGroup)
