import React, { useRef, useEffect, useState } from 'react';
import { Button, Modal, Typography, TextField, Box, Grid } from '@mui/material'; // Added Grid component for layout
import useLocalStorage from './useLocalStorage'; // Import the useLocalStorage hook

const ProductModal = ({ product, quantity, setQuantity, closeModal }) => {
    const modalRef = useRef();
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
        <Modal open={true} onClose={close}>
            <div style={{
                backgroundColor: '#fff',
                padding: '20px',
                borderRadius: '5px',
                width: '300px',
                margin: 'auto',
                marginTop: '100px'
            }} ref={modalRef}>
                <img src={imageUrl} alt="Product" style={{ maxWidth: '100%', height: 'auto' }} />
                <Typography variant="h5">{product.Product_Name}</Typography>
                <Typography variant="body1">Price: ${totalPrice}</Typography>
                <Grid container spacing={2} alignItems="center" marginBottom="10px">
                    <Grid item><Typography variant="body1">Quantity:</Typography></Grid>
                    <Grid item>
                        <TextField
                            type="number"
                            value={quantity}
                            onChange={(e) => setQuantity(parseInt(e.target.value))}
                            inputProps={{ min: 1 }}
                        />
                    </Grid>
                </Grid>
                <div style={{ marginTop: '20px' }}>
                    <Button variant="outlined" style={{ color: '#e5e5', borderColor: '#e5e5' }} onClick={close}>Close</Button>
                    <Button variant="contained" onClick={() => addToCart(product, quantity)} style={{ marginLeft: '10px', backgroundColor: '#e5e5' }}>Add to Cart</Button>
                </div>
            </div>
        </Modal>
    );
};

export default ProductModal;
