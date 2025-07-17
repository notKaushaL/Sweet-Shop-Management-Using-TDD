
import Header from './components/Header';

function App() {
  return (
    <div style={{ backgroundColor: '#000000', minHeight: '100vh' }}>
      <Header />
      
      <main style={{ maxWidth: '1200px', margin: '0 auto', padding: '2rem' }}>
        <div style={{ 
          display: 'flex', 
          justifyContent: 'center', 
          alignItems: 'center',
          height: '50vh'
        }}>
          <div style={{ 
            color: '#D4AF37', 
            textAlign: 'center',
            padding: '2rem',
            border: '1px solid #D4AF37',
            borderRadius: '8px',
            backgroundColor: 'rgba(26, 26, 26, 0.8)'
          }}>
            <h1 style={{ fontSize: '2rem', marginBottom: '1rem' }}>
              Welcome to Sweet Shop Management
            </h1>
            <p style={{ fontSize: '1.2rem' }}>
              A simple system to manage your sweet inventory
            </p>
          </div>
        </div>
      </main>
      
      <footer style={{ 
        borderTop: '1px solid #D4AF37', 
        padding: '1.5rem',
        textAlign: 'center',
        color: '#D4AF37'
      }}>
        <p>© {new Date().getFullYear()} Sweet Shop Management System</p>
      </footer>
    </div>
  );
}

export default App;
