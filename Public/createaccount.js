function CreateAccount() {
  const [show, setShow] = React.useState(true);
  const [status, setStatus] = React.useState('');
  const [name, setName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [accountType, setAccountType] = React.useState('Checking');
  const [openSavings, setOpenSavings] = React.useState(false);
  const ctx = React.useContext(UserContext);

  function validate(field, label) {
    if (!field) {
      setStatus('Error: ' + label);
      setTimeout(() => setStatus(''), 3000);
      return false;
    }
    return true;
  }

  function validateEmail(email) {
    const isValid = /\S+@\S+\.\S+/.test(email);
    if (!isValid) {
      setStatus('Error: Invalid email address');
      setTimeout(() => setStatus(''), 3000);
      return false;
    }
    return true;
  }

  function handleSubmit(event) {
    event.preventDefault();
    if (!validate(name, 'name')) return;
    if (!validateEmail(email)) return;
    if (!validate(password, 'password')) return;
    ctx.users.push({ name, email, password, balance: 100, accountType });
    setShow(false);
  }

  function handleClear() {
    setName('');
    setEmail('');
    setPassword('');
    setAccountType('Checking');
    setOpenSavings(false);
    setShow(true);
  }

  const isDisabled = !name || !email || !password || password.length < 8;

  return (
    <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
      <Card
        bgcolor="primary"
        header="Create Account"
        status={status}
        body={show ? (
          <form onSubmit={handleSubmit} className="p-4">
            <div className="mb-3">
              <label htmlFor="name" className="form-label">
                Name:
              </label>
              <input
                type="text"
                id="name"
                className="form-control"
                placeholder="Enter name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                Email address:
              </label>
              <input
                type="email"
                id="email"
                className="form-control"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="mb-3">
              <label htmlFor="password" className="form-label">
                Password:
              </label>
              <input
                type="password"
                id="password"
                className="form-control"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <div className="mb-3">
              <label htmlFor="accountType" className="form-label">
                Account Type:
              </label>
              <select
                id="accountType"
                className="form-select"
                value={accountType}
                onChange={(e) => setAccountType(e.target.value)}
              >
                <option value="Checking">Checking</option>
                <option value="Savings">Savings</option>
              </select>
            </div>

            <div className="form-check mb-3">
              <input
                type="checkbox"
                id="openSavings"
                className="form-check-input"
                checked={openSavings}
                onChange={(e) => setOpenSavings(e.target.checked)}
              />
              <label htmlFor="openSavings" className="form-check-label">
                Open Savings Account
              </label>
            </div>

            <button type="submit" className="btn btn-primary" disabled={isDisabled}>
              Create Account
            </button>
          </form>
        ) : (
          <div className="p-4">
            <h5 className="mb-3">Success</h5>
            <p>Name: {name}</p>
            <p>Email: {email}</p>
            <p>Account Type: {accountType}</p>
            {openSavings && <p>Savings Account: Opened</p>}
            <button type="button" className="btn btn-secondary" onClick={handleClear}>
              Add another account
            </button>
          </div>
        )}
      />
    </div>
  );
}
