import React from "react";
import "./memberheaderstyle.css";
import { Link, useNavigate } from "react-router-dom";
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useState } from "react";
import { Avatar } from "@material-ui/core";

export const MemberHeader = () => {
    const navigate = useNavigate();

    // clera token and nagvigat to login page!
    const handleLogout = () => {
        localStorage.setItem("jwt", "");
        navigate("/login");
    };

    return (
        <header className="header">
            <a href="https://feccanada.org"> {/* Replace "https://example.com" with the URL of the external website */}
                <img className="FEC-logo" alt="Image" src={require('./img/fec.png')} />
            </a>
            <div className="home"><Link to="/home" className="home">Home</Link></div>
            <div className="about"><Link to="/about" className="about">About</Link></div>
            <div className="product"><Link to="/product" className="product">Product</Link></div>
            <div className="learn"><Link to="/learn" className="learn">Learn</Link></div>
            <div className="dashboard"><Link to="/dashboard" className="dashboard">Dashboard</Link></div>
            <div className="map"><Link to="/map" className="map">Map</Link></div>
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
