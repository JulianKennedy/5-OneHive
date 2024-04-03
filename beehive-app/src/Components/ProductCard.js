// ProductCard.js
import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles({
  card: {
    width: '600px', // Set a fixed width for the card
    margin: '20px auto', // Add margin for spacing between cards
    borderRadius: '10px',
    border: '1px solid #ddd',
    boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
    display: 'flex', // Ensure cards are stacked vertically
    flexDirection: 'column', // Align content vertically
  },
  media: {
    height: '200px',
    width: '100%', // Ensure image takes full width of the card
    borderTopLeftRadius: '10px',
    borderTopRightRadius: '10px',
    objectFit: 'cover', // Maintain aspect ratio and cover the card
  },
  content: {
    padding: '20px',
    flex: 1, // Allow content to grow and fill the available space
  },
  actions: {
    padding: '16px',
    paddingTop: 0,
    borderTop: '1px solid #eee', // Add border on top of actions
    justifyContent: 'center',
  },
  button: {
    backgroundColor: '#007bff',
    color: '#bbeeff',
    '&:hover': {
      backgroundColor: '#0056b3',
    },
  },
});

const ProductCard = ({ product, openModal }) => {
  const classes = useStyles();

  return (
    <Card className={classes.card}>
      <div
        className={classes.media}
        style={{ backgroundImage: `url(${product.Product_Image})` }}
      />
      <CardContent className={classes.content}>
        <Typography variant="h5" component="div">
          {product.Product_Name}
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          Price: ${product.Product_Price}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {product.Product_Description}
        </Typography>
      </CardContent>
      <CardActions className={classes.actions}>
        <Button size="small" className={classes.button} onClick={() => openModal(product)}>Buy Now</Button>
      </CardActions>
    </Card>
  );
};

export default ProductCard;
