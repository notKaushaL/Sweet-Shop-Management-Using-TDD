/**
 * Header component for the Sweet Shop application
 */
function Header() {
  return (
    <header style={{
      backgroundColor: '#0B0C10',
      padding: '1rem 0',
      borderBottom: 'none',
      boxShadow: '0 4px 12px rgba(102, 252, 241, 0.1)'
    }}>
      <div style={{ 
        width: '100%', 
        margin: '0 auto', 
        padding: '0 1.5rem',
        textAlign: 'left'
      }}>
        <h1 style={{ 
          fontSize: '1.9rem', 
          fontWeight: 'bold',
          background: 'linear-gradient(to right, #66FCF1, #45A29E)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          margin: '-0.5rem',
          display: 'inline-block',
          letterSpacing: '0.5px'
        }}>
          🛒 Sweet Shop Management 
        </h1>
        <p style={{ 
          color: '#C5C6C7', 
          fontWeight: 'bold',
          marginTop: '0.01rem',
          fontSize: '1rem',
          marginLeft: '2.6rem'
        }}>
          Sweet people have SWEET taste !
        </p>
      </div>
    </header>
  );
}

export default Header;
