import React from "react";
import "./headerstyle.css";
import { Link } from "react-router-dom";

export const MemberHeader = () => {
    return (
        <header className="header">
            <img className="FEC-logo" alt="Image" src={require('./img/fec.png')} />
            <div className="navbar">
            <div class="text-wrapper-4"><Link to="/home" className="home">Home</Link></div>
            <div class="text-wrapper-4"><Link to="/about" className="about">About</Link></div>
            <div class="text-wrapper-4"><Link to="/product" className="product">Product</Link></div>
            <div class="text-wrapper-4"><Link to="/learn" className="learn">Learn</Link></div>
            <div class="text-wrapper-4"><Link to="/dashboard" className="dashboard">Dashboard</Link></div>
            </div>
            <div className="profile"><img src={require('./img/beeprofile.png')}></img></div>
        </header>
    );
};
export default MemberHeader;
