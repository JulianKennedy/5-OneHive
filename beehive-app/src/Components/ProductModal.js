// Modal.js
import React from 'react';
import Button from '@mui/material/Button';

const Modal = ({ product, quantity, setQuantity, addToCart, closeModal }) => {
    return (
        <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            zIndex: 9999,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
        }}>
            <div style={{
                backgroundColor: '#fff',
                padding: '20px',
                borderRadius: '5px',
                width: '300px'
            }}>
                <h2>{product.Product_Name}</h2>
                <p>Price: ${product.Product_Price}</p>
                <label>Quantity: </label>
                <input
                    type="number"
                    value={quantity}
                    onChange={(e) => setQuantity(parseInt(e.target.value))}
                />
                <br />
                <div className="modal-buttons">
                    <button onClick={closeModal} className="close-btn">Close</button>
                    <button onClick={addToCart} className="close-btn">Add to Cart</button>
                </div>
            </div>
        </div>
    );
};

export default Modal;
