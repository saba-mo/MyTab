import React from 'react'
import {Table, Button, Space} from 'antd'

class AntBalanceTable extends React.Component {
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
                this.props.settleThisPortion(record.item)
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
