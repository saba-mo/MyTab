import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {TotalBalance} from '../index'
import {Layout, Menu, Col, Row} from 'antd'
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  UserOutlined,
  VideoCameraOutlined,
  UploadOutlined,
} from '@ant-design/icons'

const {Header, Sider, Content} = Layout
// const {firstName} = props
// const {userId} = props

class UserHome extends React.Component {
  state = {
    collapsed: false,
  }

  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    })
  }

  render() {
    return (
      <Layout>
        <Sider trigger={null} collapsible collapsed={this.state.collapsed}>
          <div className="logo" />
          <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
            <Menu.Item key="1" icon={<UserOutlined />}>
              Profile
            </Menu.Item>
            <Menu.Item key="2" icon={<VideoCameraOutlined />}>
              Groups
            </Menu.Item>
            <Menu.Item key="3" icon={<UploadOutlined />}>
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
            Content
          </Content>
        </Layout>
      </Layout>
      //   <div>
      //   <h3>Welcome, {firstName}!</h3>
      //   <TotalBalance />
      //   <div className="wrapper">
      //     <Link to={`/groups/${userId}`}>
      //       <img
      //         className="groupImg"
      //         src="images/groupImage.png"
      //         // title is the text that appears when you hover over the image
      //         title="Groups"
      //         alt="Second slide"
      //         height="400px"
      //       />
      //     </Link>
      //     {/* <a to={`/groups/${userId}`}>
      //       <img src="images/groupImage.png" />
      //         </a> */}
      //     {/* <Groups /> */}
      //   </div>
      //   <div className="wrapper">
      //     <Link src="images/friendsImage.png" to="/friends">
      //       <img
      //         className="groupImg"
      //         src="images/friendsImage.png"
      //         // title is the text that appears when you hover over the image
      //         title="Friends"
      //         alt="Second slide"
      //         height="400px"
      //         width="407.406px"
      //       />
      //     </Link>
      //   </div>
      // </div>
    )
  }
}

const mapState = (state) => {
  return {
    firstName: state.user.firstName,
    userId: state.user.id,
  }
}

export default connect(mapState)(UserHome)

/**
 * PROP TYPES
 */
UserHome.propTypes = {
  firstName: PropTypes.string,
}
