import React from "react";
import "./howtoadoptpagestyle.css";
import { Header } from "./Header";
import { Footer } from "./Footer";


export const HowToAdoptPage = () => {
    return (
        <div class="how-to-adopt-page" id="howtoadopt">
            <div class="div">
                <div className="overlap">
                    <Header className="header-instance" />
                    <img className="howtoadopt-home-image" src={require('./img/learn_beekeeping.png')} alt="Rectangle" />
                    <p className="p">How To Adopt</p>
                </div>

                <div className="overlap-2">
                    <div className="subsection">
                        <p className="heading">What Happens After I Adopt a Hive?</p>
                        <p className="body">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
                            dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex
                            ea commodo consequat basically you now have access to your own beehive dashboard yahoo.
                        </p>
                    </div>
                    <div className="div-wrapper-2">
                        <div className="text-wrapper-4"><a type="button" href="login">Login to Dashboard</a></div>
                    </div>
                </div>

                <div className="overlap-3">
                    <div className="subsection">
                        <div className="heading-2">How to Adopt</div>
                        <p className="body-2">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
                            dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex
                            ea commodo consequat anyone can adopt whether you’re a beginner or a hobbyist
                        </p>
                    </div>
                    <div className="subsection-2">
                        <p className="heading-3">1. Are you ready to become a beekeeper?</p>
                        <p className="body-3">
                            <span className="span">
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
                                dolore magna aliqua. commodo consequat like the famous beekeeper Augusta Gusteau once said: anyone can
                                beekeep! Here’s our beginner overview if you want to learn more about beekeeping:{" "}
                            </span>
                            <span className="text-wrapper-5">
                                <a href="learn">Learn Beekeeping</a>
                            </span>
                        </p>
                    </div>
                </div>

                <div className="overlap-4">
                    <div className="subsection-4">
                        <p className="heading-3">2. Complete an adoption application form</p>
                        <p className="body-3">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
                            dolore magna aliqua. commodo consequat
                        </p>
                    </div>

                    <div className="div-wrapper">
                        <div className="text-wrapper-4"><a type="button" href="adoptionform">Adoption Form</a></div>
                    </div>

                </div>

                <div className="subsection-3">
                    <p className="heading-3">3. Bring your new beehive home!</p>
                    <p className="body-3">
                        <span className="span">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
                            dolore magna aliqua. Ut enim ad minim veniam, quis nostrud if you need help with setting up your beehive,
                            don’t hesitate to contact our team for help:{" "}
                        </span>
                        <span className="text-wrapper-5">Contact Support Team</span>
                    </p>
                </div>

                <div className="foot">
                    <Footer />
                </div>

            </div>
        </div>

    );
};
export default HowToAdoptPage;