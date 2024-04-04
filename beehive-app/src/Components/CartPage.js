import React, { useState, useEffect } from 'react';
import { makeStyles } from '@mui/styles';
import Typography from '@mui/material/Typography';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Footer } from './Footer';
import Header from './Header';

const useStyles = makeStyles({
  page: {
    paddingTop: '100px',
  },
  container: {
    maxWidth: '800px',
    margin: '20px auto',
    fontSize: '18px',
    textAlign: 'right', // Align all text to the right
  },
  header: {
    alignContent: 'left',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '10px',
    marginBottom: '20px',
  },
  title: {
    fontSize: '24px',
    display: 'grid',
    placeItems: 'center',
  },
  footer: {
    marginTop: '50px',
    textAlign: 'center',
    width: '100%', // Make the footer span the full width
  },
  checkoutBtn: {
    backgroundColor: '#ff80ab',
    '&:hover': {
      backgroundColor: '#ff9bcd', // Lighter pink on hover
    },
  },
  paymentMethods: {
    marginTop: '70px',
    display: 'flex',
    justifyContent: 'center', // Align buttons to the right
    '& button': {
      margin: '0 5px',
      backgroundColor: '#ff80ab',
      '&:hover': {
        backgroundColor: '#ff9bcd', // Lighter pink on hover
      },
    },
  },
  itemImage: {
    maxWidth: '100px',
    maxHeight: '100px',
  },
  subtotal: {
    paddingTop: '30px',
    paddingRight: '150px',
  },
  taxesText: {
    display: 'block',
    paddingTop: '10px',
    paddingRight: '60px',
  },
  // Alternate row background color
  tableRow: {
    '&:nth-child(even)': {
      backgroundColor: '#e3e3',
    },
  },
  // Shadow for table
  tableContainer: {
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    marginBottom: '20px',
  },
  // Background for table header
  tableHeader: {
    backgroundColor: '#e5e5',
  },
});

function CartPage() {
  const classes = useStyles();
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const storedCartItems = JSON.parse(localStorage.getItem('cart')) || [];
    setCartItems(storedCartItems);
  }, []);

  const updateQuantity = (itemId, newQuantity) => {
    if (newQuantity >= 1) {
      const updatedItems = cartItems.map(item =>
        item.Product_ID === itemId ? { ...item, quantity: parseInt(newQuantity) } : item
      );
      setCartItems(updatedItems);
      localStorage.setItem('cart', JSON.stringify(updatedItems));
    } else {
      console.error('Invalid quantity: Quantity must be at least 1.');
    }
  };

  const removeItem = (itemId) => {
    const updatedItems = cartItems.filter(item => item.Product_ID !== itemId);
    setCartItems(updatedItems);
    localStorage.setItem('cart', JSON.stringify(updatedItems));
  };

  const calculateSubtotal = () => {
    return cartItems.reduce((total, item) => total + (item.Product_Price * item.quantity), 0);
  };

  const bufferToBase64 = (buffer) => {
    const binary = Buffer.from(buffer).toString('base64');
    return `data:image/jpeg;base64,${binary}`;
  };

  return (
    <div className={classes.page}>
      <Header />
      <div className={classes.container}>
        <div className={classes.header}>
          <Button variant="outlined" color="primary" startIcon={<ArrowBackIcon />} href="/purchase">Back</Button>
          <div></div> {/* Spacer */}
        </div>
        {cartItems.length > 0 ? (
          <>
            <TableContainer component={Paper} className={classes.tableContainer}>
              <Table>
                <TableHead>
                  <TableRow className={classes.tableHeader}>
                    <TableCell colSpan={6}>
                      <Typography className={classes.title} variant="h4">Your Cart</Typography>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Item</TableCell>
                    <TableCell>Image</TableCell>
                    <TableCell>Price</TableCell>
                    <TableCell>Quantity</TableCell>
                    <TableCell>Total</TableCell>
                    <TableCell></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {cartItems.map((item, index) => (
                    <TableRow key={item.Product_ID} className={classes.tableRow}>
                      <TableCell>{item.Product_Name}</TableCell>
                      <TableCell><img src={bufferToBase64(item.Product_Image.data)} alt={item.Product_Name} className={classes.itemImage} /></TableCell>
                      <TableCell>${item.Product_Price}</TableCell>
                      <TableCell>
                        <TextField
                          type="number"
                          min="1"
                          value={item.quantity}
                          onChange={(e) => updateQuantity(item.Product_ID, e.target.value)}
                        />
                      </TableCell>
                      <TableCell>${item.Product_Price * item.quantity}</TableCell>
                      <TableCell>
                        <Button variant="contained" color="secondary" onClick={() => removeItem(item.Product_ID)}>Remove</Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
            <Box>
              <Typography variant="h6" className={classes.subtotal} gutterBottom>Subtotal: ${calculateSubtotal()}</Typography>
              <Typography variant="body1" className={classes.taxesText}>Taxes and shipping calculated at checkout</Typography>
            </Box>
            <div className={classes.paymentMethods}>
              <Button className={classes.checkoutBtn} variant="contained" color="primary" href="/checkout">CHECK OUT</Button>
            </div>
          </>
        ) : (
          <Typography variant="body1">Your cart is empty</Typography>
        )}
      </div>
      <div className={classes.footer}>
          <Footer />
        </div>
    </div>
  );
}

export default CartPage;
