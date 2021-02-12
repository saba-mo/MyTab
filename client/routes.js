import React, {Component} from 'react'
import {connect} from 'react-redux'
import {withRouter, Route, Switch} from 'react-router-dom'
import PropTypes from 'prop-types'
import {
  Login,
  Signup,
  UserHome,
  AllFriends,
  Friend,
  AddFriendForm,
  SingleExpense,
} from './components'
import {me} from './store'
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  UserOutlined,
  VideoCameraOutlined,
  UploadOutlined,
} from '@ant-design/icons'
import Groups from './components/group/Groups'
import SingleGroups from './components/group/SingleGroups'
import {Layout, Menu, Col, Row} from 'antd'
const {Header, Sider, Content} = Layout
import history from './history'

/**
 * COMPONENT
 */
class Routes extends Component {
  state = {
    collapsed: false,
  }

  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    })
  }

  handleClick = (e) => {
    this.setState({current: e.key})
    history.push(e.key)
  }

  componentDidMount() {
    this.props.loadInitialData()
  }

  render() {
    const {isLoggedIn} = this.props

    return (
      <Switch>
        {/* Routes placed here are available to all visitors */}
        {!isLoggedIn && (
          <>
            <Route path="/login" component={Login} />
            <Route path="/signup" component={Signup} />
          </>
        )}
        {isLoggedIn && (
          <Layout>
            <Sider trigger={null} collapsible collapsed={this.state.collapsed}>
              <div className="logo" />
              <Menu
                theme="dark"
                mode="inline"
                onClick={this.handleClick}
                defaultSelectedKeys={[history.location.pathname]}
              >
                <Menu.Item key="/home" icon={<UserOutlined />}>
                  Profile
                </Menu.Item>
                <Menu.Item
                  key={`/groups/${this.props.userId}`}
                  icon={<VideoCameraOutlined />}
                >
                  Groups
                </Menu.Item>
                <Menu.Item key="/friends" icon={<UploadOutlined />}>
                  Friends
                </Menu.Item>
              </Menu>
            </Sider>
            <Layout className="site-layout">
              <Header className="site-layout-background" style={{padding: 0}}>
                {React.createElement(
                  this.state.collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
                  {
                    className: 'trigger',
                    onClick: this.toggle,
                  }
                )}
                {/* <Col span={20}> */}
                Welcome, Kat!
                {/* </Col> */}
              </Header>
              <Content
                className="site-layout-background"
                style={{
                  margin: '24px 16px',
                  padding: 24,
                  minHeight: 280,
                }}
              >
                <Switch>
                  {/* Routes placed here are only available after logging in */}
                  <Route path="/home" component={UserHome} />
                  <Route path="/friends" component={AllFriends} />
                  <Route path="/friend/add" component={AddFriendForm} />
                  <Route path="/friend/:friendId" component={Friend} />
                  <Route exact path="/groups/:userId" component={Groups} />
                  <Route
                    exact
                    path="/groups/singleGroup/:groupId"
                    component={SingleGroups}
                  />
                  <Route
                    exact
                    path="/groups/singleGroup/:groupId/expenses/:expenseId"
                    component={SingleExpense}
                  />
                </Switch>
              </Content>
            </Layout>
          </Layout>
        )}
        {/* Displays our Login component as a fallback */}
        <Route component={Login} />
      </Switch>
    )
  }
}

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    // Being 'logged in' for our purposes will be defined has having a state.user that has a truthy id.
    // Otherwise, state.user will be an empty object, and state.user.id will be falsey
    isLoggedIn: !!state.user.id,
    userId: state.user.id,
  }
}

const mapDispatch = (dispatch) => {
  return {
    loadInitialData() {
      dispatch(me())
    },
  }
}

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(connect(mapState, mapDispatch)(Routes))

/**
 * PROP TYPES
 */
Routes.propTypes = {
  loadInitialData: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired,
}
