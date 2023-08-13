function AllData() {
  const ctx = React.useContext(UserContext);
  const users = ctx.users;

  const cardStyle = {
    // Set a maximum and minimum height for the card
    maxHeight: '500px', // Adjust this value as needed
    minHeight: '200px', // Adjust this value as needed
    minWidth: '500px', // Adjust this value as needed
  };

  const tableStyle = {
    fontFamily: 'Arial, sans-serif',
    fontSize: '14px',
  };

  const headerStyle = {
    fontFamily: 'Georgia, serif',
    fontSize: '20px',
    color: '#fff',
  };

  const statisticsStyle = {
    fontFamily: 'Arial, sans-serif',
    fontSize: '16px',
    marginBottom: '10px',
  };

  const { numUsers, avgBalance, totalBalance } = getStatistics(users);

  return (
    <div className="d-flex justify-content-between">
      <Card
        header="All Data in Store"
        body={
          <div
            style={{
              ...cardStyle,
              overflow: 'auto',
              backgroundColor: '#17a2b8', // Set background color here
              padding: '15px', // Add padding to the card body
            }}
          >
            <table className="table table-striped" style={tableStyle}>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Password</th>
                  <th>Balance</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user, index) => (
                  <tr key={index}>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>{user.password}</td>
                    <td>{user.balance}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        }
      />
      <Card
        bgcolor="primary"
        header="User Statistics"
        body={
          <>
            <p style={statisticsStyle}>Number of users: {numUsers}</p>
            <p style={statisticsStyle}>Average balance: ${avgBalance.toFixed(2)}</p>
            <p style={statisticsStyle}>Total balance: ${totalBalance.toFixed(2)}</p>
          </>
        }
      />
    </div>
  );
}




function getStatistics(users) {
  const numUsers = users.length;
  const totalBalance = users.reduce((sum, user) => sum + user.balance, 0);
  const avgBalance = numUsers > 0 ? totalBalance / numUsers : 0;
  return { numUsers, avgBalance, totalBalance };
}
