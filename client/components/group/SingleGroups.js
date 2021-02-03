import React from 'react'
import {connect} from 'react-redux'
import {_getSingleGroup} from '../../store/groups/singleGroup'

export class SingleGroup extends React.Component {
  componentDidMount() {
    this.props.getSingleGroup(this.props.match.params.groupId)
  }
  render() {
    const singleGroup = this.props.singleGroup || {}

    if (!singleGroup) return <div>LOADING</div>

    return (
      <div>
        {/* <Navigation pageName = "Single Robots" /> */}
        <main>
          <div>
            {this.props.singleGroup.title}
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
  }
}

const mapDispatch = (dispatch) => {
  return {
    getSingleGroup: (groupId) => dispatch(_getSingleGroup(groupId)),
  }
}

export default connect(mapState, mapDispatch)(SingleGroup)
