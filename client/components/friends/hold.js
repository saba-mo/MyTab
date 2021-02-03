axios
  .post(`/api/friends/${userId}`, {email})
  .then((response) => {
    dispatch(addFriend(response.data))
  })
  .catch((error) => {
    switch (error.response.status) {
      case '404':
        dispacth(inviteFriend({email}))
        break
      case '400':
        dispatch(invalidEmail({email}))
        break
      default:
        console.log("Shit's busted, yo", error)
        dispatch(systemError(error))
        break
    }
  })
