
import { useState, useEffect } from 'react';
import Header from './components/Header';
import SweetCard from './components/SweetCard';
import AddSweetForm from './components/AddSweetForm';
import sweetService from './services/SweetService';

function App() {
  const [sweets, setSweets] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('all');

  // Load sweets when component mounts
  useEffect(() => {
    // Load sample data when the component mounts
    sweetService.loadSampleData();
    setSweets(sweetService.getAllSweets());
  }, []);

  // Handle purchase
  const handlePurchase = (id, quantity) => {
    try {
      sweetService.purchaseSweet(id, quantity);
      setSweets([...sweetService.getAllSweets()]);
      alert('Purchase successful!');
    } catch (error) {
      alert(error.message);
    }
  };

  // Handle restock
  const handleRestock = (id, quantity) => {
    try {
      sweetService.restockSweet(id, quantity);
      setSweets([...sweetService.getAllSweets()]);
      alert('Restock successful!');
    } catch (error) {
      alert(error.message);
    }
  };

  // Handle delete
  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this sweet?')) {
      try {
        sweetService.deleteSweetById(id);
        setSweets([...sweetService.getAllSweets()]);
      } catch (error) {
        alert(error.message);
      }
    }
  };

  // Filter sweets based on search term and category
  const filteredSweets = sweets.filter(sweet => {
    // Filter by search term
    const matchesSearch = 
      sweet.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      sweet.category.toLowerCase().includes(searchTerm.toLowerCase());
    
    // Filter by category if not showing all
    const matchesCategory = selectedCategory === 'all' || 
      sweet.category.toLowerCase() === selectedCategory.toLowerCase();
    
    return matchesSearch && matchesCategory;
  });

  return (
    <div style={{ backgroundColor: '#232121d0', minHeight: '100vh' }}>
      <Header />
      
      <main style={{ maxWidth: '1200px', margin: '0 auto', padding: '2rem' }}>
        <div style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          marginBottom: '2rem'
        }}>
          <div>
            <h1 style={{ color: '#D4AF37', fontSize: '1.8rem', marginBottom: '0.25rem' }}>Sweet Inventory</h1>
            <p style={{ color: '#B8860B', fontSize: '0.9rem' }}>
              {filteredSweets.length} {filteredSweets.length === 1 ? 'sweet' : 'sweets'} {selectedCategory !== 'all' ? `in ${selectedCategory}` : 'total'}
            </p>
          </div>
          
          <div style={{ display: 'flex', gap: '1rem' }}>
            {/* Search input */}
            <input 
              type="text"
              placeholder="Search sweets..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{
                padding: '0.5rem 1rem',
                backgroundColor: '#1A1A1A',
                border: '1px solid #D4AF37',
                borderRadius: '4px',
                color: 'white',
                outline: 'none'
              }}
            />

            {/* Category filter */}
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              style={{
                padding: '0.5rem 1rem',
                backgroundColor: '#1A1A1A',
                border: '1px solid #D4AF37',
                borderRadius: '4px',
                color: '#D4AF37',
                outline: 'none'
              }}
            >
              <option value="all">All Categories</option>
              {/* Get unique categories */}
              {[...new Set(sweets.map(sweet => sweet.category))].map(category => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
            
            {/* Add New Sweet button */}
            <button
              onClick={() => setShowAddForm(!showAddForm)}
              style={{
                backgroundColor: '#D4AF37',
                color: '#000000',
                padding: '0.5rem 1rem',
                borderRadius: '4px',
                fontWeight: 'bold',
                cursor: 'pointer',
                border: 'none'
              }}
            >
              {showAddForm ? 'Hide Form' : 'Add New Sweet'}
            </button>
          </div>
        </div>

        {/* Add Sweet Form */}
        {showAddForm && (
          <AddSweetForm onSweetAdded={() => setSweets([...sweetService.getAllSweets()])} />
        )}
        
        {/* Sweet Cards Grid */}
        <div style={{ 
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
          gap: '1.5rem',
          marginTop: '1.5rem'
        }}>
          {filteredSweets.length > 0 ? (
            filteredSweets.map(sweet => (
              <SweetCard 
                key={sweet.id} 
                sweet={sweet} 
                onPurchase={handlePurchase}
                onRestock={handleRestock}
                onDelete={handleDelete}
              />
            ))
          ) : (
            <div style={{ 
              gridColumn: '1 / -1',
              textAlign: 'center',
              padding: '3rem',
              color: '#D4AF37',
              backgroundColor: '#1A1A1A',
              borderRadius: '8px',
              border: '1px solid #D4AF37'
            }}>
              No sweets found. Please add some sweets or try a different search term.
            </div>
          )}
        </div>
      </main>
      
      <footer style={{ 
        
        backgroundColor: '#000000',
        padding: '1.5rem',
        textAlign: 'center',
        color: '#D4AF37',
        marginTop: '2rem'
      }}>
        <p>© {new Date().getFullYear()} Sweet Shop Management System</p>
      </footer>
    </div>
  );
}

export default App;
