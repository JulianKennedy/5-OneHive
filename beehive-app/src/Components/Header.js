import React from "react";
import "./headerstyle.css";
import { Link } from "react-router-dom";

export const Header = () => {
    return (
        <header className="header">
            <a href="https://feccanada.org"> {/* Replace "https://example.com" with the URL of the external website */}
                <img className="FEC-logo" alt="Image" src={require('./img/fec.png')} />
            </a>
            <div class="home"><Link to="/home" className="home">Home</Link></div>
            <div class="about"><Link to="/about" className="about">About</Link></div>
            <div class="product"><Link to="/product" className="product">Product</Link></div>
            <div class="learn"><Link to="/learn" className="learn">Learn</Link></div>
            <div class="adopt"><Link to="/adopt" className="adopt">Adopt</Link></div>
            <div className="login-button"><a href="login" className="login-button" type="button" color="#e5bcff">LOGIN</a></div>
        </header>
    );
};
export default Header;
