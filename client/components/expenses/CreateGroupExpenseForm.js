import React from 'react'
import {connect} from 'react-redux'
import {_addGroupExpense, _loadGroupMembers} from '../../store'
import currency from 'currency.js'
import {Form, Input, Button, Select} from 'antd'

const {Option} = Select
const layout = {
  labelCol: {
    // changed from 8 to 0 so it wouldn't cut off "name owes" part
    span: 0,
  },
  wrapperCol: {
    span: 16,
  },
}
const tailLayout = {
  wrapperCol: {
    offset: 8,
    span: 16,
  },
}

export class CreateGroupExpenseForm extends React.Component {
  constructor(props) {
    super()
    this.state = {
      name: '',
      totalCost: '',
      paidBy: props.user.id,
      owedByMember: {},
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleAmountOwedChange = this.handleAmountOwedChange.bind(this)
  }

  componentDidMount() {
    this.props.loadGroupMembers(this.props.groupId)
  }

  handleChange(event) {
    let value
    if (event.target.name === 'name') {
      value = event.target.value
    } else {
      // totalCost and owedId should be numbers
      value = Number(event.target.value)
    }
    if (event.target.name === 'paidBy') {
      let owedByMember = this.state.owedByMember
      let memberId = Number(event.target.value)
      delete owedByMember[memberId]
      this.setState({owedByMember})
    }
    this.setState({
      [event.target.name]: value,
    })
    console.log('state? ', this.state)
  }

  handleAmountOwedChange(memberId, amount) {
    let owedByMember = this.state.owedByMember
    owedByMember[memberId] = amount
    this.setState({owedByMember})
  }

  handleSubmit(event) {
    try {
      if (
        !this.state.name ||
        !this.state.totalCost ||
        !this.state.paidBy ||
        this.state.paidBy === 'select'
      ) {
        event.preventDefault()
        alert('A required field is missing.')
        return
      }
      if (!Number(this.state.totalCost)) {
        event.preventDefault()
        alert('Cost must be a number.')
        return
      }
      event.preventDefault()
      this.props.toggleForm()
      this.props.addGroupExpense(this.props.groupId, {
        name: this.state.name,
        totalCost: currency(this.state.totalCost).value,
        paidBy: this.state.paidBy,
        owedByMember: this.state.owedByMember,
      })
    } catch (error) {
      console.error(
        'Failed to handle expense submission due to this error: ',
        error
      )
    }
  }

  formRef = React.createRef()
  onFinish = (values) => {
    console.log(values)
  }
  onReset = () => {
    this.formRef.current.resetFields()
  }

  render() {
    let totalOwed
    if (Object.values(this.state.owedByMember).length === 0) {
      totalOwed = 0
    } else {
      totalOwed = Object.values(this.state.owedByMember).reduce(
        (sum, val) => sum + val
      )
    }

    let remainder = this.state.totalCost

    const paidBy = this.props.groupMembers.filter(
      (member) => member.id == this.state.paidBy
    )
    let paidByName
    if (paidBy[0].id === this.props.user.id) {
      paidByName = 'Your'
    } else {
      paidByName = paidBy[0].firstName + ' ' + paidBy[0].lastName + "'s"
    }

    return (
      <Form
        {...layout}
        ref={this.formRef}
        name="control-ref"
        colon={false}
        // onFinish={this.onFinish}
        onFinish={this.handleSubmit}
      >
        <Form.Item
          name="name"
          label="Expense Name"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input
            value={this.state.name}
            type="text"
            onValuesChange={this.handleChange}
            // onChange={this.handleChange}
            // onValuesChange={(event) => this.handleChange(event.target.value)}
            placeholder="Ex: Quarantine Brunch"
          />
        </Form.Item>

        <Form.Item
          // where does className='forme-state' go?
          name="totalCost"
          label="Cost $"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input
            placeholder="Ex: 100 or 9.39"
            onChange={this.handleChange}
            value={this.state.totalCost === 0 ? '' : this.state.totalCost}
            min={0}
            type="number"
            step="0.01"
          />
        </Form.Item>

        <Form.Item
          name="paidBy"
          label="Paid By"
          initialValue={this.state.paidBy}
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Select onChange={this.handleChange} allowClear>
            <Option value="member">select</Option>
            {this.props.groupMembers.map((member) => (
              <Option key={`member-${member.id}`} value={member.id}>
                {member.firstName} {member.lastName}
              </Option>
            ))}
          </Select>
        </Form.Item>

        {this.props.groupMembers.map((member) => (
          <div className="container" key={member.id}>
            <Form.Item
              name="owedBy"
              label={`${member.firstName} ${member.lastName} owes $`}
            >
              <Input
                // is value doing what it should?
                value={
                  this.state.owedByMember[member.id] === undefined
                    ? ''
                    : this.state.owedByMember[member.id] === 0
                    ? ''
                    : this.state.owedByMember[member.id]
                }
                disabled={member.id == this.state.paidBy}
                placeholder={member.id == this.state.paidBy ? 'Paid' : '$'}
                min={0}
                type="number"
                step="0.01"
                onChange={(event) =>
                  this.handleAmountOwedChange(
                    member.id,
                    Number(event.target.value)
                  )
                }
              />
            </Form.Item>
          </div>
        ))}

        <Form.Item>
          <div>Total Cost: {currency(this.state.totalCost).format()}</div>
          <div>Total Owed: {currency(totalOwed).format()}</div>
          <div>
            {remainder - totalOwed &&
            remainder - totalOwed != this.state.totalCost ? (
              <div className="error">
                {paidByName} share: {currency(remainder - totalOwed).format()}
              </div>
            ) : (
              ''
            )}
          </div>
          <div>
            {totalOwed > this.state.totalCost && (
              <div className="error">
                Total Cost cannot be greater than Total Owed
              </div>
            )}
            {totalOwed === 0 && (
              <div className="error">Total Owed must be greater than 0</div>
            )}
          </div>
        </Form.Item>

        {/* what is this?  */}
        <Form.Item
          noStyle
          shouldUpdate={(prevValues, currentValues) =>
            prevValues.gender !== currentValues.gender
          }
        >
          {/* what is this? */}
          {({getFieldValue}) => {
            return getFieldValue('gender') === 'other' ? (
              <Form.Item
                name="customizeGender"
                label="Customize Gender"
                rules={[
                  {
                    required: true,
                  },
                ]}
              >
                <Input />
              </Form.Item>
            ) : null
          }}
        </Form.Item>

        <Form.Item {...tailLayout}>
          <Button
            type="primary"
            htmlType="submit"
            // comment this in when done
            // disabled={totalOwed === 0 || totalOwed > this.state.totalCost}
          >
            Create Expense
          </Button>
          <Button htmlType="button" onClick={this.onReset}>
            Reset
          </Button>
        </Form.Item>
      </Form>
    )
  }
}

const mapState = (state) => {
  return {
    user: state.user,
    groupExpenses: state.groupExpenses,
    groupMembers: state.groupMembers,
  }
}

const mapDispatch = (dispatch) => {
  return {
    addGroupExpense: (groupId, newExpenseObject) =>
      dispatch(_addGroupExpense(groupId, newExpenseObject)),
    loadGroupMembers: (groupId) => dispatch(_loadGroupMembers(groupId)),
  }
}

export default connect(mapState, mapDispatch)(CreateGroupExpenseForm)
