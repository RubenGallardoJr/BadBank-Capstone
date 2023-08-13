function Deposit() {
  const [show, setShow] = React.useState(true);
  const [status, setStatus] = React.useState('');
  const [amount, setAmount] = React.useState('');
  const [selectedAccount, setSelectedAccount] = React.useState('Checking'); // Default to Checking
  const ctx = React.useContext(UserContext);

  function validate(field, label) {
    if (!field) {
      setStatus('Error: ' + label);
      setTimeout(() => setStatus(''), 3000);
      return false;
    }
    return true;
  }

  function handleDeposit() {
    if (!validate(amount, 'Please enter an amount')) return;

    const account = selectedAccount.toLowerCase();
    if (!ctx.currentUser[account]) {
      setStatus(`Error: ${selectedAccount} account not found.`);
      setTimeout(() => setStatus(''), 3000);
      return;
    }

    const newBalance = ctx.currentUser[account].balance + Number(amount);
    if (newBalance < 0) {
      setStatus('Error: Invalid amount');
      setTimeout(() => setStatus(''), 3000);
      return;
    }

    ctx.currentUser[account].balance = newBalance;
    setShow(false);
  }

  function clearForm() {
    setAmount('');
    setSelectedAccount('Checking');
    setShow(true);
  }

  function handleChange(event) {
    const input = event.target.value.replace(/\D/g, '');
    setAmount(input);
  }

  return (
    <Card
      bgcolor="info"
      header="Deposit"
      status={ctx.currentUser ? status : 'Please log in to access this page.'}
      body={ctx.currentUser ? (show ? (
        <>
          Balance: {ctx.currentUser.balance} <br />
          Choose Account: 
          <select
            value={selectedAccount}
            onChange={(e) => setSelectedAccount(e.target.value)}
          >
            <option value="Checking">Checking</option>
            <option value="Savings">Savings</option>
          </select>
          <br />
          Amount<br />
          <input type="text" className="form-control" id="amount" placeholder="Enter amount" value={amount} onChange={handleChange} /><br />
          <button type="submit" className="btn btn-light" onClick={handleDeposit}>Deposit</button>
        </>
      ) : (
        <>
          <h5>Deposit Successful</h5>
          <p>New balance: {ctx.currentUser[selectedAccount.toLowerCase()].balance}</p>
          <p>Current balance: {ctx.currentUser[selectedAccount.toLowerCase()].balance}</p>
          <button type="submit" className="btn btn-light" onClick={clearForm}>Make another deposit</button>
        </>
      )) : null}
    />
  );
}
