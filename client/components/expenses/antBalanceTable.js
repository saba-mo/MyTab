import React from 'react'
import {Table, notification, Button, Space} from 'antd'

class AntBalanceTable extends React.Component {
  settle(item) {
    this.props.settleThisPortion(item)
    this.openSuccessNotification('success')
  }

  openSuccessNotification = (type) => {
    notification[type]({
      message: 'Settled!',
      description: 'The charge is all settled up.',
      placement: 'bottomRight',
    })
  }

  render() {
    const columns = [
      {
        title: 'Paid by',
        dataIndex: 'owedToUser',
        key: 'owedToUser',
        ellipsis: true,
      },
      {
        title: 'Owing user',
        dataIndex: 'owingUser',
        key: 'owingUser',
      },
      {
        title: 'Amount',
        dataIndex: 'amount',
        key: 'amount',
      },
      {
        title: 'Expense Name',
        dataIndex: 'expenseName',
        key: 'expenseName',
      },
      {
        title: 'Settle',
        key: 'item',
        render: (record) =>
          record.item.settled === false ? (
            <button
              type="submit"
              onClick={() => {
                this.settle(record.item)
              }}
            >
              Settle
            </button>
          ) : (
            <div>settled</div>
          ),
      },
    ]
    return (
      <Table
        columns={columns}
        dataSource={this.props.expenses}
        onChange={this.handleChange}
      />
    )
  }
}

export default AntBalanceTable
