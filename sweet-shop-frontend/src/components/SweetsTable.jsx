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
        <h2 className="text-2xl font-bold text-[#66FCF1]">Sweet Inventory</h2>
        <button 
          className="bg-[#45A29E] hover:bg-[#66FCF1] text-[#0B0C10] font-bold py-2 px-4 rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl hover:shadow-[#66FCF1]/20"
          onClick={loadSampleData}
          data-testid="load-sample-data"
        >
          Load Sample Data
        </button>
      </div>
      
      {/* Search and Filter */}
      <div className="bg-[#1F2833] p-5 rounded-lg border border-[#45A29E] shadow-lg">
        <h3 className="text-lg font-semibold mb-4 text-[#66FCF1]">Search & Filter</h3>
        <form onSubmit={handleSearch} className="space-y-4">
          <div className="flex space-x-4">
            <div className="flex-1">
              <select
                value={searchType}
                onChange={(e) => setSearchType(e.target.value)}
                className="w-full p-2 bg-[#0B0C10] border border-[#45A29E] rounded-lg text-white focus:border-[#66FCF1] focus:ring focus:ring-[#66FCF1]/20 transition-all"
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
                  className="w-full p-2 bg-[#0B0C10] border border-[#45A29E] rounded-lg text-white focus:border-[#66FCF1] focus:ring focus:ring-[#66FCF1]/20 transition-all"
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
                  min="0"
                  className="w-full p-2 bg-[#0B0C10] border border-[#45A29E] rounded-lg text-white focus:border-[#66FCF1] focus:ring focus:ring-[#66FCF1]/20 transition-all"
                  data-testid="min-price-input"
                />
                <input
                  type="number"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(e.target.value)}
                  placeholder="Max Price"
                  min="0"
                  className="w-full p-2 bg-[#0B0C10] border border-[#45A29E] rounded-lg text-white focus:border-[#66FCF1] focus:ring focus:ring-[#66FCF1]/20 transition-all"
                  data-testid="max-price-input"
                />
              </div>
            )}
            
            <button
              type="submit"
              className="bg-[#45A29E] hover:bg-[#66FCF1] text-[#0B0C10] font-bold py-2 px-6 rounded-lg transition-all duration-300 shadow-md hover:shadow-lg hover:shadow-[#66FCF1]/20"
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
              className="p-2 bg-[#0B0C10] border border-[#45A29E] rounded-lg text-white focus:border-[#66FCF1] focus:ring focus:ring-[#66FCF1]/20 transition-all"
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
      <div className="overflow-x-auto rounded-lg shadow-xl">
        <table className="min-w-full bg-[#1F2833] border border-[#45A29E] rounded-lg overflow-hidden">
          <thead>
            <tr className="bg-[#0B0C10]">
              <th className="py-3 px-6 border-b border-[#45A29E] text-left text-[#66FCF1] font-bold">ID</th>
              <th className="py-3 px-6 border-b border-[#45A29E] text-left text-[#66FCF1] font-bold">Name</th>
              <th className="py-3 px-6 border-b border-[#45A29E] text-left text-[#66FCF1] font-bold">Category</th>
              <th className="py-3 px-6 border-b border-[#45A29E] text-left text-[#66FCF1] font-bold">Price</th>
              <th className="py-3 px-6 border-b border-[#45A29E] text-left text-[#66FCF1] font-bold">Quantity</th>
              <th className="py-3 px-6 border-b border-[#45A29E] text-left text-[#66FCF1] font-bold">Actions</th>
            </tr>
          </thead>
          <tbody>
            {sweets.length > 0 ? (
              sweets.map(sweet => (
                <tr key={sweet.id} className="hover:bg-[#2c3440] transition-colors duration-150" data-testid={`sweet-row-${sweet.id}`}>
                  <td className="py-3 px-6 border-b border-[#45A29E] text-white">{sweet.id}</td>
                  <td className="py-3 px-6 border-b border-[#45A29E] text-white font-medium">{sweet.name}</td>
                  <td className="py-3 px-6 border-b border-[#45A29E] text-white">{sweet.category}</td>
                  <td className="py-3 px-6 border-b border-[#45A29E] text-white">₹{sweet.price}</td>
                  <td className="py-3 px-6 border-b border-[#45A29E] text-white">{sweet.quantity}</td>
                  <td className="py-3 px-6 border-b border-[#45A29E]">
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handlePurchase(sweet.id)}
                        className="bg-[#45A29E] hover:bg-[#66FCF1] text-[#0B0C10] font-bold text-xs py-1.5 px-3 rounded-lg transition-all duration-300 hover:shadow-lg hover:shadow-[#66FCF1]/20"
                        data-testid={`purchase-button-${sweet.id}`}
                      >
                        Purchase
                      </button>
                      <button
                        onClick={() => handleRestock(sweet.id)}
                        className="bg-[#45A29E] hover:bg-[#66FCF1] text-[#0B0C10] font-bold text-xs py-1.5 px-3 rounded-lg transition-all duration-300 hover:shadow-lg hover:shadow-[#66FCF1]/20"
                        data-testid={`restock-button-${sweet.id}`}
                      >
                        Restock
                      </button>
                      <button
                        onClick={() => handleDelete(sweet.id)}
                        className="bg-[#c25d5d] hover:bg-[#e57373] text-white font-bold text-xs py-1.5 px-3 rounded-lg transition-all duration-300 hover:shadow-lg"
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
                <td colSpan="6" className="py-8 text-center text-gray-300 italic">
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
