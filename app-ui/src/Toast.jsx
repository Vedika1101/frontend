import React from 'react';

const Toast = ({ message, type, onClose }) => {
  return (
    <div 
      className={`toast ${type}`} 
      style={{
        position: 'fixed',
        bottom: '20px',
        right: '20px',
        backgroundColor: type === 'success' ? 'green' : 'red',
        color: 'white',
        padding: '10px',
        borderRadius: '5px',
        transition: 'opacity 0.5s ease',
      }}
    >
      {message}
      <button 
        onClick={onClose} 
        style={{
          marginLeft: '10px',
          background: 'none',
          border: 'none',
          color: 'white',
          cursor: 'pointer',
        }}
      >
        ✖
      </button>
    </div>
  );
};

export default Toast;
