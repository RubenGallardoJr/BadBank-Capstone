function Home() {
  const ctx = React.useContext(UserContext);
  return (
    <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
      <div className="card shadow-lg" style={{ width: '18rem' }}>
        <img className="card-img-top" src="bank.png" alt="Card image cap" />
        <div className="card-body">
          <h5 className="card-title mb-3" style={{ fontFamily: 'Arial, sans-serif', fontSize: '24px' }}>
            BadBank
          </h5>
          <p className="card-text" style={{ fontFamily: 'Georgia, serif', fontSize: '18px', lineHeight: '1.5' }}>
            This is a BadBank website which displays the use of routing, Bootstrap, components, validation, and other web development skills.
          </p>
        </div>
      </div>
    </div>
  );
}
