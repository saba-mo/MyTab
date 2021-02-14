import React from 'react'
import {connect} from 'react-redux'
import {_loadBalance} from '../../store'
import currency from 'currency.js'
import {Statistic, Card, Row, Col} from 'antd'
import {ArrowUpOutlined, ArrowDownOutlined} from '@ant-design/icons'

export class TotalBalance extends React.Component {
  componentDidMount() {
    this.props.loadBalance(this.props.user.id)
  }

  render() {
    const {balanceBreakdown} = this.props
    if (balanceBreakdown[0] === 0) {
      return (
        <div>
          <Row gutter={16}>
            <Col span={12}>
              <Card>
                <Statistic
                  title="Total Balance on MyTab"
                  value="You are all settled up!"
                  valueStyle={{color: '#000000'}}
                />
              </Card>
            </Col>
            {/* <Col span={12}>
            <img width="100%" src="images/creditPay.gif" />
          </Col> */}
          </Row>
        </div>
      )
    } else if (balanceBreakdown[0] > 0) {
      return (
        <div className="site-statistic-demo-card">
          <Row gutter={16}>
            <Col span={12}>
              <Card>
                <Statistic
                  title="Total Balance on MyTab"
                  value={currency(balanceBreakdown[0]).format()}
                  precision={2}
                  valueStyle={{color: '#000000'}}
                />
              </Card>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Card>
                <Statistic
                  title="You lent"
                  value={currency(balanceBreakdown[1]).format()}
                  precision={2}
                  valueStyle={{color: 'blue'}}
                  prefix={<ArrowUpOutlined />}
                />
              </Card>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Card>
                <Statistic
                  title="You borrowed"
                  value={currency(balanceBreakdown[2]).format()}
                  precision={2}
                  valueStyle={{color: 'orange'}}
                  prefix={<ArrowDownOutlined />}
                />
              </Card>
            </Col>
          </Row>
          {/* <Col span={12}>
            <img width="100%" src="images/creditPay.gif" />
          </Col> */}
        </div>
      )
    } else {
      return (
        <div className="site-statistic-demo-card">
          <Row gutter={16}>
            <Col span={12}>
              <Card>
                <Statistic
                  title="Total Balance on MyTab"
                  value={currency(balanceBreakdown[0]).format()}
                  precision={2}
                  valueStyle={{color: '#000000'}}
                />
              </Card>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Card>
                <Statistic
                  title="You lent"
                  value={currency(balanceBreakdown[1]).format()}
                  precision={2}
                  valueStyle={{color: 'blue'}}
                  prefix={<ArrowUpOutlined />}
                />
              </Card>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Card>
                <Statistic
                  title="You borrowed"
                  value={currency(balanceBreakdown[2]).format()}
                  precision={2}
                  valueStyle={{color: 'orange'}}
                  prefix={<ArrowDownOutlined />}
                />
              </Card>
            </Col>
          </Row>
          {/* <Col span={12} className="landingPageGif">
            <img width="100%" src="images/creditPay.gif" />
          </Col> */}
        </div>
      )
    }
  }
}

/**
 * CONTAINER
 */
const mapState = (state) => ({
  balanceBreakdown: state.balanceBreakdown,
  user: state.user,
})

const mapDispatch = (dispatch) => ({
  loadBalance: (userId) => dispatch(_loadBalance(userId)),
})

export default connect(mapState, mapDispatch)(TotalBalance)
