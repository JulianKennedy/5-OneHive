import React from "react";
import "./cartpagestyle.css";
const { Header } = require("./Header");
const { Footer } = require("./Footer");


export const CartPage = () => {
    return (
        <div class="cart-page" id="cart">
            <div class="div">
                <Header className="header-instance" />
            </div>
            <div className="text-wrapper-8">Your Cart</div>

            <div className="component">
                <img className="line" src={require('./img/cart_item_line.svg')} alt="Line" />
                <img className="img" src={require('./img/beehive.png')} alt="Rectangle" />
                <div className="frame-3">
                    <div className="product-name">OneHive+ Beehive Frame</div>
                    <div className="text-wrapper-5">Remove</div>
                </div>
                <div className="text-wrapper-6">$300</div>
                <div className="frame-4">
                    <img className="rectangle-2" src={require('./img/cart_item_box.svg')} alt="Rectangle" />
                    <div className="text-wrapper-7">1</div>
                </div>
                <div className="text-wrapper">$300</div>
                <img className="line-2" src={require('./img/cart_item_line.svg')} alt="Line" />
            </div>

            <div className="text-wrapper-9">$300</div>
            <div className="text-wrapper-10">Item</div>
            <div className="text-wrapper-11">Price</div>
            <div className="text-wrapper-12">Quantity</div>
            <p className="p">Taxes and shipping calculated at checkout</p>
            <div className="text-wrapper-13">Subtotal</div>
            <div className="text-wrapper-14">Total</div>
            <img className="checkout" src={require('./img/checkoutButtons.png')} alt="Checkout" />

            <div className="foot">
                <Footer />
            </div>
        </div>

    );
};
export default CartPage;
