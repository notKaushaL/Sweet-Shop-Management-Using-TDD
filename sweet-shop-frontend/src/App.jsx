import { useState, useEffect } from 'react';
import Header from './components/Header';
import SweetCard from './components/SweetCard';
import AddSweetForm from './components/AddSweetForm';
import sweetService from './services/SweetService';
import './hover-effects.css';

function App() {
  const [sweets, setSweets] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [showPriceFilter, setShowPriceFilter] = useState(false);
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [sortOrder, setSortOrder] = useState('none'); // 'none', 'asc', 'desc'

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

  // Filter sweets based on search term, category, and price range
  const filteredSweets = sweets.filter(sweet => {
    // Filter by search term
    const matchesSearch = 
      sweet.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      sweet.category.toLowerCase().includes(searchTerm.toLowerCase());
    
    // Filter by category if not showing all
    const matchesCategory = selectedCategory === 'all' || 
      sweet.category.toLowerCase() === selectedCategory.toLowerCase();
    
    // Filter by price range
    const matchesMinPrice = minPrice === '' || sweet.price >= Number(minPrice);
    const matchesMaxPrice = maxPrice === '' || sweet.price <= Number(maxPrice);
    
    return matchesSearch && matchesCategory && matchesMinPrice && matchesMaxPrice;
  });
  
  // Apply sorting
  const sortedSweets = [...filteredSweets].sort((a, b) => {
    if (sortOrder === 'asc') {
      return a.price - b.price;
    } else if (sortOrder === 'desc') {
      return b.price - a.price;
    }
    return 0; // No sorting
  });

  return (
    <div style={{ backgroundColor: '#0B0C10', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Header />
      
      <main style={{ width: '100%', margin: '0 auto', padding: '1.5rem', flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column' }}>
        <div style={{ 
          display: 'flex', 
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '1.25rem',
          width: '100%',
          padding: '0.5rem 0.75rem',
          backgroundColor: '#1A1A1A',
          borderRadius: '8px',
          border: '1px solid #D4AF37',
          gap: '1rem'
        }}>
          {/* Search input - wider */}
          <input 
            className="input-hover"
            type="text"
            placeholder="Search sweets..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
              padding: '0.6rem 1.2rem',
              backgroundColor: '#232121',
              border: '1px solid #D4AF37',
              borderRadius: '4px',
              color: 'white',
              outline: 'none',
              flex: '1',
              minWidth: '180px',
              fontSize: '1rem'
            }}
          />
          
          {/* Category filter - wider */}
          <select
            className="input-hover"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            style={{
              padding: '0.6rem 1.2rem',
              backgroundColor: '#232121',
              border: '1px solid #D4AF37',
              borderRadius: '4px',
              color: '#D4AF37',
              outline: 'none',
              flex: '0 0 180px',
              fontSize: '1rem'
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
          
          {/* Sort Controls - wider buttons */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <span style={{ color: '#D4AF37', fontWeight: 'bold', fontSize: '1rem' }}>Sort:</span>
            <button
              className="button-hover"
              onClick={() => setSortOrder('asc')}
              style={{
                backgroundColor: sortOrder === 'asc' ? '#B8860B' : '#232121',
                color: sortOrder === 'asc' ? 'white' : '#D4AF37',
                padding: '0.6rem 1rem',
                borderRadius: '4px',
                fontWeight: 'bold',
                cursor: 'pointer',
                border: '1px solid #D4AF37',
                fontSize: '0.95rem',
                whiteSpace: 'nowrap'
              }}
            >
              ↑ Low to High
            </button>
            <button
              className="button-hover"
              onClick={() => setSortOrder('desc')}
              style={{
                backgroundColor: sortOrder === 'desc' ? '#B8860B' : '#232121',
                color: sortOrder === 'desc' ? 'white' : '#D4AF37',
                padding: '0.6rem 1rem',
                borderRadius: '4px',
                fontWeight: 'bold',
                cursor: 'pointer',
                border: '1px solid #D4AF37',
                fontSize: '0.95rem',
                whiteSpace: 'nowrap'
              }}
            >
              ↓ High to Low
            </button>
          </div>
          
          {/* Price filter and Add New buttons */}
          <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
            <button
              className="button-hover"
              onClick={() => setShowPriceFilter(!showPriceFilter)}
              style={{
                backgroundColor: showPriceFilter ? '#B8860B' : '#232121',
                color: showPriceFilter ? 'white' : '#D4AF37',
                padding: '0.6rem 1rem',
                borderRadius: '4px',
                fontWeight: 'bold',
                cursor: 'pointer',
                border: '1px solid #D4AF37',
                fontSize: '0.95rem',
                whiteSpace: 'nowrap'
              }}
            >
              {showPriceFilter ? 'Hide Filter' : 'Price Filter'}
            </button>
            
            <button
              className="button-hover"
              onClick={() => setShowAddForm(!showAddForm)}
              style={{
                backgroundColor: showAddForm ? '#B8860B' : '#D4AF37',
                color: showAddForm ? 'white' : '#000000',
                padding: '0.6rem 1rem',
                borderRadius: '4px',
                fontWeight: 'bold',
                cursor: 'pointer',
                border: 'none',
                fontSize: '0.95rem',
                whiteSpace: 'nowrap'
              }}
            >
              {showAddForm ? 'Hide Form' : '+ New Sweet'}
            </button>
            
            {sortOrder !== 'none' && (
              <button
                className="button-hover"
                onClick={() => setSortOrder('none')}
                style={{
                  backgroundColor: '#1A1A1A',
                  color: '#F44336',
                  padding: '0.6rem 1rem',
                  borderRadius: '4px',
                  fontWeight: 'bold',
                  cursor: 'pointer',
                  border: '1px solid #F44336',
                  fontSize: '0.95rem'
                }}
              >
                Clear Sort
              </button>
            )}
          </div>
        </div>

        {/* Price Range Filter */}
        {showPriceFilter && (
          <div style={{
            backgroundColor: '#1A1A1A',
            border: '1px solid #D4AF37',
            borderRadius: '8px',
            padding: '0.75rem',
            marginBottom: '0.5rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '0.5rem',
            width: '100%'
          }}>
            <h3 style={{ color: '#D4AF37', fontSize: '1rem', fontWeight: 'bold' }}>
              Price Range Filter
            </h3>
            
            <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
              <div style={{ flex: '1' }}>
                <label style={{ 
                  display: 'block', 
                  color: '#D4AF37', 
                  marginBottom: '0.25rem',
                  fontSize: '0.9rem'
                }}>
                  Minimum Price (₹)
                </label>
                <input
                  type="number"
                  value={minPrice}
                  onChange={(e) => setMinPrice(e.target.value)}
                  placeholder="Min Price"
                  min="0"
                  style={{
                    width: '100%',
                    padding: '0.5rem',
                    backgroundColor: '#232121',
                    border: '1px solid #D4AF37',
                    borderRadius: '4px',
                    color: 'white'
                  }}
                />
              </div>
              
              <div style={{ flex: '1' }}>
                <label style={{ 
                  display: 'block', 
                  color: '#D4AF37', 
                  marginBottom: '0.25rem',
                  fontSize: '0.9rem'
                }}>
                  Maximum Price (₹)
                </label>
                <input
                  type="number"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(e.target.value)}
                  placeholder="Max Price"
                  min="0"
                  style={{
                    width: '100%',
                    padding: '0.5rem',
                    backgroundColor: '#232121',
                    border: '1px solid #D4AF37',
                    borderRadius: '4px',
                    color: 'white'
                  }}
                />
              </div>
              
              <button
                onClick={() => {
                  setMinPrice('');
                  setMaxPrice('');
                }}
                style={{
                  backgroundColor: '#F44336',
                  color: 'white',
                  padding: '0.5rem 1rem',
                  borderRadius: '4px',
                  fontWeight: 'bold',
                  cursor: 'pointer',
                  border: 'none',
                  marginTop: '1.5rem'
                }}
              >
                Clear
              </button>
            </div>
            
            {/* Price Range Summary */}
            {(minPrice !== '' || maxPrice !== '') && (
              <div style={{ color: '#F0E68C', fontSize: '0.9rem' }}>
                Currently filtering: 
                {minPrice !== '' && maxPrice !== '' 
                  ? ` ₹${minPrice} - ₹${maxPrice}`
                  : minPrice !== '' 
                    ? ` ₹${minPrice} and above`
                    : ` Up to ₹${maxPrice}`
                }
                <span style={{ color: '#B8860B' }}>
                  {" "}({sortedSweets.length} {sortedSweets.length === 1 ? 'sweet' : 'sweets'} match)
                </span>
              </div>
            )}
          </div>
        )}
        
        {/* Add Sweet Form */}
        {showAddForm && (
          <AddSweetForm onSweetAdded={() => setSweets([...sweetService.getAllSweets()])} />
        )}
        
        {/* Sweet Cards Grid */}
        <div style={{ 
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: '1rem',
          marginTop: '1rem',
          padding: '0.75rem',
          flex: '1'
        }}>
          {sortedSweets.length > 0 ? (
            sortedSweets.map(sweet => (
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
              padding: '1.5rem',
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
    </div>
  );
}

export default App;
