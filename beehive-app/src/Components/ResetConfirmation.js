import React from 'react';
import { Container, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom'; // Assuming you are using React Router

const ResetConfirmation = () => {
    return (
        <Container maxWidth="sm" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
            <Typography variant="h4" align="center" gutterBottom style={{ color: 'black' }}>
                Password Updated Successfully
            </Typography>
            <Typography variant="body1" align="center" gutterBottom style={{ color: 'black' }}>
                Your password has been successfully updated.
            </Typography>
            <Button
                variant="contained"
                color="primary"
                component={Link}
                to="/login"
                fullWidth
                style={{ backgroundColor: '#e5bcff', color: 'black', marginTop: '20px' }}
            >
                Go to Login
            </Button>
        </Container>
    );
};

export default ResetConfirmation;
