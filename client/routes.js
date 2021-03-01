import React, {Component} from 'react'
import {connect} from 'react-redux'
import {withRouter, Route, Switch} from 'react-router-dom'
import PropTypes from 'prop-types'
import {
  Login,
  Signup,
  UserHome,
  AllFriends,
  AddFriendForm,
  SingleExpense,
  Groups,
  SingleGroups,
} from './components'
import {me} from './store'
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  UserOutlined,
  TeamOutlined,
  SmileOutlined,
} from '@ant-design/icons'
import {Layout, Menu} from 'antd'
const {Header, Sider, Content} = Layout
import history from './history'

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
            <Route exact path="/" component={Login} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/signup" component={Signup} />
          </>
        )}
        {isLoggedIn && (
          <Layout>
            <Sider
              trigger={null}
              collapsible
              collapsed={this.state.collapsed}
              breakpoint="sm"
              onBreakpoint={(broken) => {
                if (broken) this.toggle()
              }}
            >
              <div className="logo" />
              <Menu
                theme="dark"
                mode="inline"
                onClick={this.handleClick}
                defaultSelectedKeys={[history.location.pathname]}
              >
                <Menu.Item key="/home" icon={<UserOutlined />}>
                  Home
                </Menu.Item>
                <Menu.Item
                  key={`/groups/${this.props.user.id}`}
                  icon={<TeamOutlined />}
                >
                  Groups
                </Menu.Item>
                <Menu.Item key="/friends" icon={<SmileOutlined />}>
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
                Welcome, {this.props.user.firstName}!
              </Header>
              <Content
                className="site-layout-background"
                style={{
                  margin: '24px 16px',
                  padding: 24,
                  minHeight: 600,
                }}
              >
                <Switch>
                  <Route path="/home" component={UserHome} />
                  <Route path="/friends" component={AllFriends} />
                  <Route path="/friend/add" component={AddFriendForm} />
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

const mapState = (state) => {
  return {
    // Being 'logged in' for our purposes will be defined has having a state.user that has a truthy id.
    // Otherwise, state.user will be an empty object, and state.user.id will be falsey
    isLoggedIn: !!state.user.id,
    user: state.user,
  }
}

const mapDispatch = (dispatch) => {
  return {
    loadInitialData() {
      dispatch(me())
    },
  }
}

export default withRouter(connect(mapState, mapDispatch)(Routes))

Routes.propTypes = {
  loadInitialData: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired,
}
