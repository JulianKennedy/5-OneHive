// ForgotPasswordPage.js

import React, { useState } from 'react';
import { TextField, Button, Typography, Link, Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { resetPassword } from '../Service';
import { Password } from '@mui/icons-material';
import PasswordResetConfirmationPage from './PasswordResetConfirmationPage';
import { useNavigate } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 2,
    minHeight: '100vh',
    padding: theme.spacing(4),
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const ForgotPasswordPage = () => {
  const classes = useStyles();
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const navigate = useNavigate();


  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await resetPassword(email);

      console.log('Response:', response)

      if (response.ok) {
        // Email found in the database, navigate to confirmation page
        navigate(`/passwordresetemail?email=${encodeURIComponent(email)}`);
      } else {
        // Email not found in the database, display error message
        setMessage('Email not found');
      }
    } catch (error) {
      setMessage('An error occurred while sending the reset email.');
      console.error('Error sending reset email:', error);
    }
  };

  return (
    <Grid container justify="center" alignItems="center" className={classes.root}>
      <Grid item xs={12} sm={8} md={6} lg={4}>
        <Typography variant="h4" align="center" gutterBottom style={{ color: 'hotpink' }}>
          Forgot Password
        </Typography>
        <Typography variant="body1" align="center" style={{ color: 'hotpink'}}>
          Enter your email address to receive a password reset link.
        </Typography>
        {message && (
          <Typography variant="body1" align="center" color="error" style={{marginTop: 16, fontWeight: 'bold' }}>
            {message}
          </Typography>
        )}
        <form className={classes.form} onSubmit={handleSubmit}>
          <TextField
            variant="outlined"
            margin="normal"
            type="email"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            value={email}
            onChange={handleEmailChange}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            style={{ background: '#e5bcff', color: 'black' }}
            className={classes.submit}
          >
            Send Reset Email
          </Button>
        </form>
        <Typography variant="body1" align="center">
          <Link href="/login" style={{ color: 'hotpink' }}>
            Back to Login
          </Link>
        </Typography>
      </Grid>
    </Grid>
  );
};

export default ForgotPasswordPage;
