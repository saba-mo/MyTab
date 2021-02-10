import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {logout} from '../../store'
import {Layout, PageHeader, Content, Tabs} from 'antd'

const {TabPane} = Tabs
import {withRouter} from 'react-router'

class Navbar extends React.Component {
  constructor() {
    super()

    this.clickTab = this.clickTab.bind(this)
  }

  clickTab(href) {
    console.log(href)
    if (href === '#') {
      this.props.handleClick()
    } else {
      this.props.history.push(href)
    }
  }

  render() {
    return (
      <PageHeader
        className="site-page-header-responsive"
        title="MyTab"
        subTitle="Track shared expenses worry free with MyTab"
        footer={
          <Tabs defaultActiveKey="1" onChange={this.clickTab}>
            {this.props.isLoggedIn ? (
              <>
                <TabPane tab="Home" key="/home" />
                <TabPane tab="Logout" key="#" />
              </>
            ) : (
              <>
                <TabPane tab="Log In" key="/login" />
                <TabPane tab="Sign Up" key="/signup" />
              </>
            )}
          </Tabs>
        }
      />
    )
  }
}

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    isLoggedIn: !!state.user.id,
  }
}

const mapDispatch = (dispatch) => {
  return {
    handleClick() {
      dispatch(logout())
    },
  }
}

export default withRouter(connect(mapState, mapDispatch)(Navbar))

/**
 * PROP TYPES
 */
Navbar.propTypes = {
  handleClick: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired,
}
