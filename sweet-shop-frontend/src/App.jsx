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
          padding: '0.8rem 1rem',
          backgroundColor: '#0D1117',
          borderRadius: '12px',
          border: 'none',
          gap: '1rem',
          boxShadow: '0 4px 12px rgba(102, 252, 241, 0.15)'
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
              backgroundColor: '#1F2833',
              border: '1px solid #66FCF1',
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
              backgroundColor: '#1F2833',
              border: '1px solid #66FCF1',
              borderRadius: '4px',
              color: '#66FCF1',
              outline: 'none',
              flex: '0 0 180px',
              fontSize: '1rem',
              WebkitAppearance: 'none',
              MozAppearance: 'none',
              appearance: 'none',
              backgroundImage: 'url("data:image/svg+xml;utf8,<svg fill=\'%2366FCF1\' height=\'24\' viewBox=\'0 0 24 24\' width=\'24\' xmlns=\'http://www.w3.org/2000/svg\'><path d=\'M7 10l5 5 5-5z\'/><path d=\'M0 0h24v24H0z\' fill=\'none\'/></svg>")',
              backgroundRepeat: 'no-repeat',
              backgroundPosition: 'right 0.7rem top 50%',
              backgroundSize: '1.5em auto'
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
            <span style={{ color: '#66FCF1', fontWeight: 'bold', fontSize: '1rem' }}>Sort:</span>
            <button
              className="button-hover"
              onClick={() => setSortOrder('asc')}
              style={{
                backgroundColor: sortOrder === 'asc' ? '#45A29E' : '#1F2833',
                color: sortOrder === 'asc' ? 'white' : '#66FCF1',
                padding: '0.6rem 1rem',
                borderRadius: '4px',
                fontWeight: 'bold',
                cursor: 'pointer',
                border: '1px solid #66FCF1',
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
                backgroundColor: sortOrder === 'desc' ? '#45A29E' : '#1F2833',
                color: sortOrder === 'desc' ? 'white' : '#66FCF1',
                padding: '0.6rem 1rem',
                borderRadius: '4px',
                fontWeight: 'bold',
                cursor: 'pointer',
                border: '1px solid #66FCF1',
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
                backgroundColor: showPriceFilter ? '#45A29E' : '#1F2833',
                color: showPriceFilter ? 'white' : '#66FCF1',
                padding: '0.6rem 1rem',
                borderRadius: '4px',
                fontWeight: 'bold',
                cursor: 'pointer',
                border: '1px solid #66FCF1',
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
                backgroundColor: showAddForm ? '#45A29E' : '#66FCF1',
                color: showAddForm ? 'white' : '#0B0C10',
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
                  backgroundColor: '#1F2833',
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
            backgroundColor: '#0D1117',
            border: 'none',
            borderRadius: '12px',
            padding: '1rem',
            marginBottom: '1rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '0.5rem',
            width: '100%',
            boxShadow: '0 4px 12px rgba(102, 252, 241, 0.15)'
          }}>
            <h3 style={{ color: '#66FCF1', fontSize: '1rem', fontWeight: 'bold' }}>
              Price Range Filter
            </h3>
            
            <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
              <div style={{ flex: '1' }}>
                <label style={{ 
                  display: 'block', 
                  color: '#66FCF1', 
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
                    backgroundColor: '#0B0C10',
                    border: '1px solid #66FCF1',
                    borderRadius: '4px',
                    color: 'white'
                  }}
                />
              </div>
              
              <div style={{ flex: '1' }}>
                <label style={{ 
                  display: 'block', 
                  color: '#66FCF1', 
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
                    backgroundColor: '#0B0C10',
                    border: '1px solid #66FCF1',
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
              <div style={{ color: '#C5C6C7', fontSize: '0.9rem' }}>
                Currently filtering: 
                {minPrice !== '' && maxPrice !== '' 
                  ? ` ₹${minPrice} - ₹${maxPrice}`
                  : minPrice !== '' 
                    ? ` ₹${minPrice} and above`
                    : ` Up to ₹${maxPrice}`
                }
                <span style={{ color: '#45A29E' }}>
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
              padding: '1.8rem',
              color: '#66FCF1',
              backgroundColor: '#0D1117',
              borderRadius: '12px',
              boxShadow: '0 4px 12px rgba(102, 252, 241, 0.15)',
              border: 'none'
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
