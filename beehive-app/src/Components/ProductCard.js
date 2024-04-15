// ProductCard.js
import React from 'react';
import { Card, CardContent, CardActions, Button, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles({
  card: {
    width: '900px',
    margin: '20px auto',
    borderRadius: '10px',
    border: '1px solid #ddd',
    boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
  },
  media: {
    maxWidth: '100%',
    maxHeight: '200px',
    borderTopLeftRadius: '10px',
    borderTopRightRadius: '10px',
    objectFit: 'contain',
    marginTop: '20px',
  },
  content: {
    padding: '20px',
    display: 'flex',
    flexDirection: 'column',
  },
  title: {
    fontSize: '1.5rem',
    fontWeight: 'bold',
    marginBottom: '10px',
  },
  price: {
    fontSize: '1.3rem',
    marginBottom: '10px',
    padding: '10px'
  },
  description: {
    marginBottom: '10px',
    padding: '10px'
  },
  actions: {
    padding: '16px',
    paddingTop: 0,
    borderTop: '1px solid #eee',
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

  const bufferToBase64 = (buffer) => {
    const binary = Buffer.from(buffer).toString('base64');
    return `data:image/jpeg;base64,${binary}`;
  };

  const imageUrl = bufferToBase64(product.Product_Image.data);

  return (
    <div>
      <Card className={classes.card}>
        <img className={classes.media} src={imageUrl} alt="Product" />
        <CardContent className={classes.content}>
          <Typography className={classes.title} variant="h5" component="div">
            {product.Product_Name}
          </Typography>
          <Typography className={classes.description} variant="body2" color="textSecondary">
            {product.Product_Description}
          </Typography>
          <Typography className={classes.price} color="textSecondary">
            Price: ${product.Product_Price}
          </Typography>
          <CardActions className={classes.actions}>
            <Button size="small" className={classes.button} onClick={() => openModal(product)}>Buy Now</Button>
          </CardActions>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProductCard;
