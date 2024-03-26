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
                            Once you've adopted a hive, you gain access to your own beehive dashboard where you can monitor and manage your hive. {/* Updated text */}
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
                            Adopting a hive is easy and open to everyone, whether you’re a beginner or a hobbyist. {/* Updated text */}
                        </p>
                    </div>
                    <div className="subsection-2">
                        <p className="heading-3">1. Are you ready to become a beekeeper?</p>
                        <p className="body-3">
                            <span className="span">
                                Beekeeping is for everyone! Whether you're new to beekeeping or an experienced hobbyist, anyone can get started. {/* Updated text */}
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
                            Fill out our adoption application form to begin your journey as a beekeeper. {/* Updated text */}
                        </p>
                    </div>

                    <div className="div-wrapper-2">
                        <div className="text-wrapper-4"><a type="button" href="adoptionform">Adoption Form</a></div>
                    </div>
                </div>

                <div className="subsection-3">
                    <p className="heading-3">3. Bring your new beehive home!</p>
                    <p className="body-3">
                        <span className="span">
                            Once you've completed the adoption process, it's time to bring your new beehive home. If you need assistance setting up your hive, our support team is here to help. {/* Updated text */}
                        </span>
                        <span className="text-wrapper-5">Contact Support Team</span>
                    </p>
                </div>

            </div>
            <div className="footerr">
                <Footer />
            </div>
        </div>

    );
};
export default HowToAdoptPage;
