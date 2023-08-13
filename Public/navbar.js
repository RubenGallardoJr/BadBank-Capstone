function NavBar() {
  const pages = {
    CreateAccount: 'Create new account',
    login: 'Login to your account',
    deposit: 'Deposit money into your account',
    withdraw: 'Withdraw money from your account',
    balance: 'Check account balance',
    alldata: 'View current acccount data',
  };

  const [hoveredPage, setHoveredPage] = React.useState('');

  function handleMouseEnter(page) {
    setHoveredPage(page);
  }

  function handleMouseLeave() {
    setHoveredPage('');
  }

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark bg-secondary">
        <a className="navbar-brand" href="#">
          BadBank
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            {Object.keys(pages).map((page) => (
              <li className="nav-item" key={page}>
                <a
                  className={`nav-link btn btn-outline-primary btn-shape`}
                  href={`#/${page}/`}
                  onMouseEnter={() => handleMouseEnter(page)}
                  onMouseLeave={() => handleMouseLeave()}
                >
                  {page.charAt(0).toUpperCase() + page.slice(1)}
                </a>
                {hoveredPage === page && (
                  <div className="hover-text">{pages[page]}</div>
                )}
              </li>
            ))}
          </ul>
        </div>
      </nav>
    </>
  );
}
