import React, { useState, useEffect } from 'react';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Header from './Header';
import { Footer } from './Footer';
import MemberHeader from './MemberHeader';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';
import { fetchOrder } from '../Service';

const PaymentConfirmationPage = () => {
  const rootStyle = {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
  };

  const contentStyle = {
    flex: '1',
    textAlign: 'center',
    padding: '50px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: '150px',
  };

  const confirmationMessageStyle = {
    marginBottom: '30px',
  };

  const orderNumberStyle = {
    marginBottom: '40px',
    fontWeight: 'bold',
  };

  const buttonStyle = {
    marginTop: '30px',
    backgroundColor: '#e5bcff',
    color: 'black'
  };

  const searchParams = new URLSearchParams(window.location.search);
  const orderNumber = searchParams.get('orderNumber');
  const [order, setOrder] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const orderData = await fetchOrder(orderNumber);
      setOrder(orderData[0]);
      if(orderData.length > 0) {

      }
    };
    fetchData();
  }, [orderNumber]);

  const downloadInvoice = () => {

    if (!order) return;

    // Create a new jsPDF instance
    const doc = new jsPDF();

    // Set font styles
    doc.setFont('Helvetica', 'bold');

    let headerColor = '';
    order.status = 'Pending';
    switch (order.status) {
        case 'Pending':
            headerColor = 'hotpink'; // Yellow
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
    doc.text(`Invoice for Order #${order.Order_ID}`, 105, 20, { align: 'center' });

    // Add order details
    doc.setTextColor('#000000'); // Reset text color
    doc.setFontSize(12);

    // Convert the date to a readable format with the time
    const date = new Date(order.Date);
    order.Date = date.toLocaleString('en-US', { month: 'short', day: 'numeric', year: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric' });
    doc.setFont('Helvetica', 'bold');
    doc.text(`Order Date: `, 15, 40);
    doc.setFont('Helvetica', 'normal');
    doc.text(`${order.Date}`, 50, 40);
    doc.setFont('Helvetica', 'bold');
    doc.text(`Total: `, 15, 50);
    doc.setFont('Helvetica', 'normal');
    doc.text(`$${order.Total.toFixed(2)}`, 50, 50);
    doc.setFont('Helvetica', 'bold');
    doc.text(`Status: `, 15, 60);
    doc.setFont('Helvetica', 'normal');
    doc.text(`${order.status}`, 50, 60);

    // Add customer details (replace with actual customer info)
    doc.setFont('Helvetica', 'bold');
    doc.text(`Customer Name: `, 15, 80);
    doc.setFont('Helvetica', 'normal');
    doc.text(`${order.Full_Name}`, 50, 80); // Replace with actual name
    doc.setFont('Helvetica', 'bold');
    doc.text(`Email: `, 15, 90);
    doc.setFont('Helvetica', 'normal');
    doc.text(`${order.Email}`, 50, 90); // Replace with actual email
    doc.setFont('Helvetica', 'bold');
    doc.text(`Phone: `, 15, 100); // Replace with actual phone number
    doc.setFont('Helvetica', 'normal');
    doc.text(`${order.Phone}`, 50, 100);

    // Add shipping information
    doc.setFont('Helvetica', 'bold');
    doc.text(`Shipping Address:`, 15, 120);
    doc.setFont('Helvetica', 'normal');
    doc.text(`${order.Address_Line_1}, ${order.Address_Line_2}`, 15, 130); // Replace with actual address
    doc.text(`${order.City}, ${order.State}, ${order.Country}`, 15, 140); // Add city, state, country
    doc.text(`${order.Postal_Code}`, 15, 150); // Add postal code

    // Add table for item details
    // Convert order.Cart back to JSON
    const cart = JSON.parse(order.Cart);
    const tableData = cart.map((item) => [
        { content: item.name, styles: { fontStyle: 'bold' } }, // Bold item name
        item.quantity,
        { content: `$${(item.quantity * item.price).toFixed(2)}`, styles: { fontStyle: 'bold' } }, // Bold total price
    ]);

    // Calculate subtotal
    const subtotal = cart.reduce((acc, item) => acc + item.quantity * item.price, 0);
    const taxRate = 0.08; // Example tax rate of 10%
    const taxAmount = subtotal * taxRate;
    const shippingCost = 10; // Example shipping cost
    const totalAmount = subtotal + taxAmount + shippingCost;

    // Add subtotal, tax, shipping, and total to the table data
    tableData.push(['', '', '', '']); // Empty row for spacing
    tableData.push([{ content: 'Subtotal', styles: { fontStyle: 'bold' } }, '', `$${subtotal.toFixed(2)}`, '']);
    tableData.push([{ content: 'Tax (8%)', styles: { fontStyle: 'bold' } }, '', `$${taxAmount.toFixed(2)}`, '']);
    tableData.push([{ content: 'Shipping', styles: { fontStyle: 'bold' } }, '', `$${shippingCost.toFixed(2)}`, '']);
    tableData.push(['', '', '', '']); // Empty row for spacing
    tableData.push(['', '', '', '']); // Empty row for spacing

    tableData.push([{ content: 'Total', styles: { fontStyle: 'bold' } }, '', `$${totalAmount.toFixed(2)}`, '']);

    // Add the table with faded pink alternating rows
    doc.autoTable({
        startY: 170,
        head: [['Item', 'Quantity', 'Total Price', '']],
        body: tableData,
        theme: 'striped', // Use the 'striped' theme for alternating row colors
        styles: {
            fillColor: '#ffe6f3', // Faded pink color for table rows
            font: 'Helvetica',
            fontStyle: 'normal',
            fontSize: 10,
        },
        headStyles: {
            fillColor: 'hotpink', // Faded pink color for table header
            font: 'Helvetica',
            fontStyle: 'bold',
            fontSize: 12,
        },
    });

    // Add footer
    const totalPages = doc.internal.getNumberOfPages();
    for (let i = 1; i <= totalPages; i++) {
        doc.setPage(i);
        doc.setFontSize(10);
        doc.text(190, doc.internal.pageSize.height - 10, `Page ${i} of ${totalPages}`, { align: 'right' });
    }

    // Save the PDF
    doc.save(`Invoice_Order_${order.Order_ID}.pdf`);
};

const isAuthenticated = localStorage.getItem("token") ? true : false;

  return (
    <div style={rootStyle}>
      {isAuthenticated ? <MemberHeader /> : <Header />}
      <div style={contentStyle}>
        <Typography variant="h4" style={confirmationMessageStyle}>
          Thank you for your purchase!
        </Typography>
        <Typography variant="body1">
          Your payment was successfully processed.
        </Typography>
        <Typography variant="body2" style={orderNumberStyle}>
          Order Confirmation Number: {orderNumber}
        </Typography>
        <Typography variant="body1">
          We have sent a confirmation email to your email address.
        </Typography>
        <Button
          variant="contained"
          onClick={downloadInvoice}
          style={buttonStyle}
        >
          Download Invoice
        </Button>
        <Button
          variant="contained"
          href="/"
          style={buttonStyle}
        >
          Back to Home
        </Button>
      </div>
      <Footer />
    </div>
  );
};

export default PaymentConfirmationPage;
