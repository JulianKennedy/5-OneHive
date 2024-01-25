import React from "react";
import "./productpagestyle.css";
const { Header } = require("./Header");
const { Footer } = require("./Footer");


export const ProductPage = () => {
    return (
        <div class="product-page-desktop" id="product">
      <div class="div">
        <div class="overlap-group">
          <div class="group">
            <div class="beekeeping-like">Beekeeping Like<br />Never Before</div>
          </div>
        </div>
        <div class="rectangle"></div>
        <Header className="header-instance" />
        <img class="img" src={require('./img/beehive.png')} />
        <div class="one-hive">
          <div class="one-hive-2">
            <div class="heading">OneHive+</div>
            <p class="body">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
              dolore magna aliqua.
            </p>
          </div>
        </div>
        <div class="adopt-now-button"><div class="text-wrapper-2"><a href='payment'>Pay By Donation</a></div></div>
      </div>
    </div>
    );
};
export default ProductPage;