import React from 'react'
import {connect} from 'react-redux'
import {_loadAnExpense} from '../../store/expenses/singleExpense'

class Expense extends React.Component {
  constructor() {
    super()
  }

  componentDidMount() {
    this.props.loadAnExpense(
      this.props.user.id,
      this.props.match.params.expenseId
    )
  }

  render() {
    const {expense} = this.props
    return (
      <div className="expense-individual">
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
  loadAnExpense: (userId, expenseId) =>
    dispatch(_loadAnExpense(userId, expenseId)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Expense)
