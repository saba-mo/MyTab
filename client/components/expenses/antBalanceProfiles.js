import React from 'react'
import {Table, Button, Space} from 'antd'
import {Drawer, List, Avatar, Divider, Col, Row} from 'antd'
import AntBalanceTable from './antBalanceTable'

const DescriptionItem = ({title, content}) => (
  <div className="site-description-item-profile-wrapper">
    <p className="site-description-item-profile-p-label">{title}:</p>
    {content}
  </div>
)

class BalanceDemo extends React.Component {
  state = {visible: false, tableName: ''}

  showDrawer = (tableName) => {
    this.setState({
      visible: true,
      tableName: tableName,
    })
  }

  onClose = () => {
    this.setState({
      visible: false,
    })
  }

  render() {
    let filteredExpenses = []
    if (this.state.tableName === 'You lent') {
      filteredExpenses = this.props.expenses.filter(
        (expense) => expense.owedToUserId === this.props.user.id
      )
    } else if (this.state.tableName === 'You borrowed') {
      filteredExpenses = this.props.expenses.filter(
        (expense) => expense.owingUserId === this.props.user.id
      )
    } else if (this.state.tableName === 'Friends owe each other') {
      filteredExpenses = this.props.expenses.filter(
        (expense) =>
          ![expense.owingUserId, expense.owedToUserId].includes(
            this.props.user.id
          )
      )
    }

    return (
      <>
        <List
          dataSource={[
            {
              name: 'You lent',
              amount: this.props.totalOwedToUser,
            },
            {
              name: 'You borrowed',
              amount: this.props.totalUserOwes,
            },
            {
              name: 'Friends owe each other',
              amount: '',
            },
          ]}
          bordered
          renderItem={(item) => (
            <List.Item
              key={item.id}
              actions={[
                <a onClick={() => this.showDrawer(item.name)} key={item.id}>
                  View Details
                </a>,
              ]}
            >
              <List.Item.Meta
                avatar={
                  <Avatar src="https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png" />
                }
                title={item.name}
                description={item.amount}
              />
            </List.Item>
          )}
        />
        <Drawer
          width={640}
          placement="right"
          closable={false}
          onClose={this.onClose}
          visible={this.state.visible}
        >
          <AntBalanceTable
            expenses={filteredExpenses}
            settleThisPortion={this.props.settleThisPortion}
          />
        </Drawer>
      </>
    )
  }
}

export default BalanceDemo
