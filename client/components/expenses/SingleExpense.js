import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {_loadAnExpense} from '../../store/expenses/singleExpense'

class Expense extends React.Component {
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
  loadAnExpense: (groupId, expenseId) =>
    dispatch(_loadAnExpense(groupId, expenseId)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Expense)
