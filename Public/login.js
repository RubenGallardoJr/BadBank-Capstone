function Login() {
  const [show, setShow] = React.useState(true);
  const [status, setStatus] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const ctx = React.useContext(UserContext);

  function validate(field, label) {
    if (!field) {
      setStatus('Error: ' + label);
      setTimeout(() => setStatus(''), 3000);
      return false;
    }
    return true;
  }

  function handleLogin() {
    if (!validate(email, 'email')) return;
    if (!validate(password, 'password')) return;

    const user = ctx.users.find(u => u.email === email && u.password === password);
    if (!user) {
      setStatus('Error: Incorrect email or password');
      setTimeout(() => setStatus(''), 3000);
      return;
    }

    ctx.currentUser = user;
    setShow(false);
  }

  function clearForm() {
    setEmail('');
    setPassword('');
    setShow(true);
  }

  return (
    <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
      <Card
        bgcolor="info"
        header="Login"
        status={status}
        body={show ? (
          <form className="p-4">
            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                Email address
              </label>
              <input
                type="email"
                className="form-control"
                id="email"
                placeholder="Enter email"
                value={email}
                onChange={e => setEmail(e.currentTarget.value)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <input
                type="password"
                className="form-control"
                id="password"
                placeholder="Enter password"
                value={password}
                onChange={e => setPassword(e.currentTarget.value)}
              />
            </div>
            <button type="button" className="btn btn-primary" onClick={handleLogin}>
              Login
            </button>
          </form>
        ) : (
          <div className="p-4">
            <h5>Welcome, {ctx.currentUser.name}!</h5>
            <button type="button" className="btn btn-secondary" onClick={clearForm}>
              Log out
            </button>
          </div>
        )}
      />
    </div>
  );
}
