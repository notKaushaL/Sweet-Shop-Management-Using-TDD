import React from 'react';

/**
 *        <h3 style={{ 
          background: 'linear-gradient(to right, #66FCF1, #45A29E)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          fontSize: '1.5rem', 
          fontWeight: 'bold',
          marginBottom: '0.5rem',
          letterSpacing: '0.5px'
        }}>
          {sweet.name}
        </h3>nt for displaying a single sweet as a card
 */
function SweetCard({ sweet, onPurchase, onRestock, onDelete }) {
  const handlePurchase = () => {
    const quantity = prompt(`How many ${sweet.name} would you like to purchase?`);
    if (quantity && !isNaN(Number(quantity))) {
      onPurchase(sweet.id, Number(quantity));
    }
  };

  const handleRestock = () => {
    const quantity = prompt(`How many ${sweet.name} would you like to restock?`);
    if (quantity && !isNaN(Number(quantity))) {
      onRestock(sweet.id, Number(quantity));
    }
  };

  return (
    <div 
      className="glass-hover"
      style={{
        backgroundColor: '#0D1117',
        border: 'none',
        borderRadius: '12px',
        padding: '1rem',
        display: 'flex',
        flexDirection: 'column',
        boxShadow: '0 4px 12px rgba(102, 252, 241, 0.15)',
        width: '90%',
        minWidth: '95%',
        height: '100%',
        justifyContent: 'space-between'
      }}>
      <div style={{ marginBottom: '0.5rem' }}>
        <h3 style={{ 
          color: '#66FCF1', 
          fontSize: '1.6rem', 
          fontWeight: 'bold',
          marginBottom: '0.4rem',
          backgroundColor: 'linear-gradient(to right, #66FCF1, #45A29E)', 
        }}>
          {sweet.name}
        </h3>
        <div style={{ color: '#C5C6C7', marginBottom: '0.5rem', fontSize: '0.85rem' }}>
          <span style={{ fontWeight: 'bold' }}>ID :</span>   {sweet.id}
        </div>
        <div style={{ 
          color: '#C5C6C7', 
          marginBottom: '0.75rem',
          display: 'flex',
          alignItems: 'center',
          fontSize: '0.9rem'
        }}>
          <span style={{ fontWeight: 'bold', marginRight: '0.25rem' }}>Category:</span> 
          <span style={{
            background: 'linear-gradient(135deg, #66FCF1 0%, #45A29E 100%)',
            color: '#0B0C10',
            padding: '0.3rem 0.8rem',
            borderRadius: '20px',
            fontSize: '0.9rem',
            fontWeight: 'bold',
            letterSpacing: '0.5px'
          }}>
            {sweet.category}
          </span>
        </div>
        <div style={{ 
          color: '#C5C6C7', 
          marginBottom: '0.5rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          fontSize: '0.9rem'
        }}>
          <span style={{ fontWeight: 'bold' }}>Price:</span>
          <span style={{
            backgroundColor: '#000000',
            color: '#D4AF37',
            padding: '0.25rem 0.6rem',
            borderRadius: '4px',
            fontSize: '1.1rem',
            fontWeight: 'bold',
            border: '1px solid #D4AF37'
          }}>
            ₹{sweet.price}
          </span>
        </div>
        <div style={{ 
          color: sweet.quantity > 10 ? '#4CAF50' : sweet.quantity > 0 ? '#FFC107' : '#F44336',
          marginBottom: '0.5rem',
          fontWeight: 'bold',
          fontSize: '0.95rem'
        }}>
          <span style={{ color: '#C5C6C7' }}>Stock:</span> {sweet.quantity} pcs
        </div>
      </div>
      
      <div style={{ 
        marginTop: '0.9rem', 
        display: 'flex',
        justifyContent: 'space-between',
        gap: '0.75rem'
      }}>
        <button
          className="button-hover"
          onClick={handlePurchase}
          style={{
            background: 'linear-gradient(135deg, #66FCF1 0%, #45A29E 100%)',
            color: '#0B0C10',
            border: 'none',
            padding: '0.7rem',
            borderRadius: '8px',
            fontWeight: 'bold',
            cursor: 'pointer',
            fontSize: '0.85rem',
            flex: '1',
            boxShadow: '0 2px 8px rgba(102, 252, 241, 0.2)',
            transition: 'all 0.3s ease'
          }}
          disabled={sweet.quantity <= 0}
        >
          Buy
        </button>
        <button
          className="button-hover"
          onClick={handleRestock}
          style={{
            background: 'linear-gradient(135deg, #45A29E 0%, #2d6c6a 100%)',
            color: 'white',
            border: 'none',
            padding: '0.7rem',
            borderRadius: '8px',
            fontWeight: 'bold',
            cursor: 'pointer',
            fontSize: '0.85rem',
            flex: '1',
            boxShadow: '0 2px 8px rgba(69, 162, 158, 0.2)',
            transition: 'all 0.3s ease'
          }}
        >
          Restock
        </button>
        <button
          className="button-hover"
          onClick={() => onDelete(sweet.id)}
          style={{
            background: 'linear-gradient(135deg, #F44336 0%, #d32f2f 100%)',
            color: 'white',
            border: 'none',
            padding: '0.7rem',
            borderRadius: '8px',
            fontWeight: 'bold',
            cursor: 'pointer',
            fontSize: '0.85rem',
            flex: '1',
            boxShadow: '0 2px 8px rgba(244, 67, 54, 0.2)',
            transition: 'all 0.3s ease'
          }}
        >
          Delete
        </button>
      </div>
    </div>
  );
}

export default SweetCard;
