function Balance() {
  const ctx = React.useContext(UserContext);
  const currentUser = ctx.currentUser;
  const balance = currentUser ? currentUser.balance : 0;

  return (
    <Card
      bgcolor="info"
      header="Account Balance"
      textcolor="white"
      body={
        currentUser ? (
          <h5>
            Available balance is ${balance}
          </h5>
        ) : (
          <h5>Please log in to see your balance.</h5>
        )
      }
    />
  );
}
