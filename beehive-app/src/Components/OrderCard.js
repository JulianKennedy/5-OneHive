import React, { useState } from 'react';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import OrderDetailsModal from './OrderDetailsModal'; // Assuming you have created the modal component

const OrderCard = ({ order }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div>
      <Typography variant="h6" gutterBottom>Order ID: {order.id}</Typography>
      <Typography variant="body1">Order Date: {order.date}</Typography>
      <Typography variant="body1">Total: ${order.total}</Typography>
      <Typography variant="body1">Status: {order.status}</Typography>
      {/* Add more order details here */}
      <Button variant="outlined" onClick={handleOpenModal}>View Details</Button>
      <OrderDetailsModal isOpen={isModalOpen} handleClose={handleCloseModal} order={order} />
    </div>
  );
};

export default OrderCard;
