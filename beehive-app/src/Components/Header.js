import React, { useState } from "react";
import "./headerstyle.css";
import { Link } from "react-router-dom";
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export const Header = () => {
    const [cartItems, setCartItems] = useState(0);

    // Function to increment cart items (example)
    const addToCart = () => {
        setCartItems(cartItems + 1);
    };

    return (
        <header className="header">
            <a href="https://feccanada.org"> {/* Replace "https://example.com" with the URL of the external website */}
                <img className="FEC-logo" alt="Image" src={require('./img/fec.png')} />
            </a>
            <div class="home"><Link to="/home" className="home">Home</Link></div>
            <div class="about"><Link to="/about" className="about">About</Link></div>
            <div class="product"><Link to="/product2" className="product">Product</Link></div>
            <div class="learn"><Link to="/learn" className="learn">Learn</Link></div>
            <div class="adopt"><Link to="/adopthome" className="adopt">Adopt</Link></div>
            <a href="https://buy.stripe.com/test_6oEbKE5QE3Sj7wQeUU" className="cart-link" >
                <div className="cart-icon-container" onClick={addToCart}>
                    <FontAwesomeIcon icon={faShoppingCart} className="cart-icon" />
                    {cartItems > 0 && <div className="cart-count">{cartItems}</div>}
                </div>
            </a>
            <div className="login-button"><a href="login" className="login-button" type="button" color="#e5bcff">LOGIN</a></div>
        </header>
    );
};
export default Header;
