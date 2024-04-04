import React from 'react';
import { makeStyles } from '@mui/styles';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

const useStyles = makeStyles({
  root: {
    textAlign: 'center',
    padding: '50px',
  },
  confirmationMessage: {
    marginBottom: '20px',
  },
});

const PaymentConfirmationPage = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
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
  );
};

export default PaymentConfirmationPage;
