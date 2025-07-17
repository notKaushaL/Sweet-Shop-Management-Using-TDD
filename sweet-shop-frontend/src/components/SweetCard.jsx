import React from 'react';

/**
 * Component for displaying a single sweet as a card
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
        backgroundColor: '#1A1A1A',
        border: '1px solid #D4AF37',
        borderRadius: '8px',
        padding: '0.75rem',
        display: 'flex',
        flexDirection: 'column',
        width: '90%',
        minWidth: '95%',
        height: '100%',
        justifyContent: 'space-between'
      }}>
      <div style={{ marginBottom: '0.5rem' }}>
        <h3 style={{ 
          color: '#D4AF37', 
          fontSize: '1.4rem', 
          fontWeight: 'bold',
          marginBottom: '0.4rem' 
        }}>
          {sweet.name}
        </h3>
        <div style={{ color: '#F0E68C', marginBottom: '0.5rem', fontSize: '0.85rem' }}>
          <span style={{ fontWeight: 'bold' }}>ID :</span>   {sweet.id}
        </div>
        <div style={{ 
          color: '#F0E68C', 
          marginBottom: '0.75rem',
          display: 'flex',
          alignItems: 'center',
          fontSize: '0.9rem'
        }}>
          <span style={{ fontWeight: 'bold', marginRight: '0.25rem' }}>Category:</span> 
          <span style={{
            backgroundColor: '#D4AF37',
            color: 'black',
            padding: '0.3rem 0.6rem',
            borderRadius: '4px',
            fontSize: '0.9rem',
            fontWeight: 'bold'
          }}>
            {sweet.category}
          </span>
        </div>
        <div style={{ 
          color: '#F0E68C', 
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
          <span style={{ color: '#F0E68C' }}>Stock:</span> {sweet.quantity} pcs
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
            backgroundColor: '#D4AF37',
            color: '#000000',
            border: 'none',
            padding: '0.6rem',
            borderRadius: '4px',
            fontWeight: 'bold',
            cursor: 'pointer',
            fontSize: '0.85rem',
            flex: '1'
          }}
          disabled={sweet.quantity <= 0}
        >
          Buy
        </button>
        <button
          className="button-hover"
          onClick={handleRestock}
          style={{
            backgroundColor: '#4CAF50',
            color: 'white',
            border: 'none',
            padding: '0.6rem',
            borderRadius: '4px',
            fontWeight: 'bold',
            cursor: 'pointer',
            fontSize: '0.85rem',
            flex: '1'
          }}
        >
          Restock
        </button>
        <button
          className="button-hover"
          onClick={() => onDelete(sweet.id)}
          style={{
            backgroundColor: '#F44336',
            color: 'white',
            border: 'none',
            padding: '0.6rem',
            borderRadius: '4px',
            fontWeight: 'bold',
            cursor: 'pointer',
            fontSize: '0.85rem',
            flex: '1'
          }}
        >
          Delete
        </button>
      </div>
    </div>
  );
}

export default SweetCard;
