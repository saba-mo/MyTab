import React from 'react'
import {Table, Button, Space} from 'antd'
import {Drawer, List, Avatar, Divider, Col, Row} from 'antd'
import Demo from './antBalanceTable'

const DescriptionItem = ({title, content}) => (
  <div className="site-description-item-profile-wrapper">
    <p className="site-description-item-profile-p-label">{title}:</p>
    {content}
  </div>
)

class BalanceDemo extends React.Component {
  state = {visible: false}

  showDrawer = () => {
    this.setState({
      visible: true,
    })
  }

  onClose = () => {
    this.setState({
      visible: false,
    })
  }

  render() {
    return (
      <>
        <List
          dataSource={[
            {
              name: 'Owed to you',
            },
            {
              name: 'What you owe',
            },
            {
              name: 'Friends owe eachother',
            },
          ]}
          bordered
          renderItem={(item) => (
            <List.Item
              key={item.id}
              actions={[
                <a onClick={this.showDrawer} key={`a-${item.id}`}>
                  View Details
                </a>,
              ]}
            >
              <List.Item.Meta
                avatar={
                  <Avatar src="https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png" />
                }
                title={<a href="https://ant.design/index-cn">{item.name}</a>}
                description="$100.88"
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
          <Demo />
        </Drawer>
      </>
    )
  }
}

export default BalanceDemo
