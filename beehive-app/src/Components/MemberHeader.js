import React from "react";
import "./headerstyle.css";
import { Link, useNavigate } from "react-router-dom";

export const MemberHeader = () => {
    const navigate = useNavigate();

    // clera token and nagvigat to login page!
    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate("/login"); 
    };

    return (
        <header className="header">
            <img className="FEC-logo" alt="Image" src={require('./img/fec.png')} />
            <div className="navbar">
                <div className="text-wrapper-4"><Link to="/home" className="home">Home</Link></div>
                <div className="text-wrapper-4"><Link to="/about" className="about">About</Link></div>
                <div className="text-wrapper-4"><Link to="/product" className="product">Product</Link></div>
                <div className="text-wrapper-4"><Link to="/learn" className="learn">Learn</Link></div>
                <div className="text-wrapper-4"><Link to="/dashboard" className="dashboard">Dashboard</Link></div>
                <div className="text-wrapper-4"><button onClick={handleLogout} className="logout">Logout</button></div>
            </div>
            <div className="profile"><Link to="/profile" className="profile"><img src={require('./img/beeprofile.png')} alt=""></img></Link></div>
        </header>
    );
};

export default MemberHeader;
