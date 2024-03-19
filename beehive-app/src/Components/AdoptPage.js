import React from "react";
import "./adoptpagestyle.css";
const { Header } = require("./Header");
const { Footer } = require("./Footer");


export const AdoptPage = () => {
    return (
        <div class="adopt-a-beehive-page" id="adopt">
            <div class="div">
                <div class="overlap-group"><div class="text-wrapper">Save the Bees</div></div>
                <div class="rectangle"></div>
                <img class="rectangle-2" src={require('./img/adoptpic1.jpg')} />
                <img class="rectangle" src={require('./img/adoptpic2.jpg')} />
                <div class="frame">
                <div class="one-hive">
                    <div class="div-2">
                    <div class="heading">You Just Need an Interest for Bees!</div>
                    <p class="body">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
                        dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip
                        ex ea commodo consequat.
                    </p>
                    </div>
                </div>
                <div class="frame-2">
                    <div class="div-wrapper"><div class="text-wrapper-3"><a type="button" href="about">About Us</a></div></div>
                </div>
                </div>
                <div class="our-community">
                <div class="div-2">
                    <div class="heading">Participate in our Community!</div>
                    <p class="p">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et.
                    </p>
                </div>
                <div class="frame-3">
                <div class="div-wrapper"><div class="text-wrapper-3"><a type="button" href="product">Shop 5-Onehive+</a></div></div>
                </div>
                </div>
                <Header className="header-instance" />
                <div className="footy">
        <Footer/>
      </div>
            </div>
        </div>
    );
}
export default AdoptPage;