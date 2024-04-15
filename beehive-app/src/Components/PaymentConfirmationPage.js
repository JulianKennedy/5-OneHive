import React from 'react';
import { makeStyles } from '@mui/styles';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Header from './Header'; // Import your Header component
import { Footer } from './Footer'; // Import your Footer component
import MemberHeader from './MemberHeader';

const useStyles = makeStyles({
  root: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
  },
  content: {
    flex: '1',
    textAlign: 'center',
    padding: '50px',
    display: 'flex', // Use flexbox for content centering
    flexDirection: 'column', // Arrange items in a column
    justifyContent: 'center', // Center vertically
    alignItems: 'center', // Center horizontally
    marginTop: '150px', // Adjust the marginTop for vertical spacing
  },
  confirmationMessage: {
    marginBottom: '20px',
    marginTop: '20px',
  },
});

const PaymentConfirmationPage = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <MemberHeader /> {/* Include your Header component */}
      <div className={classes.content}>
        <Typography variant="h4" className={classes.confirmationMessage}>
          Thank you for your purchase!
        </Typography>
        <Typography variant="body1">
          Your payment was successfully processed.
        </Typography>
        {/* Display order summary or any other relevant information */}
        <Button variant="contained" color="primary" href="/orderhistory">
          View Order History
        </Button>
      </div>
      <Footer /> {/* Include your Footer component */}
    </div>
  );
};

export default PaymentConfirmationPage;
