import React from "react";
import "./adopthomepagestyle.css";
const { Header } = require("./Header");
const { Footer } = require("./Footer");


export const AdoptHomePage = () => {
    return (
        <div class="adopt-a-beehive-page" id="adopt">
            <div class="div">
                <div class="overlap-group"><div class="text-wrapper">Adopt A Beehive Today</div></div>
                <div class="rectangle"></div>
                <img class="rectangle" src={require('./img/adoptpic3.jpeg')} />
                <div class="frame">
                    <div class="one-hive">
                        <div class="div-2">
                            <div class="heading">How to Adopt a Beehive</div>
                            <p class="body">
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
                                dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip
                                ex ea commodo consequat.
                            </p>
                        </div>
                    </div>
                    <div className="frame-5">
                        <div className="div-wrapper">
                            <div className="text-wrapper-6"><a type="button" href="adoptionform">Adoption Form</a></div>
                        </div>
                        <button className="div-wrapper">
                            <div className="text-wrapper-6"><a type="button" href="howtoadopt">Learn More</a></div>
                        </button>
                    </div>
                </div>

                <div className="contribute">
                    <div className="real-time-stats">
                        <div className="heading-2">Contribute to the Foundation</div>
                        <p className="body-2">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
                            dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex
                            ea commodo consequat.
                        </p>
                    </div>
                    <div className="div-wrapper">
                        <div className="text-wrapper-6"><a type="button" href="https://feccanada.org/contribute/">Make a Donation</a></div>
                    </div>
                </div>
                
                <Header className="header-instance" />
                <div className="footy">
                    <Footer />
                </div>
            </div>
        </div >
    );
}
export default AdoptHomePage;