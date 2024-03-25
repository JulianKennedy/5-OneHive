import React from "react";
import "./orderhistorypagestyle.css";
const { Header } = require("./Header");
const { Footer } = require("./Footer");


export const OrderHistoryPage = () => {
    return (
        <div class="order-history-page" id="orderhistory"> 
            <div class="div">
                <Header className="header-instance" />
            </div>

            <div className="title">Order History</div>
            <img className="rectangle-1" src={require('./img/orderhistoryrectangle.svg')} alt="Rectangle" />
            <img className="rectangle-2" src={require('./img/orderhistoryrectangle.svg')} alt="Rectangle" />
            <div className="text-wrapper-5">Order Number</div>
            <div className="text-wrapper-6">Date</div>
            <div className="text-wrapper-7">Fullfillment Status</div>
            <div className="text-wrapper-8">Payment Status</div>
            <div className="text-wrapper-9">Total</div>

            <div className="foot">
                <Footer/>
            </div>
        </div>

    );
};
export default OrderHistoryPage;