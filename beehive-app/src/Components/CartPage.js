import React, { useState } from 'react';

function CartPage() {
  const [cartItems, setCartItems] = useState([
    { id: 1, name: 'OneHive+ Beehive Frame', price: 300, quantity: 1 },
  ]);

  const updateQuantity = (itemId, newQuantity) => {
    if (newQuantity >= 1) {
      setCartItems((prevCartItems) =>
        prevCartItems.map((item) =>
          item.id === itemId ? { ...item, quantity: newQuantity } : item
        )
      );
    } else {
      // Handle invalid quantity input
      console.error('Invalid quantity: Quantity must be at least 1.');
      // You can also display an error message to the user here
    }
  };

  const removeItem = (itemId) => {
    setCartItems((prevCartItems) =>
      prevCartItems.filter((item) => item.id !== itemId)
    );
  };

  const calculateSubtotal = () => {
    let subtotal = 0;
    cartItems.forEach((item) => (subtotal += item.price * item.quantity));
    return subtotal;
  };

  return (
    <div className="container">
      <header>
        <h1>Your Cart</h1>
      </header>
      <main>
        <table>
          <thead>
            <tr>
              <th>Item</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Total</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {cartItems.map((item) => (
              <tr key={item.id}>
                <td>{item.name}</td>
                <td>${item.price}</td>
                <td>
                  <input
                    type="number"
                    min="1"
                    value={item.quantity}
                    onChange={(e) => updateQuantity(item.id, e.target.value)}
                  />
                </td>
                <td>${item.price * item.quantity}</td>
                <td>
                  <button onClick={() => removeItem(item.id)}>Remove</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="subtotal">
          <p>Subtotal: ${calculateSubtotal()}</p>
        </div>
        <p>Taxes and shipping calculated at checkout</p>
      </main>
      <footer>
        <button>CHECK OUT</button>
        <div className="payment-methods">
          <img src="shop_pay.png" alt="Shop Pay" />
          <img src="paypal.png" alt="PayPal" />
          <img src="g_pay.png" alt="G Pay" />
        </div>
      </footer>
    </div>
  );
}

export default CartPage;
