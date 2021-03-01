import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {logout} from '../../store'
import {PageHeader, Tabs} from 'antd'
import {withRouter} from 'react-router'

const {TabPane} = Tabs

class Navbar extends React.Component {
  constructor() {
    super()

    this.clickTab = this.clickTab.bind(this)
  }

  clickTab(href) {
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
        subTitle="Track shared expenses worry free"
        footer={
          <Tabs defaultActiveKey="1" onChange={this.clickTab}>
            {this.props.isLoggedIn ? (
              <>
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

Navbar.propTypes = {
  handleClick: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired,
}
