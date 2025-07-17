import { useState } from 'react';
import Sweet from '../models/Sweet';
import sweetService from '../services/SweetService';

/**
 * Component for adding new sweets to the store
 */
function AddSweetForm({ onSweetAdded }) {
  const [formData, setFormData] = useState({
    id: '',
    name: '',
    category: '',
    price: '',
    quantity: ''
  });
  
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === 'id' || name === 'price' || name === 'quantity' 
        ? Number(value) 
        : value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    
    try {
      // Validate form
      if (!formData.id || !formData.name || !formData.category || !formData.price || !formData.quantity) {
        setError('All fields are required');
        return;
      }
      
      // Create new sweet
      const newSweet = new Sweet(
        formData.id,
        formData.name,
        formData.category,
        formData.price,
        formData.quantity
      );
      
      // Add to service
      sweetService.addSweet(newSweet);
      
      // Clear form
      setFormData({
        id: '',
        name: '',
        category: '',
        price: '',
        quantity: ''
      });
      
      setSuccess('Sweet added successfully!');
      
      // Call the callback to notify parent component
      if (onSweetAdded) {
        onSweetAdded();
      }
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="p-4 bg-gray-900 rounded-lg border border-gold-500">
      <h2 className="text-xl font-bold mb-4 text-gold-500">Add New Sweet</h2>
      
      {error && (
        <div className="bg-red-900 text-white p-2 rounded mb-4" role="alert">
          {error}
        </div>
      )}
      
      {success && (
        <div className="bg-green-900 text-white p-2 rounded mb-4" role="alert">
          {success}
        </div>
      )}
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="id" className="block text-sm font-medium">
            Sweet ID
          </label>
          <input
            type="number"
            id="id"
            name="id"
            value={formData.id}
            onChange={handleChange}
            className="mt-1 block w-full p-2 bg-gray-800 border border-gold-500 rounded text-white"
            data-testid="sweet-id-input"
          />
        </div>
        
        <div>
          <label htmlFor="name" className="block text-sm font-medium">
            Sweet Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="mt-1 block w-full p-2 bg-gray-800 border border-gold-500 rounded text-white"
            data-testid="sweet-name-input"
          />
        </div>
        
        <div>
          <label htmlFor="category" className="block text-sm font-medium">
            Category
          </label>
          <input
            type="text"
            id="category"
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="mt-1 block w-full p-2 bg-gray-800 border border-gold-500 rounded text-white"
            data-testid="sweet-category-input"
          />
        </div>
        
        <div>
          <label htmlFor="price" className="block text-sm font-medium">
            Price
          </label>
          <input
            type="number"
            id="price"
            name="price"
            value={formData.price}
            onChange={handleChange}
            className="mt-1 block w-full p-2 bg-gray-800 border border-gold-500 rounded text-white"
            data-testid="sweet-price-input"
          />
        </div>
        
        <div>
          <label htmlFor="quantity" className="block text-sm font-medium">
            Quantity
          </label>
          <input
            type="number"
            id="quantity"
            name="quantity"
            value={formData.quantity}
            onChange={handleChange}
            className="mt-1 block w-full p-2 bg-gray-800 border border-gold-500 rounded text-white"
            data-testid="sweet-quantity-input"
          />
        </div>
        
        <button
          type="submit"
          className="w-full py-2 px-4 bg-gold-500 hover:bg-gold-600 text-black font-bold rounded transition duration-200"
          data-testid="add-sweet-button"
        >
          Add Sweet
        </button>
      </form>
    </div>
  );
}

export default AddSweetForm;
