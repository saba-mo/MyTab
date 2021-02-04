import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {_loadAnExpense} from '../../store/expenses/singleExpense'
import {_deleteGroupExpense} from '../../store/expenses/expenses'

class SingleExpense extends React.Component {
  constructor() {
    super()
  }

  componentDidMount() {
    this.props.loadAnExpense(
      this.props.match.params.groupId,
      this.props.match.params.expenseId
    )
  }

  render() {
    const {expense} = this.props
    return (
      <div className="expense-individual">
        <div className="single-expense-navbar">
          <Link to={`/groups/singleGroup/${expense.groupId}`}>
            <h3>Back to Expenses </h3>
          </Link>
        </div>
        <h4>
          {expense.name} ${expense.totalCost}
        </h4>
        <button type="submit">Settle</button>
        <button type="submit">Edit</button>
        <button
          type="submit"
          onClick={
            () =>
              this.props.deleteGroupExpense(
                this.props.match.params.groupId,
                expense.id
              )
            // return to group expense list...use history?
          }
        >
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
