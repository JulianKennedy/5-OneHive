import React, { useRef, useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import useLocalStorage from './useLocalStorage'; // Import the useLocalStorage hook

const ProductModal = ({ product, quantity, setQuantity, closeModal }) => {
    const modalRef = useRef();
    const [cartItems, setCartItems] = useState(0);
    const [cartItemsCount, setCartItemsCount] = useLocalStorage('cartItems', 0); // Initialize cart items count from local storage

    const bufferToBase64 = (buffer) => {
        const binary = Buffer.from(buffer).toString('base64');
        return `data:image/jpeg;base64,${binary}`;
    };

    const imageUrl = bufferToBase64(product.Product_Image.data);

    // Calculate total price based on product price and quantity
    const totalPrice = product.Product_Price * quantity;

    const close = () => {
        closeModal();
        setQuantity(1);
    };

    // Close modal if clicked outside of modal content
    const handleClickOutside = (event) => {
        if (modalRef.current && !modalRef.current.contains(event.target)) {
            close();
        }
    };

    useEffect(() => {
        // Add event listener when component mounts
        document.addEventListener('mousedown', handleClickOutside);
        // Remove event listener when component unmounts
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    // Function to add an item to the cart
    const addToCart = (item, quantity) => {
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        const existingItemIndex = cart.findIndex(cartItem => cartItem.Product_ID === item.Product_ID);

        if (existingItemIndex !== -1) {
            // If the item already exists in the cart, update its quantity
            cart[existingItemIndex].quantity += quantity;
        } else {
            // If the item is not in the cart, add it
            cart.push({ ...item, quantity });
        }

        localStorage.setItem('cart', JSON.stringify(cart));

        // Update the cart items count in local storage
        const updatedCount = cartItemsCount + quantity;
        setCartItemsCount(updatedCount);

        close();
    };

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
            <div ref={modalRef} style={{
                backgroundColor: '#fff',
                padding: '20px',
                borderRadius: '5px',
                width: '300px'
            }}>
                <img src={imageUrl} alt="Product" style={{ maxWidth: '100%', height: 'auto' }} />
                <h2>{product.Product_Name}</h2>
                <p>Price: ${totalPrice}</p>
                <label>Quantity: </label>
                <input
                    type="number"
                    value={quantity}
                    min={1}
                    onChange={(e) => setQuantity(parseInt(e.target.value))}
                />
                <br />
                <div className="modal-buttons">
                    <button onClick={close} className="close-btn">Close</button>
                    {/* Assuming addToCart function is passed as a prop */}
                    <button onClick={() => addToCart(product, quantity)} className="close-btn">Add to Cart</button>
                </div>
            </div>
        </div>
    );
};

export default ProductModal;
