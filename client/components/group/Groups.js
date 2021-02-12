import React from 'react'
import {connect} from 'react-redux'
import {_getGroups, _deleteGroup, _loadBalance} from '../../store'
import {Link} from 'react-router-dom'
import {TotalBalance, CreateGroupForm} from '../index'
import {List, Card} from 'antd'

// const data = [
//   {
//     title: 'Title 1',
//   },
//   {
//     title: 'Title 2',
//   },
//   {
//     title: 'Title 3',
//   },
//   {
//     title: 'Title 4',
//   },
//   {
//     title: 'Title 5',
//   },
//   {
//     title: 'Title 6',
//   },
// ];

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
      this.props.loadBalance(this.props.user.id)
    }
  }

  // <Row className="justify-content-md-center ">
  // {this.props.spotify.songsRecommended.map(track => {
  //   return (
  //     <Col
  //       xs="auto"
  //       sm="auto"
  //       md="auto"
  //       lg="auto"
  //       xl="auto"
  //       key={track.played_at}
  //       style={{padding: '15px'}}
  //     >
  //       <Card style={{width: '25rem'}}>
  //         <Card.Header className="titleOfTrack">
  //           {track.album.artists[0].name}
  //         </Card.Header>
  // <Row className="justify-content-md-center ">
  // {this.props.spotify.recentlyPlayed.items.map(item => {
  //   const date = new Date(item.played_at).toLocaleString('en-US')

  //   return (
  //     <Col
  //       xs="auto"
  //       sm="auto"
  //       md="auto"
  //       lg="auto"
  //       xl="auto"
  //       key={item.played_at}
  //       style={{padding: '15px'}}
  //     >
  //       <Card style={{width: '25rem'}}>
  //         <Card.Header>{item.track.artists[0].name}</Card.Header>
  //         <Card.Img

  render() {
    console.log('this.props.groups', this.props.groups)
    if (this.props.groups.length > 0) {
      return (
        <div>
          <List
            grid={{
              gutter: 16,
              xs: 1,
              sm: 2,
              md: 4,
              lg: 4,
              xl: 6,
              xxl: 3,
            }}
            dataSource={this.props.groups}
            renderItem={(group) => (
              <List.Item>
                <Card
                  title={group.title}
                  extra={
                    <Link to={`/groups/singleGroup/${group.id}`}>Open</Link>
                  }
                >
                  {[
                    <a
                      key="list-loadmore-more"
                      onClick={() => this.handleDeleteGroup(group.id)}
                    >
                      remove
                    </a>,
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
// if (this.props.groups.length > 0) {
//   return (
//     <div>
//       <TotalBalance />
//       <h4>See the groups you belong to, and create a new one.</h4>
//       <div className="editGroupPencil">
//         {this.state.showForm ? (
//           <CreateGroupForm toggleForm={this.toggleShowForm} />
//         ) : (
//           <img
//             className="groupImg"
//             src="/images/plus.png"
//             height="64px"
//             width="64px"
//             title="Add a group"
//             onClick={this.toggleShowForm}
//           />
//         )}
//       </div>
//       {this.props.groups.map((group) => {
//         return (
//           <div key={group.id}>
//             <Link to={`/groups/singleGroup/${group.id}`}>
//               <div>Group Name: {group.title}</div>
//             </Link>
//             <button
//               type="button"
//               onClick={() => this.handleDeleteGroup(group.id)}
//             >
//               X
//             </button>
//             {/* <img src={group.imageUrl} alt="Group Image" /> */}
//             {/* <Link to={`/groups/${group.id}`}>View Detail</Link> */}
//             {/* <button type="button" onClick={() => this.props.deleteGroup(group)}>X</button> */}
//           </div>
//         )
//       })}
//     </div>
//   )
// } else {
//   return (
//     <div>
//       <TotalBalance />
//       <h4>See the groups you belong to, and create a new one.</h4>
//       <p>No groups to show, want to add one?</p>
//       <CreateGroupForm toggleForm={this.toggleShowForm} />
//     </div>
//   )
// }

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
