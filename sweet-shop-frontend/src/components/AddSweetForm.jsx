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
      backgroundColor: '#0D1117',
      border: 'none',
      borderRadius: '12px',
      padding: '1.8rem',
      marginBottom: '1.5rem',
      width: '100%',
      boxShadow: '0 4px 12px rgba(102, 252, 241, 0.15)'
    }}>
      <h2 style={{ 
        color: '#66FCF1', 
        fontSize: '1.4rem', 
        fontWeight: 'bold',
        marginBottom: '1rem',
        textAlign: 'center'
      }}>
        Add New Sweet
      </h2>
      
      {error && (
        <div style={{
          backgroundColor: 'rgba(220, 38, 38, 0.15)',
          color: '#FCA5A5',
          padding: '1rem',
          borderRadius: '8px',
          marginBottom: '1.5rem',
          border: '1px solid #EF4444',
          fontSize: '1rem',
          textAlign: 'center',
          boxShadow: '0 4px 8px rgba(239, 68, 68, 0.2)'
        }}>
          {error}
        </div>
      )}
      
      {success && (
        <div style={{
          backgroundColor: 'rgba(102, 252, 241, 0.15)',
          color: '#66FCF1',
          padding: '1rem',
          borderRadius: '8px',
          marginBottom: '1.5rem',
          border: '1px solid #66FCF1',
          fontSize: '1rem',
          textAlign: 'center',
          boxShadow: '0 4px 8px rgba(102, 252, 241, 0.2)'
        }}>
          {success}
        </div>
      )}
      
      <form onSubmit={handleSubmit} style={{ 
        display: 'grid', 
        gridTemplateAreas: `
          "id name category"
          "price price quantity"
          "button button button"
        `,
        gap: '1.5rem', 
        width: '100%', 
        maxWidth: '1000px',
        margin: '0 auto'
      }}>
        <div style={{ gridArea: 'id' }}>
          <label htmlFor="id" style={{ 
            display: 'block', 
            color: '#66FCF1', 
            marginBottom: '0.5rem',
            fontSize: '1rem'
          }}>
            Sweet ID
          </label>
          <input
            type="number"
            id="id"
            name="id"
            min="1"
            value={formData.id}
            onChange={handleChange}
            style={{
              width: '100%',
              padding: '0.8rem',
              backgroundColor: '#0B0C10',
              border: '1px solid #66FCF1',
              borderRadius: '12px',
              color: 'white',
              fontSize: '1rem',
              outline: 'none'
            }}
            data-testid="sweet-id-input"
          />
        </div>
        
        <div style={{ gridArea: 'name' }}>
          <label htmlFor="name" style={{ 
            display: 'block', 
            color: '#66FCF1', 
            marginBottom: '0.5rem',
            fontSize: '1rem'
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
              padding: '0.8rem',
              backgroundColor: '#0B0C10',
              border: '1px solid #66FCF1',
              borderRadius: '12px',
              color: 'white',
              fontSize: '1rem',
              outline: 'none'
            }}
            data-testid="sweet-name-input"
          />
        </div>
        
        <div style={{ gridArea: 'category' }}>
          <label htmlFor="category" style={{ 
            display: 'block', 
            color: '#66FCF1', 
            marginBottom: '0.5rem',
            fontSize: '1rem'
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
              padding: '0.8rem',
              backgroundColor: '#0B0C10',
              border: '1px solid #66FCF1',
              borderRadius: '12px',
              color: 'white',
              fontSize: '1rem',
              outline: 'none'
            }}
            data-testid="sweet-category-input"
          />
        </div>
        
        <div style={{ gridArea: 'price', justifySelf: 'center', width: '50%' }}>
          <label htmlFor="price" style={{ 
            display: 'block', 
            color: '#66FCF1', 
            marginBottom: '0.5rem',
            fontSize: '1rem',
            textAlign: 'center'
          }}>
            Price (₹)
          </label>
          <input
            type="number"
            id="price"
            name="price"
            min="1"
            value={formData.price}
            onChange={handleChange}
            style={{
              width: '100%',
              padding: '0.8rem',
              backgroundColor: '#0B0C10',
              border: '1px solid #66FCF1',
              borderRadius: '12px',
              color: 'white',
              fontSize: '1rem',
              outline: 'none',
              textAlign: 'center'
            }}
            data-testid="sweet-price-input"
          />
        </div>
        
        <div style={{ gridArea: 'quantity', justifySelf: 'center', width: '50%' }}>
          <label htmlFor="quantity" style={{ 
            display: 'block', 
            color: '#66FCF1', 
            marginBottom: '0.5rem',
            fontSize: '1rem',
            textAlign: 'center'
          }}>
            Quantity (pcs)
          </label>
          <input
            type="number"
            id="quantity"
            name="quantity"
            min="1"
            value={formData.quantity}
            onChange={handleChange}
            style={{
              width: '100%',
              padding: '0.8rem',
              backgroundColor: '#0B0C10',
              border: '1px solid #66FCF1',
              borderRadius: '12px',
              color: 'white',
              fontSize: '1rem',
              outline: 'none',
              textAlign: 'center'
            }}
            data-testid="sweet-quantity-input"
          />
        </div>
        
        <button
          type="submit"
          style={{
            width: '60%',
            padding: '1rem',
            background: 'linear-gradient(135deg, #66FCF1 0%, #45A29E 100%)',
            color: '#0B0C10',
            fontWeight: 'bold',
            borderRadius: '12px',
            marginTop: '1.5rem',
            fontSize: '1.1rem',
            cursor: 'pointer',
            border: 'none',
            gridColumn: '1 / -1',
            justifySelf: 'center',
            boxShadow: '0 4px 16px rgba(102, 252, 241, 0.3)',
            transition: 'all 0.3s ease',
            textTransform: 'uppercase',
            letterSpacing: '1px'
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.transform = 'translateY(-2px)';
            e.currentTarget.style.boxShadow = '0 6px 20px rgba(102, 252, 241, 0.5)';
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = '0 4px 16px rgba(102, 252, 241, 0.3)';
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
