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
      backgroundColor: '#121824',
      border: 'none',
      borderRadius: '16px',
      padding: '2rem',
      marginBottom: '1.5rem',
      width: '100%',
      boxShadow: '0 8px 20px rgba(102, 252, 241, 0.1)'
    }}>
      <div style={{ 
        backgroundColor: '#66FCF1',
        padding: '0.8rem 2rem',
        borderRadius: '12px',
        width: 'fit-content',
        margin: '0 auto 2rem auto'
      }}>
        <h2 style={{ 
          color: '#0B0C10', 
          fontSize: '1.5rem', 
          fontWeight: 'bold',
          textAlign: 'center',
          margin: 0
        }}>
          Add New Sweet
        </h2>
      </div>
      
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
        gridTemplateColumns: 'repeat(3, 1fr)',
        gridTemplateAreas: `
          "id name category"
          "price price quantity"
          "button button button"
        `,
        gap: '2rem', 
        width: '100%', 
        maxWidth: '1000px',
        margin: '0 auto'
      }}>
        <div style={{ gridArea: 'id' }}>
          <label htmlFor="id" style={{ 
            display: 'block', 
            color: '#66FCF1', 
            marginBottom: '0.5rem',
            fontSize: '1rem',
            textAlign: 'center',
            fontWeight: 'bold'
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
              outline: 'none',
              textAlign: 'center'
            }}
            data-testid="sweet-id-input"
          />
        </div>
        
        <div style={{ gridArea: 'name' }}>
          <label htmlFor="name" style={{ 
            display: 'block', 
            color: '#66FCF1', 
            marginBottom: '0.5rem',
            fontSize: '1rem',
            textAlign: 'center',
            fontWeight: 'bold'
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
              outline: 'none',
              textAlign: 'center'
            }}
            data-testid="sweet-name-input"
          />
        </div>
        
        <div style={{ gridArea: 'category' }}>
          <label htmlFor="category" style={{ 
            display: 'block', 
            color: '#66FCF1', 
            marginBottom: '0.5rem',
            fontSize: '1rem',
            textAlign: 'center',
            fontWeight: 'bold'
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
              outline: 'none',
              textAlign: 'center'
            }}
            data-testid="sweet-category-input"
          />
        </div>
        
        <div style={{ gridArea: 'price' }}>
          <label htmlFor="price" style={{ 
            display: 'block', 
            color: '#66FCF1', 
            marginBottom: '0.5rem',
            fontSize: '1rem',
            textAlign: 'center',
            fontWeight: 'bold',
            marginRight: '30%',
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
              width: '30%',
              padding: '0.8rem',
              marginLeft: '20%',
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
        
        <div style={{ gridArea: 'quantity' }}>
          <label htmlFor="quantity" style={{ 
            display: 'block', 
            color: '#66FCF1', 
            marginBottom: '0.55rem',
            fontSize: '1rem',
            textAlign: 'center',
            marginLeft: '10%',
            width: '40%',
            fontWeight: 'bold'
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
              width: '30%',
              padding: '0.8rem',
              width: '60%',
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
            width: '180px',
            padding: '0.8rem',
            background: '#66FCF1',
            color: '#0B0C10',
            fontWeight: 'bold',
            borderRadius: '12px',
            marginTop: '3rem',
            fontSize: '1rem',
            cursor: 'pointer',
            border: 'none',
            gridArea: 'button',
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
          ADD SWEET
        </button>
      </form>
    </div>
  );
}

export default AddSweetForm;
