// src/ResetPassword.js
import React, { useState } from 'react';
import { Container, Typography, TextField, Button, Grid } from '@mui/material';
import { updatePassword } from '../Service';

const ResetPassword = () => {
    const [newPassword, setNewPassword] = useState('');

    const handleResetPassword = async () => {
        // Add logic to handle password reset here
        console.log('New Password:', newPassword);
        console.log('Reset Token:', window.location.pathname.split('/').pop());
        // You can add API calls here to send the new password and token to the server
        await updatePassword(newPassword, window.location.pathname.split('/').pop());

        // After the password is reset, you can redirect the user to the login page
        // window.location.href = '/login';
    };

    return (
        <Container maxWidth="sm">
            <Typography variant="h4" align="center" gutterBottom>
                Reset Your Password
            </Typography>
            <Grid container spacing={2}>
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
                    <Button
                        variant="contained"
                        color="primary"
                        fullWidth
                        onClick={handleResetPassword}
                    >
                        Reset Password
                    </Button>
                </Grid>
            </Grid>
        </Container>
    );
};

export default ResetPassword;
