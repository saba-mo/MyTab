import React from 'react'
import {Table, Button, Space} from 'antd'

const data = [
  {
    key: '1',
    name: 'John Brown',
    age: 32,
    address: 'New York No. 1 Lake Park',
  },
  {
    key: '2',
    name: 'Jim Green',
    age: 42,
    address: 'London No. 1 Lake Park',
  },
  {
    key: '3',
    name: 'Joe Black',
    age: 32,
    address: 'Sidney No. 1 Lake Park',
  },
  {
    key: '4',
    name: 'Jim Red',
    age: 32,
    address: 'London No. 2 Lake Park',
  },
]

class AntBalanceTable extends React.Component {
  state = {
    filteredInfo: null,
    sortedInfo: null,
  }

  handleChange = (pagination, filters, sorter) => {
    console.log('Various parameters', pagination, filters, sorter)
    this.setState({
      filteredInfo: filters,
      sortedInfo: sorter,
    })
  }

  clearFilters = () => {
    this.setState({filteredInfo: null})
  }

  clearAll = () => {
    this.setState({
      filteredInfo: null,
      sortedInfo: null,
    })
  }

  setAmountSort = () => {
    this.setState({
      sortedInfo: {
        order: 'descend',
        columnKey: 'amount',
      },
    })
  }

  render() {
    let {sortedInfo, filteredInfo} = this.state
    sortedInfo = sortedInfo || {}
    filteredInfo = filteredInfo || {}
    const columns = [
      {
        title: 'Owed to user',
        dataIndex: 'owedToUser',
        key: 'owedToUser',
        ellipsis: true,
      },
      {
        title: 'Owing user',
        dataIndex: 'owingUser',
        key: 'owingUser',
        sorter: (a, b) => a.owingUser - b.owingUser,
        sortOrder: sortedInfo.columnKey === 'owingUser' && sortedInfo.order,
        ellipsis: true,
      },
      {
        title: 'Amount',
        dataIndex: 'amount',
        key: 'amount',
        sorter: (a, b) => a - b,
        sortOrder: sortedInfo.columnKey === 'amount' && sortedInfo.order,
        ellipsis: true,
      },
      {
        title: 'Expense Name',
        dataIndex: 'expenseName',
        key: 'expenseName',
        sorter: (a, b) => a.expenseName - b.expenseName,
        sortOrder: sortedInfo.columnKey === 'expenseName' && sortedInfo.order,
        ellipsis: true,
      },
      {
        title: 'Settle',
        key: 'item',
        render: (record) => (
          <button
            type="submit"
            onClick={() => {
              this.props.settleThisPortion(record.item)
            }}
          >
            Settle
          </button>
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
