import React from "react";
import "./aboutuspagestyle.css";
const { Header } = require("./Header");
const { Footer } = require("./Footer");


export const AboutUsPage = () => {
    return (
        <div class="about-us-page" id="about">
        <div class="div">
            <div class="overlap-group"><div class="text-wrapper">Save The Bees</div></div>
            <div class="rectangle"></div>
            <img class="img" src={require('./img/team.png')} />
            <div class="one-hive">
            <div class="one-hive-2">
                <div class="heading">Our Team</div>
                <p class="body">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
                dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex
                ea commodo consequat.
                </p>
            </div>
            </div>
            <Header className="header-instance" />
            </div>
            </div>
    );
};
export default AboutUsPage;