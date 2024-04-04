import React, { useState, useEffect } from 'react';
import { makeStyles } from '@mui/styles';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import PaymentForm from './PaymentForm';

const stripePromise = loadStripe('pk_test_51P1Tys02Nw0o3GwWNHIa8OPzDpkgAEjg0JBjVyA58D2ah8Jte1zjibQK6Z6i0owxTutaiuUSTaPseQgNOlol7qI0007DfEhecH');

const useStyles = makeStyles({
  page: {
    paddingTop: '100px',
  },
  container: {
    maxWidth: '800px',
    margin: '20px auto',
    fontSize: '18px',
    textAlign: 'center',
  },
  checkoutBtn: {
    backgroundColor: '#ff80ab',
    '&:hover': {
      backgroundColor: '#ff9bcd', // Lighter pink on hover
    },
  },
});

function CheckoutPage() {
  const classes = useStyles();
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    // Retrieve cart items from local storage or backend
    const storedCartItems = JSON.parse(localStorage.getItem('cart')) || [];
    setCartItems(storedCartItems);
  }, []);

  // Function to handle checkout
  const handleCheckout = () => {
    // Implement logic to process checkout (e.g., send payment data to payment API)
    // This will depend on the payment method API you are using
  };

  return (
    <div className={classes.page}>
      <div className={classes.container}>
        <Elements stripe={stripePromise}>
          <PaymentForm />
        </Elements>
      </div>
    </div>
  );
}

export default CheckoutPage;
