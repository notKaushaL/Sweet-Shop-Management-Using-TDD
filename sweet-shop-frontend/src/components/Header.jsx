/**
 * Header component for the Sweet Shop application
 */
function Header() {
  return (
    <header style={{
      backgroundColor: '#000000',
      padding: '1.5rem 0',
      borderBottom: '1px solid #D4AF37',
      boxShadow: '0 2px 5px rgba(0,0,0,0.2)'
    }}>
      <div style={{ 
        maxWidth: '1200px', 
        margin: '0 auto', 
        padding: '0 1rem',
        textAlign: 'center'
      }}>
        <h1 style={{ 
          fontSize: '2.5rem', 
          fontWeight: 'bold',
          color: '#D4AF37',
          margin: '0'
        }}>
          ✨ Sweet Shop Management ✨
        </h1>
        <p style={{ 
          color: '#F0E68C', 
          marginTop: '0.5rem',
          fontSize: '1.1rem'
        }}>
          Manage your sweet inventory with ease
        </p>
      </div>
    </header>
  );
}

export default Header;
