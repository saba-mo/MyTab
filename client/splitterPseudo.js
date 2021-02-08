/*
 CreateGroupExpense form
 fractionOwed = cost / # of group members
  grab id of "Paid by" user
    filter through arr of group members (excluding userWhoPaid) => subtract fractionOwed from each members' balance
    userWhoPaidIsOwed = cost - (fractionOwed * # of group members - 1)

 */
