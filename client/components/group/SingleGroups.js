import React from 'react'
import {connect} from 'react-redux'
import {_getSingleGroup, _updateGroup} from '../../store/groups/singleGroup'
import GroupExpenses from '../expenses/GroupExpenses'
import UpdateGroupForm from './UpdateGroupForm'
import {GroupMembers} from '../../components'

export class SingleGroup extends React.Component {
  constructor() {
    super()
    this.state = {tabName: 'expenses'}

    this.tabChange = this.tabChange.bind(this)
    this.renderTab = this.renderTab.bind(this)
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
      // case 'balances':
      //   return <GroupBalances />
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
        <UpdateGroupForm />
        {/* <Navigation pageName = "Single Robots" /> */}
        <main>
          <div>
            <h3>{this.props.singleGroup.title}</h3>
            <div>
              <div className="tab_buttons_div">
                <a
                  className="grp_tab_btns"
                  onClick={this.tabChange.bind(this, 'members')}
                >
                  {' '}
                  Members |{' '}
                </a>
                <a
                  className="grp_tab_btns"
                  onClick={this.tabChange.bind(this, 'expenses')}
                >
                  {' '}
                  Expenses |{' '}
                </a>
                <a
                  className="grp_tab_btns"
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
  }
}

const mapDispatch = (dispatch) => {
  return {
    getSingleGroup: (groupId) => dispatch(_getSingleGroup(groupId)),
    updateGroup: (groupId, group) => dispatch(_updateGroup(groupId, group)),
  }
}

export default connect(mapState, mapDispatch)(SingleGroup)
