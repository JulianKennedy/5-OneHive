import React, { useState, useEffect } from 'react';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import OrderDetailsModal from './OrderDetailsModal';
import Header from './Header';
import { Footer } from './Footer';
import MemberHeader from './MemberHeader';

const OrderHistoryPage = () => {
  const [orders, setOrders] = useState([]);
  const [orderModal, setOrderModal] = useState(null);

  useEffect(() => {
    // Fetch orders from an API or local storage
    const fetchedOrders = [
      {
        id: 1,
        date: '2021-10-01',
        total: 100,
        status: 'Pending',
      },
      {
        id: 2,
        date: '2021-10-05',
        total: 150,
        status: 'Shipped',
      },
      {
        id: 3,
        date: '2021-10-10',
        total: 200,
        status: 'Delivered',
      },
    ];
    setOrders(fetchedOrders);
  }, []);

  const handleViewDetails = (orderId) => {
    // Placeholder for handling view details
    // Redirect to order details page or modal
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Pending':
        return '#f3a804'; // Yellow
      case 'Processing':
        return '#0275d8'; // Blue
      case 'Shipped':
        return '#28a745'; // Green
      case 'Delivered':
        return '#198754'; // Dark Green
      case 'Cancelled':
        return '#dc3545'; // Red
      default:
        return '#6c757d'; // Gray
    }
  };

  return (
    <div style={{ marginTop: '100px' }} id="orderhist">
        <MemberHeader />
    <Grid container spacing={4} justifyContent="center" alignItems="center" style={{ height: '100vh' }}>
      <Grid item xs={12}>
        <Typography variant="h4" gutterBottom align="center">Order History</Typography>
      </Grid>
      <Grid item xs={10}>
        {orders.map((order, index) => (
          <Paper key={index} elevation={3} style={{ padding: '20px', marginBottom: '20px' }}>
            <Typography variant="h5" gutterBottom>Order #{index + 1}</Typography>
            <Typography variant="body1">Order Date: {order.date}</Typography>
            <Typography variant="body1">Total: ${order.total}</Typography>
            <Typography variant="body1" style={{ color: getStatusColor(order.status) }}>Status: {order.status}</Typography>
            {/* Add more order details */}
            <Button variant="outlined" color="primary" onClick={() => setOrderModal(true)}>View Details</Button>
            <OrderDetailsModal order={order}/>
          </Paper>
        ))}
      </Grid>
    </Grid>
    <Footer />
    </div>
  );
};

export default OrderHistoryPage;
