import React, { useRef, useEffect } from 'react';
import { Button, Modal, Typography, TextField, Box, Grid } from '@mui/material'; // Import the necessary components
import useLocalStorage from './useLocalStorage'; // Import the useLocalStorage hook

const ProductModal = ({ product, quantity, setQuantity, closeModal }) => {
    const modalRef = useRef();
    const [cartItemsCount, setCartItemsCount] = useLocalStorage('cartItems', 0);

    const bufferToBase64 = (buffer) => {
        const binary = Buffer.from(buffer).toString('base64');
        return `data:image/jpeg;base64,${binary}`;
    };

    const imageUrl = bufferToBase64(product.Product_Image.data);

    const totalPrice = product.Product_Price * quantity;

    const close = () => {
        closeModal();
        setQuantity(1);
    };

    const handleClickOutside = (event) => {
        if (modalRef.current && !modalRef.current.contains(event.target)) {
            close();
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const addToCart = (item, quantity) => {
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        const existingItemIndex = cart.findIndex(cartItem => cartItem.Product_ID === item.Product_ID);

        if (existingItemIndex !== -1) {
            cart[existingItemIndex].quantity += quantity;
        } else {
            cart.push({ ...item, quantity });
        }

        localStorage.setItem('cart', JSON.stringify(cart));

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
                marginTop: '100px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
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
                <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                    <Button variant="contained" sx={{ backgroundColor: '#FF69B4', color: '#fff' }} onClick={close}>Close</Button>
                    <Button variant="contained" sx={{ backgroundColor: '#FF69B4', color: '#fff' }} onClick={() => addToCart(product, quantity)}>Add to Cart</Button>
                </Box>
            </div>
        </Modal>
    );
};

export default ProductModal;
