function Withdraw() {
  const [show, setShow] = React.useState(true);
  const [status, setStatus] = React.useState('');
  const [amount, setAmount] = React.useState('');
  const ctx = React.useContext(UserContext);

  // check if user is logged in
  if (!ctx.currentUser) {
    return (
      <Card
        bgcolor="danger"
        header="Withdraw"
        status="Error"
        body={<h5>Please log in to access this page.</h5>}
      />
    );
  }

  function validate(field, label) {
    if (!field) {
      setStatus('Error: ' + label);
      setTimeout(() => setStatus(''), 3000);
      return false;
    }
    return true;
  }

  function handleWithdraw() {
    if (!validate(amount, 'amount')) return;

    const newBalance = ctx.currentUser.balance - Number(amount);
    if (newBalance < 0) {
      setStatus('Error: Insufficient funds');
      setTimeout(() => setStatus(''), 3000);
      return;
    }

    ctx.currentUser.balance = newBalance;
    setShow(false);
  }

  function clearForm() {
    setAmount('');
    setShow(true);
  }

  function handleChange(e) {
    if (e.target.validity.valid) {
      setAmount(e.target.value);
    }
  }

  return (
    <Card
      bgcolor="danger"
      header="Withdraw"
      status={status}
      body={show ? (
        <>
          Balance: {ctx.currentUser.balance} <br />
          Amount<br />
          <input type="input" className="form-control" id="amount" placeholder="Enter amount" value={amount} onChange={handleChange} pattern="[0-9]*" /><br />
          <button type="submit" className="btn btn-light" onClick={handleWithdraw}>Withdraw</button>
        </>
      ) : (
        <>
          <h5>Your new balance is: {ctx.currentUser.balance}</h5>
          <button type="submit" className="btn btn-light" onClick={clearForm}>Make another withdrawal</button>
        </>
      )}
    />
  );
}
