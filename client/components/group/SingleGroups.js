import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {_getSingleGroup, _updateGroup} from '../../store/groups/singleGroup'
import GroupExpenses from '../expenses/GroupExpenses'
import GroupBalances from '../expenses/GroupBalances'
import UpdateGroupForm from './UpdateGroupForm'
import {GroupMembers} from '../../components'

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
          <div className="pages-view-navbar">
            <Link to={`/groups/${this.props.user.id}`}>
              <h3>Back to All Groups </h3>
            </Link>
          </div>
          <div>
            <div className="editGroupPencil">
              <h3>{this.props.singleGroup.title}</h3>
              {this.state.showForm ? (
                <UpdateGroupForm toggleForm={this.toggleShowForm} />
              ) : (
                <img
                  className="groupImg"
                  src="/images/pencil.png"
                  // height="400px"
                  // width="407.406px"
                  onClick={this.toggleShowForm}
                />
              )}
            </div>
            <div>
              <div className="tab_buttons_div">
                <a
                  className={`grp_tab_btns ${
                    this.state.tabName === 'expenses' ? 'selectedTab' : ''
                  }`}
                  onClick={this.tabChange.bind(this, 'expenses')}
                >
                  {' '}
                  Expenses |{' '}
                </a>
                <a
                  className={`grp_tab_btns ${
                    this.state.tabName === 'members' ? 'selectedTab' : ''
                  }`}
                  onClick={this.tabChange.bind(this, 'members')}
                >
                  {' '}
                  Members |{' '}
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
              </div>
              {this.renderTab()}
            </div>
            {/* <img className = "main-image" src={robot.imageUrl} />
            <p> name: {robot.name}</p>
            <p> fuelType: {robot.fuelType}</p>
            <p> fuelLevel: {robot.fuelLevel}</p>
            <h1>ROBOT Edit Form</h1>
            <Form robot = {this.state.robotForm} errorMessage={this.state.errorMessage} handleChange={this.handleChange} handleSubmit={this.handleSubmit} />
            <p> projects: </p>
              {robot.projects.length === 0
                ?
                  <div>There are no projects currently assigned to this robot!</div>
                :
                  robot.projects.map((project) => {
                    return (<p key = {project.id}> <Link to={`/projects/${project.id}`}>{project.title}</Link>
                     <button type="button" onClick= {() => this.props.clickUnassignProject(robot.id, project.id)} >Unassign</button>
                            </p>)
                  })
              } */}
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
