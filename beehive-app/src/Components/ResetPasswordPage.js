import React, { useState } from 'react';
import { Container, Typography, TextField, Button, Grid } from '@mui/material';
import { updatePassword } from '../Service';

const ResetPassword = () => {
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errorText, setErrorText] = useState('');

    const handleResetPassword = async () => {
        // Add logic to handle password reset here
        console.log('New Password:', newPassword);
        console.log('Reset Token:', window.location.pathname.split('/').pop());

        // Check that the passwords match
        if (newPassword !== confirmPassword) {
            setErrorText('Passwords do not match');
            return;
        }

        // You can add API calls here to send the new password and token to the server
        const response = await updatePassword(newPassword, window.location.pathname.split('/').pop());

        // Redirect to the confirmation page or show error
        if (response.ok) {
            window.location.href = '/resetpasswordconfirmation';
        } else {
            setErrorText('An error occurred while resetting the password.');
        }
    };

    return (
        <Container maxWidth="sm" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
            <Typography variant="h4" align="center" gutterBottom style={{ color: 'hotpink' }}>
                Reset Your Password
            </Typography>
            {errorText && (
                <Typography variant="body1" align="center" style={{ color: 'red', marginBottom: 10 }}>
                    {errorText}
                </Typography>
            )}
            <Grid container spacing={2} style={{ width: '100%' }}>
                <Grid item xs={12}>
                    <TextField
                        fullWidth
                        label="New Password"
                        type="password"
                        variant="outlined"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        fullWidth
                        label="Confirm Password"
                        type="password"
                        variant="outlined"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                </Grid>
                <Grid item xs={12}>
                    <Button
                        variant="contained"
                        color="primary"
                        fullWidth
                        onClick={handleResetPassword}
                        style={{ backgroundColor: '#e5bcff', color: 'black' }}
                    >
                        Reset Password
                    </Button>
                </Grid>
            </Grid>
        </Container>
    );
};

export default ResetPassword;
