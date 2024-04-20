import React from "react";
import "./adopthomepagestyle.css";
const { Header } = require("./Header");
const { Footer } = require("./Footer");


export const AdoptHomePage = () => {
    return (
        <div class="adopt-home" id="adopt">
            <div class="div">
                <div class="overlap-group"><div class="text-wrapper">Adopt A Beehive Today</div></div>
                <div class="rectangle"></div>
                <img class="rectangle" src={require('./img/adoptpic3.jpeg')} />
                <div class="frame">
                    <div class="one-hive">
                        <div class="div-2">
                            <div class="heading">How to Adopt a Beehive</div>
                            <p class="body">
                                Learn how you can make a difference by adopting a beehive and supporting our cause to save the bees.
                            </p>
                        </div>
                    </div>
                        <div className="div-wrapper">
                        <div class="text-wrapper-3"><a type="button" href="howtoadopt">Learn More</a></div>
                        </div>
                </div>

                <div className="contribute">
                    <div className="real-time-stats">
                        <div className="heading-2">Contribute to the Foundation</div>
                        <p className="body-2">
                            Support our mission to save the bees and promote environmental conservation.
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
