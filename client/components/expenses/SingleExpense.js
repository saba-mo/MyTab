import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {_loadAnExpense, _deleteGroupExpense} from '../../store/'

class SingleExpense extends React.Component {
  constructor() {
    super()

    this.deleteAndGoBack = this.deleteAndGoBack.bind(this)
  }

  componentDidMount() {
    const {groupId, expenseId} = this.props.match.params
    this.props.loadAnExpense(groupId, expenseId)
  }

  deleteAndGoBack() {
    const {groupId, id} = this.props.expense
    this.props.deleteGroupExpense(groupId, id)
    window.location.href = `/groups/singleGroup/${groupId}`
  }

  render() {
    const {expense} = this.props
    return (
      <div className="expense-individual">
        <div className="pages-view-navbar">
          <Link to={`/groups/singleGroup/${expense.groupId}`}>
            <h3>Back to Group Expenses </h3>
          </Link>
        </div>
        <h4>
          {expense.name} ${expense.totalCost}
        </h4>
        <button type="submit">Settle</button>
        <button type="submit">Edit</button>
        <button type="submit" onClick={this.deleteAndGoBack}>
          Remove
        </button>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
    expense: state.singleExpense,
  }
}

const mapDispatchToProps = (dispatch) => ({
  deleteGroupExpense: (groupId, expenseId) =>
    dispatch(_deleteGroupExpense(groupId, expenseId)),
  loadAnExpense: (groupId, expenseId) =>
    dispatch(_loadAnExpense(groupId, expenseId)),
})

export default connect(mapStateToProps, mapDispatchToProps)(SingleExpense)
