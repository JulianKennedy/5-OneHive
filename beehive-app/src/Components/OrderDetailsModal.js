import React, { useState } from 'react';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';

const OrderDetailsModal = ({ isOpen, handleClose, order }) => {
  return (
    <Modal
      open={isOpen}
      onClose={handleClose}
      aria-labelledby="order-details-modal"
      aria-describedby="order-details"
    >
      <Paper style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', padding: '20px' }}>
        <Typography variant="h5" gutterBottom>Order Details</Typography>
        <Typography variant="body1">Order ID: {order.id}</Typography>
        <Typography variant="body1">Order Date: {order.date}</Typography>
        <Typography variant="body1">Total: ${order.total}</Typography>
        <Typography variant="body1">Status: {order.status}</Typography>
        {/* Add more order details here */}
        <Button variant="contained" onClick={handleClose}>Close</Button>
      </Paper>
    </Modal>
  );
};

export default OrderDetailsModal;
