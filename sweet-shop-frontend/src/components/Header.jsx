/**
 * Header component for the Sweet Shop application
 */
function Header() {
  return (
    <header style={{
      backgroundColor: '#000000',
      padding: '0.75rem 0',
      borderBottom: '1px solid #D4AF37',
      boxShadow: '0 2px 5px rgba(0,0,0,0.2)'
    }}>
      <div style={{ 
        width: '100%', 
        margin: '0 auto', 
        padding: '0 1.5rem',
        textAlign: 'left'
      }}>
        <h1 style={{ 
          fontSize: '1.8rem', 
          fontWeight: 'bold',
          color: '#D4AF37',
          margin: '-0.5rem',
          display: 'inline-block'
        }}>
          🛒 Sweet Shop Management 
        </h1>
        <p style={{ 
          color: '#F0E68C', 
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
