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
    <div style={{
      backgroundColor: '#1A1A1A',
      border: '1px solid #D4AF37',
      borderRadius: '8px',
      padding: '1.5rem',
      display: 'flex',
      flexDirection: 'column',
      height: '100%'
    }}>
      <div style={{ marginBottom: '1rem' }}>
        <h3 style={{ 
          color: '#D4AF37', 
          fontSize: '1.25rem', 
          fontWeight: 'bold',
          marginBottom: '0.5rem' 
        }}>
          {sweet.name}
        </h3>
        <div style={{ color: '#F0E68C', marginBottom: '0.25rem' }}>
          <span style={{ fontWeight: 'bold' }}>ID:</span> {sweet.id}
        </div>
        <div style={{ 
          color: '#F0E68C', 
          marginBottom: '0.25rem',
          display: 'flex',
          alignItems: 'center'
        }}>
          <span style={{ fontWeight: 'bold', marginRight: '0.25rem' }}>Category:</span> 
          <span style={{
            backgroundColor: '#D4AF37',
            color: 'black',
            padding: '0.15rem 0.5rem',
            borderRadius: '4px',
            fontSize: '0.8rem',
            fontWeight: 'bold'
          }}>
            {sweet.category}
          </span>
        </div>
        <div style={{ 
          color: '#F0E68C', 
          marginBottom: '0.25rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          <span style={{ fontWeight: 'bold' }}>Price:</span>
          <span style={{
            backgroundColor: '#000000',
            color: '#D4AF37',
            padding: '0.15rem 0.5rem',
            borderRadius: '4px',
            fontSize: '1rem',
            fontWeight: 'bold',
            border: '1px solid #D4AF37'
          }}>
            ₹{sweet.price}
          </span>
        </div>
        <div style={{ 
          color: sweet.quantity > 10 ? '#4CAF50' : sweet.quantity > 0 ? '#FFC107' : '#F44336',
          marginBottom: '0.5rem',
          fontWeight: 'bold'
        }}>
          <span style={{ color: '#F0E68C' }}>Stock:</span> {sweet.quantity} pcs
        </div>
      </div>
      
      <div style={{ 
        marginTop: 'auto', 
        display: 'flex',
        justifyContent: 'space-between',
        gap: '0.5rem'
      }}>
        <button
          onClick={handlePurchase}
          style={{
            backgroundColor: '#D4AF37',
            color: '#000000',
            border: 'none',
            padding: '0.5rem',
            borderRadius: '4px',
            fontWeight: 'bold',
            cursor: 'pointer',
            flex: '1'
          }}
          disabled={sweet.quantity <= 0}
        >
          Buy
        </button>
        <button
          onClick={handleRestock}
          style={{
            backgroundColor: '#4CAF50',
            color: 'white',
            border: 'none',
            padding: '0.5rem',
            borderRadius: '4px',
            fontWeight: 'bold',
            cursor: 'pointer',
            flex: '1'
          }}
        >
          Restock
        </button>
        <button
          onClick={() => onDelete(sweet.id)}
          style={{
            backgroundColor: '#F44336',
            color: 'white',
            border: 'none',
            padding: '0.5rem',
            borderRadius: '4px',
            fontWeight: 'bold',
            cursor: 'pointer',
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
