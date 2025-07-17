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
    <div style={{
      backgroundColor: '#1A1A1A',
      border: '1px solid #D4AF37',
      borderRadius: '6px',
      padding: '0.75rem',
      marginBottom: '0.75rem',
      width: '100%'
    }}>
      <h2 style={{ 
        color: '#D4AF37', 
        fontSize: '1rem', 
        fontWeight: 'bold',
        marginBottom: '0.5rem'
      }}>
        Add New Sweet
      </h2>
      
      {error && (
        <div style={{
          backgroundColor: 'rgba(220, 38, 38, 0.2)',
          color: '#FCA5A5',
          padding: '0.75rem',
          borderRadius: '4px',
          marginBottom: '1rem',
          border: '1px solid #EF4444'
        }}>
          {error}
        </div>
      )}
      
      {success && (
        <div style={{
          backgroundColor: 'rgba(16, 185, 129, 0.2)',
          color: '#6EE7B7',
          padding: '0.75rem',
          borderRadius: '4px',
          marginBottom: '1rem',
          border: '1px solid #10B981'
        }}>
          {success}
        </div>
      )}
      
      <form onSubmit={handleSubmit} style={{ display: 'grid', gap: '0.5rem', width: '100%', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))' }}>
        <div>
          <label htmlFor="id" style={{ 
            display: 'block', 
            color: '#D4AF37', 
            marginBottom: '0.25rem',
            fontSize: '0.9rem'
          }}>
            Sweet ID
          </label>
          <input
            type="number"
            id="id"
            name="id"
            value={formData.id}
            onChange={handleChange}
            style={{
              width: '100%',
              padding: '0.5rem',
              backgroundColor: '#232121',
              border: '1px solid #D4AF37',
              borderRadius: '4px',
              color: 'white'
            }}
            data-testid="sweet-id-input"
          />
        </div>
        
        <div>
          <label htmlFor="name" style={{ 
            display: 'block', 
            color: '#D4AF37', 
            marginBottom: '0.25rem',
            fontSize: '0.9rem'
          }}>
            Sweet Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            style={{
              width: '100%',
              padding: '0.5rem',
              backgroundColor: '#232121',
              border: '1px solid #D4AF37',
              borderRadius: '4px',
              color: 'white'
            }}
            data-testid="sweet-name-input"
          />
        </div>
        
        <div>
          <label htmlFor="category" style={{ 
            display: 'block', 
            color: '#D4AF37', 
            marginBottom: '0.25rem',
            fontSize: '0.9rem'
          }}>
            Category
          </label>
          <input
            type="text"
            id="category"
            name="category"
            value={formData.category}
            onChange={handleChange}
            style={{
              width: '100%',
              padding: '0.5rem',
              backgroundColor: '#232121',
              border: '1px solid #D4AF37',
              borderRadius: '4px',
              color: 'white'
            }}
            data-testid="sweet-category-input"
          />
        </div>
        
        <div>
          <label htmlFor="price" style={{ 
            display: 'block', 
            color: '#D4AF37', 
            marginBottom: '0.25rem',
            fontSize: '0.9rem'
          }}>
            Price
          </label>
          <input
            type="number"
            id="price"
            name="price"
            value={formData.price}
            onChange={handleChange}
            style={{
              width: '100%',
              padding: '0.5rem',
              backgroundColor: '#232121',
              border: '1px solid #D4AF37',
              borderRadius: '4px',
              color: 'white'
            }}
            data-testid="sweet-price-input"
          />
        </div>
        
        <div>
          <label htmlFor="quantity" style={{ 
            display: 'block', 
            color: '#D4AF37', 
            marginBottom: '0.25rem',
            fontSize: '0.9rem'
          }}>
            Quantity
          </label>
          <input
            type="number"
            id="quantity"
            name="quantity"
            value={formData.quantity}
            onChange={handleChange}
            style={{
              width: '100%',
              padding: '0.5rem',
              backgroundColor: '#232121',
              border: '1px solid #D4AF37',
              borderRadius: '4px',
              color: 'white'
            }}
            data-testid="sweet-quantity-input"
          />
        </div>
        
        <button
          type="submit"
          style={{
            width: '50%',
            padding: '0.4rem',
            backgroundColor: '#D4AF37',
            color: 'black',
            fontWeight: 'bold',
            borderRadius: '3px',
            marginTop: '0.25rem',
            fontSize: '0.85rem',
            cursor: 'pointer',
            border: 'none',
            gridColumn: '1 / -1',
            justifySelf: 'center'
          }}
          data-testid="add-sweet-button"
        >
          Add Sweet
        </button>
      </form>
    </div>
  );
}

export default AddSweetForm;
