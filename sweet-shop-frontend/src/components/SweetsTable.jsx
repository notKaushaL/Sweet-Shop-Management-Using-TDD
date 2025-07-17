import { useState } from 'react';
import sweetService from '../services/SweetService';

/**
 * Component for displaying sweets in a table with search and sort functionality
 */
function SweetsTable() {
  const [sweets, setSweets] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchType, setSearchType] = useState('name');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [sortOrder, setSortOrder] = useState('none');
  
  // Load sweets from service
  const loadSweets = () => {
    let result;
    
    if (searchTerm && searchType === 'name') {
      result = sweetService.searchByName(searchTerm);
    } else if (searchTerm && searchType === 'category') {
      result = sweetService.searchByCategory(searchTerm);
    } else if (searchType === 'price' && minPrice && maxPrice) {
      result = sweetService.searchByPriceRange(Number(minPrice), Number(maxPrice));
    } else {
      result = sweetService.getAllSweets();
    }
    
    if (sortOrder === 'asc') {
      result = sweetService.sortByPriceAsc();
    } else if (sortOrder === 'desc') {
      result = sweetService.sortByPriceDesc();
    }
    
    setSweets(result);
  };
  
  // Handle search
  const handleSearch = (e) => {
    e.preventDefault();
    loadSweets();
  };
  
  // Handle delete
  const handleDelete = (id) => {
    try {
      sweetService.deleteSweetById(id);
      loadSweets();
    } catch (error) {
      console.error('Error deleting sweet:', error);
    }
  };
  
  // Handle purchase
  const handlePurchase = (id) => {
    const quantity = prompt('Enter quantity to purchase:');
    if (quantity) {
      try {
        sweetService.purchaseSweet(id, Number(quantity));
        loadSweets();
        alert('Purchase successful!');
      } catch (error) {
        alert(error.message);
      }
    }
  };
  
  // Handle restock
  const handleRestock = (id) => {
    const quantity = prompt('Enter quantity to restock:');
    if (quantity) {
      try {
        sweetService.restockSweet(id, Number(quantity));
        loadSweets();
        alert('Restock successful!');
      } catch (error) {
        alert(error.message);
      }
    }
  };
  
  // Load sample data for testing
  const loadSampleData = () => {
    sweetService.loadSampleData();
    loadSweets();
  };
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold text-[#D4AF37]">Sweet Inventory</h2>
        <button 
          className="bg-[#D4AF37] hover:bg-[#B8860B] text-black font-bold py-2 px-4 rounded"
          onClick={loadSampleData}
          data-testid="load-sample-data"
        >
          Load Sample Data
        </button>
      </div>
      
      {/* Search and Filter */}
      <div className="bg-[#0D0D0D] p-4 rounded-lg border border-[#D4AF37]">
        <h3 className="text-lg font-semibold mb-3 text-[#D4AF37]">Search & Filter</h3>
        <form onSubmit={handleSearch} className="space-y-4">
          <div className="flex space-x-4">
            <div className="flex-1">
              <select
                value={searchType}
                onChange={(e) => setSearchType(e.target.value)}
                className="w-full p-2 bg-[#1A1A1A] border border-[#D4AF37] rounded text-white"
                data-testid="search-type-select"
              >
                <option value="name">Search by Name</option>
                <option value="category">Search by Category</option>
                <option value="price">Search by Price Range</option>
              </select>
            </div>
            
            {searchType !== 'price' ? (
              <div className="flex-1">
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder={`Enter ${searchType}...`}
                  className="w-full p-2 bg-[#1A1A1A] border border-[#D4AF37] rounded text-white"
                  data-testid="search-term-input"
                />
              </div>
            ) : (
              <div className="flex flex-1 space-x-2">
                <input
                  type="number"
                  value={minPrice}
                  onChange={(e) => setMinPrice(e.target.value)}
                  placeholder="Min Price"
                  className="w-full p-2 bg-[#1A1A1A] border border-[#D4AF37] rounded text-white"
                  data-testid="min-price-input"
                />
                <input
                  type="number"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(e.target.value)}
                  placeholder="Max Price"
                  className="w-full p-2 bg-gray-800 border border-gold-500 rounded text-white"
                  data-testid="max-price-input"
                />
              </div>
            )}
            
            <button
              type="submit"
              className="bg-gold-500 hover:bg-gold-600 text-black font-bold py-2 px-6 rounded"
              data-testid="search-button"
            >
              Search
            </button>
          </div>
          
          <div className="flex items-center space-x-4">
            <span className="text-white">Sort by Price:</span>
            <select
              value={sortOrder}
              onChange={(e) => {
                setSortOrder(e.target.value);
                setTimeout(() => loadSweets(), 0);
              }}
              className="p-2 bg-gray-800 border border-gold-500 rounded text-white"
              data-testid="sort-select"
            >
              <option value="none">None</option>
              <option value="asc">Lowest to Highest</option>
              <option value="desc">Highest to Lowest</option>
            </select>
          </div>
        </form>
      </div>
      
      {/* Sweets Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-[#0D0D0D] border border-[#D4AF37] rounded-lg">
          <thead>
            <tr className="bg-[#1A1A1A]">
              <th className="py-2 px-4 border-b border-[#D4AF37] text-left text-[#D4AF37]">ID</th>
              <th className="py-2 px-4 border-b border-[#D4AF37] text-left text-[#D4AF37]">Name</th>
              <th className="py-2 px-4 border-b border-[#D4AF37] text-left text-[#D4AF37]">Category</th>
              <th className="py-2 px-4 border-b border-[#D4AF37] text-left text-[#D4AF37]">Price</th>
              <th className="py-2 px-4 border-b border-[#D4AF37] text-left text-[#D4AF37]">Quantity</th>
              <th className="py-2 px-4 border-b border-[#D4AF37] text-left text-[#D4AF37]">Actions</th>
            </tr>
          </thead>
          <tbody>
            {sweets.length > 0 ? (
              sweets.map(sweet => (
                <tr key={sweet.id} className="hover:bg-gray-800" data-testid={`sweet-row-${sweet.id}`}>
                  <td className="py-2 px-4 border-b border-gold-500">{sweet.id}</td>
                  <td className="py-2 px-4 border-b border-gold-500">{sweet.name}</td>
                  <td className="py-2 px-4 border-b border-gold-500">{sweet.category}</td>
                  <td className="py-2 px-4 border-b border-gold-500">{sweet.price}</td>
                  <td className="py-2 px-4 border-b border-gold-500">{sweet.quantity}</td>
                  <td className="py-2 px-4 border-b border-gold-500">
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handlePurchase(sweet.id)}
                        className="bg-blue-600 hover:bg-blue-700 text-white text-xs py-1 px-2 rounded"
                        data-testid={`purchase-button-${sweet.id}`}
                      >
                        Purchase
                      </button>
                      <button
                        onClick={() => handleRestock(sweet.id)}
                        className="bg-green-600 hover:bg-green-700 text-white text-xs py-1 px-2 rounded"
                        data-testid={`restock-button-${sweet.id}`}
                      >
                        Restock
                      </button>
                      <button
                        onClick={() => handleDelete(sweet.id)}
                        className="bg-red-600 hover:bg-red-700 text-white text-xs py-1 px-2 rounded"
                        data-testid={`delete-button-${sweet.id}`}
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="py-4 text-center text-gray-400">
                  No sweets found. Please add some sweets or load sample data.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default SweetsTable;
