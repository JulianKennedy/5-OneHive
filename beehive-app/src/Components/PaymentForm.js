import React, { useState, useEffect } from 'react';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Divider from '@mui/material/Divider';
import TextField from '@mui/material/TextField';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import CircularProgress from '@mui/material/CircularProgress';

const TAX_RATE = 0.08; // Sample tax rate

const PaymentForm = () => {
    const stripe = useStripe();
    const elements = useElements();
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);

        if (!stripe || !elements) {
            return;
        }

        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card: elements.getElement(CardElement),
        });

        if (error) {
            console.error('[error]', error);
            setError(error.message);
            setLoading(false);
        } else {
            console.log('[PaymentMethod]', paymentMethod);
            // Send paymentMethod.id to your server to complete the payment
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <Box marginBottom="20px">
                <Typography variant="h6" gutterBottom>Enter Card Details</Typography>
                <CardElement
                    options={{
                        style: {
                            base: {
                                fontSize: '16px',
                                color: '#424770',
                                '::placeholder': {
                                    color: '#aab7c4',
                                },
                            },
                            invalid: {
                                color: '#9e2146',
                            },
                        },
                    }}
                />
            </Box>
            {error && <Typography variant="body2" color="error">{error}</Typography>}
            <Button type="submit" disabled={!stripe} variant="contained" color="secondary">
                {loading ? 'Processing...' : 'Pay Now'}
                {loading && <CircularProgress size={24} style={{ position: 'absolute' }} />}

            </Button>
        </form>
    );
};

const CheckoutPage = () => {
    const [cartItems, setCartItems] = useState([]);
    const [contactInfo, setContactInfo] = useState({
        fullName: '',
        email: '',
        phone: '',
    });
    const [shippingAddress, setShippingAddress] = useState({
        addressLine1: '',
        addressLine2: '',
        city: '',
        state: '',
        postalCode: '',
        country: '',
    });

    useEffect(() => {
        const storedCartItems = JSON.parse(localStorage.getItem('cart')) || [];
        setCartItems(storedCartItems);
    }, []);

    const handleBack = () => {
        window.location.href = '/cart';
    };

    const bufferToBase64 = (buffer) => {
        const binary = Buffer.from(buffer).toString('base64');
        return `data:image/jpeg;base64,${binary}`;
      };

    const subtotal = cartItems.reduce((total, item) => total + (item.Product_Price * item.quantity), 0);
    const tax = subtotal * TAX_RATE;
    const shipping = 10; // Sample shipping cost
    const total = subtotal + tax + shipping;

    return (
        <Grid container spacing={1} justifyContent="center" alignItems="center" style={{ height: '100vh' }}>
            <Grid item xs={12}>
                <IconButton onClick={handleBack} style={{ position: 'absolute', top: '20px', left: '20px' }}>
                    <ArrowBackIcon />
                </IconButton>
            </Grid>
            <Grid item xs={10}>
                <Typography variant="h4" gutterBottom align="center">Checkout</Typography>
                <Paper elevation={3} style={{ padding: '20px', marginBottom: '50px' }}>
                    <Typography variant="h5" gutterBottom>Order Summary</Typography>
                    {cartItems.map((item, index) => (
                        <Box key={item.Product_ID} display="flex" alignItems="center" justifyContent="space-between" marginBottom="10px">
                            <Box display="flex" alignItems="center">
                                <img src={bufferToBase64(item.Product_Image.data)} alt={item.Product_Name} style={{ marginRight: '10px', width: '50px', height: '50px' }} />
                                <Typography>{item.Product_Name}</Typography>
                            </Box>
                            <Typography variant="subtitle2" color="textSecondary">
                                ${item.Product_Price.toFixed(2)} x {item.quantity} = ${(item.Product_Price * item.quantity).toFixed(2)}
                            </Typography>
                        </Box>
                    ))}
                    <Divider style={{ margin: '10px 0' }} />
                    <Box display="flex" justifyContent="space-between" alignItems="center" marginBottom="10px">
                        <Typography>Subtotal:</Typography>
                        <Typography>${subtotal.toFixed(2)}</Typography>
                    </Box>
                    <Box display="flex" justifyContent="space-between" alignItems="center" marginBottom="10px">
                        <Typography>Tax ({(TAX_RATE * 100).toFixed(2)}%):</Typography>
                        <Typography>${tax.toFixed(2)}</Typography>
                    </Box>
                    <Box display="flex" justifyContent="space-between" alignItems="center" marginBottom="10px">
                        <Typography>Shipping:</Typography>
                        <Typography>${shipping.toFixed(2)}</Typography>
                    </Box>
                    <Typography variant="h6" gutterBottom display="flex" justifyContent="space-between" alignItems="center">Total: <span style={{ color: '#ff80ab', fontSize: '1.5rem' }}>${total.toFixed(2)}</span></Typography>
                </Paper>
            </Grid>
            <Grid item xs={10}>
                <Paper elevation={3} style={{ padding: '20px', marginBottom: '50px' }}>
                    <Typography variant="h5" gutterBottom align="center">Shipping Information</Typography>
                    <Grid container spacing={2}>
                        <Grid item xs={6}>
                            <TextField
                                fullWidth
                                label="Full Name"
                                variant="outlined"
                                value={contactInfo.fullName}
                                onChange={(e) => setContactInfo({ ...contactInfo, fullName: e.target.value })}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                fullWidth
                                label="Email Address"
                                variant="outlined"
                                value={contactInfo.email}
                                onChange={(e) => setContactInfo({ ...contactInfo, email: e.target.value })}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                fullWidth
                                label="Phone Number"
                                variant="outlined"
                                value={contactInfo.phone}
                                onChange={(e) => setContactInfo({ ...contactInfo, phone: e.target.value })}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="Address Line 1"
                                variant="outlined"
                                value={shippingAddress.addressLine1}
                                onChange={(e) => setShippingAddress({ ...shippingAddress, addressLine1: e.target.value })}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="Address Line 2"
                                variant="outlined"
                                value={shippingAddress.addressLine2}
                                onChange={(e) => setShippingAddress({ ...shippingAddress, addressLine2: e.target.value })}
                            />
                        </Grid>
                        <Grid item xs={4}>
                            <TextField
                                fullWidth
                                label="City"
                                variant="outlined"
                                value={shippingAddress.city}
                                onChange={(e) => setShippingAddress({ ...shippingAddress, city: e.target.value })}
                            />
                        </Grid>
                        <Grid item xs={4}>
                            <TextField
                                fullWidth
                                label="State"
                                variant="outlined"
                                value={shippingAddress.state}
                                onChange={(e) => setShippingAddress({ ...shippingAddress, state: e.target.value })}
                            />
                        </Grid>
                        <Grid item xs={4}>
                            <TextField
                                fullWidth
                                label="Postal Code"
                                variant="outlined"
                                value={shippingAddress.postalCode}
                                onChange={(e) => setShippingAddress({ ...shippingAddress, postalCode: e.target.value })}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="Country"
                                variant="outlined"
                                value={shippingAddress.country}
                                onChange={(e) => setShippingAddress({ ...shippingAddress, country: e.target.value })}
                            />
                        </Grid>
                    </Grid>
                </Paper>
            </Grid>
            <Grid item xs={10}>
                <Paper elevation={3} style={{ padding: '20px', marginBottom: '50px' }}>
                    <Typography variant="h5" gutterBottom align="center">Payment Information</Typography>
                    <PaymentForm />
                </Paper>
            </Grid>
        </Grid>
    );
};

export default CheckoutPage;
