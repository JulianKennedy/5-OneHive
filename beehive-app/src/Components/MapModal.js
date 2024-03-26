import React from 'react';

const MapModal = ({ onClose, owner, email }) => {
  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close" onClick={onClose}>&times;</span>
        <h2>Contact Information</h2>
        <p>Owner: {owner}</p>
        <p>Email: {email}</p>
      </div>
    </div>
  );
};

export default MapModal;