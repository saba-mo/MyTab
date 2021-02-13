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
          <Card>
            <div>Total Balance on MyTab</div>
            <div>You are all settled up</div>
          </Card>
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
                  title="You are owed"
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
                  title="You owe"
                  value={currency(balanceBreakdown[2]).format()}
                  precision={2}
                  valueStyle={{color: 'orange'}}
                  prefix={<ArrowDownOutlined />}
                />
              </Card>
            </Col>
          </Row>
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
                  title="You are owed"
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
                  title="You owe"
                  value={currency(balanceBreakdown[2]).format()}
                  precision={2}
                  valueStyle={{color: 'orange'}}
                  prefix={<ArrowDownOutlined />}
                />
              </Card>
            </Col>
          </Row>
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
