import React from "react";
import "./memberheaderstyle.css";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Avatar } from "@material-ui/core";
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';

export const MemberHeader = () => {
    const navigate = useNavigate();

    // Clear token and navigate to login page
    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/login");
    };

    return (
        <header className="header">
            <a href="https://feccanada.org">
                <img className="FEC-logo" alt="Image" src={require('./img/fec.png')} />
            </a>
            <div className="home"><Link to="/home" className="home">Home</Link></div>
            <div className="about"><Link to="/about" className="about">About Us</Link></div>
            <div className="product"><Link to="/product" className="product">Product & Purchase</Link></div>
            <div className="learn"><Link to="/learn" className="learn">Learn About Bees</Link></div>
            <div className="dashboard"><Link to="/dashboard" className="dashboard">Dashboard</Link></div>
            <div className="map"><Link to="/map" className="map">Map</Link></div>
            <a href="/cart" className="cart-link" >
                <div className="cart-icon-container">
                    <FontAwesomeIcon icon={faShoppingCart} className="cart-icon" />
                    {/* {cartItems > 0 && <div className="cart-count">{cartItems}</div>} */}
                </div>
            </a>
            <div className="profile-dropdown">
                <div className="profile-circle">
                    <Link to="/profile" className="profile">
                        <Avatar id="profpic" src={localStorage.getItem('profilePic')} style={{ width: "60px", height: "60px" }} />
                    </Link>
                </div>
                <div className="dropdown-content">
                    <a onClick={() => navigate("/profile")}>View Profile</a>
                    <a onClick={handleLogout}>Logout</a>
                </div>
            </div>
        </header>
    );
};

export default MemberHeader;
