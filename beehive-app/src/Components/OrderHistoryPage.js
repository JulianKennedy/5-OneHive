import React, { useState, useEffect } from 'react';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import OrderDetailsModal from './OrderDetailsModal';
import Header from './Header';
import { Footer } from './Footer';
import MemberHeader from './MemberHeader';
import { jsPDF } from "jspdf";
import 'jspdf-autotable';

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
        items: [
          { name: 'Item 1', quantity: 2, price: 50 },
          { name: 'Item 2', quantity: 1, price: 50 },
        ],
      },
      {
        id: 2,
        date: '2021-10-05',
        total: 150,
        status: 'Shipped',
        items: [
          { name: 'Item 3', quantity: 1, price: 150 },
        ],
      },
      {
        id: 3,
        date: '2021-10-10',
        total: 200,
        status: 'Delivered',
        items: [
          { name: 'Item 4', quantity: 3, price: 50 },
          { name: 'Item 5', quantity: 2, price: 50 },
        ],
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

  const downloadInvoice = (order) => {
    // Create a new PDF document
    const doc = new jsPDF();
  
    // Set font styles
    doc.setFont("Helvetica", "normal");
  
    // Add header with color based on status
    let headerColor = '';
    switch (order.status) {
      case 'Pending':
        headerColor = '#f3a804'; // Yellow
        break;
      case 'Shipped':
        headerColor = '#28a745'; // Green
        break;
      case 'Delivered':
        headerColor = '#198754'; // Dark Green
        break;
      case 'Cancelled':
        headerColor = '#dc3545'; // Red
        break;
      default:
        headerColor = '#6c757d'; // Gray
    }
    doc.setFillColor(headerColor);
    doc.rect(0, 0, 210, 30, 'F'); // Header background
    doc.setTextColor('#ffffff'); // Header text color
    doc.setFontSize(22);
    doc.text(`Invoice for Order #${order.id}`, 105, 20, { align: "center" });
  
    // Add order details
    doc.setTextColor('#000000'); // Reset text color
    doc.setFontSize(12);
    doc.text(`Order Date: ${order.date}`, 15, 40);
    doc.text(`Total: $${order.total}`, 15, 50);
    doc.text(`Status: ${order.status}`, 15, 60);
  
    // Add customer details
    doc.text(`Customer Name: John Doe`, 15, 80); // Replace with actual customer name
    doc.text(`Email: johndoe@example.com`, 15, 90); // Replace with actual email
    doc.text(`Phone: +1234567890`, 15, 100); // Replace with actual phone number
  
    // Add shipping information
    doc.text(`Shipping Address:`, 15, 120);
    doc.text(`123 Shipping St, Cityville, ABC`, 15, 130); // Replace with actual address
  
    // Add payment details
    doc.text(`Payment Method: Credit Card`, 15, 150); // Replace with actual payment method
    doc.text(`Transaction ID: 1234567890`, 15, 160); // Replace with actual transaction ID
  
    // Add table for item details
    const tableData = [];
    order.items.forEach((item) => {
      tableData.push([item.name, item.quantity, `$${item.price}`]); // Format price
    });
  
    doc.autoTable({
      startY: 180,
      head: [["Item", "Quantity", "Price"]],
      body: tableData,
      theme: "grid",
    });
  
    // Add footer
    const totalPages = doc.internal.getNumberOfPages();
    for (let i = 1; i <= totalPages; i++) {
      doc.setPage(i);
      doc.setFontSize(10);
      doc.text(190, doc.internal.pageSize.height - 10, `Page ${i} of ${totalPages}`, { align: "right" });
    }
  
    // Save the PDF
    doc.save(`Invoice_Order_${order.id}.pdf`);
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
            <Button variant="outlined" color="primary" onClick={() => downloadInvoice(order)}>Download Invoice</Button>
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
