import React from "react";
import { Header } from "./Header";
import { MemberHeader } from "./MemberHeader";
import "./learnpagestyle.css";
const { Footer } = require("./Footer");


export const LearnPage = () => {

    const isAuthenticated = localStorage.getItem("token") ? true : false;

    return (
        <div class="learn-beekeeping" id="learn">
            <div class="div">
                <div class="overlap-group"><div class="text-wrapper">Learn the Basics</div></div>
                <div class="rectangle"></div>
                <img class="rectangle-2" src={require('./img/learnpagepic2.png')} />
                <iframe class="rectangle" src="http://www.youtube.com/embed/ymMoLHNuCaM" allowFullScreen="true" />
                <div class="frame">
                    <div class="one-hive">
                        <div class="div-2">
                            <div class="heading">Learn the Basics</div>
                            <p class="body">
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
                                dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip
                                ex ea commodo consequat.
                            </p>
                        </div>
                    </div>
                    <div class="frame-2">
                        <div class="div-wrapper"><div class="text-wrapper-3"><a type="button" href="adopt">Adopt Now</a></div></div>
                        <div class="div-wrapper"><div class="text-wrapper-3"><a type="button" href="product">Learn More</a></div></div>
                    </div>
                </div>
                <div class="our-community">
                    <div class="div-2">
                        <div class="heading">Start Your Beekeeping Journey Now</div>
                        <p class="p">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et.
                        </p>
                    </div>
                    <div class="frame-3">
                        <div class="div-wrapper"><div class="text-wrapper-3"><a type="button" href="product">Shop 5-Onehive+</a></div></div>
                    </div>
                </div>
                {isAuthenticated ? <MemberHeader /> : <Header />}
            </div>
        </div>
    );
}
export default LearnPage;