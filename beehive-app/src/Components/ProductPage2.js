import React from "react";
import "./productpagestyle2.css";
import { Header } from "./Header";
import { MemberHeader } from "./MemberHeader";
const { Footer } = require("./Footer");


export const ProductPage2 = () => {
    return (
        <div class="product-page-2" id="product2"> 
            <div class="div">
                <Header className="header-instance" />
                {/* {isAuthenticated ? <MemberHeader /> : <Header />} */}
                <div className="overlap">
                    <img className="product-home-image" src={require('./img/product.png')} alt="Rectangle" />
                    <div className="group">
                        <div className="product-home-text">
                            Experience Beekeeping
                            <br />
                            Like Never Before
                        </div>
                    </div>
                </div>
            </div>
            <div className="one-hive">
                <div className="one-hive-2">
                    <div className="one-hive-heading">OneHive+</div>
                    <p className="one-hive-body">
                        Discover the innovative features of OneHive+ and revolutionize your beekeeping experience.
                    </p>
                </div>
            </div>
            <div className="adopt-now-button">
                <div className="text-wrapper-5"><a href="/purchase">Pay By Donation</a></div>
            </div>
            <div className="frame-4">
                <div className="text-wrapper-6">Features</div>
                <ul className="p">
                    <li>Customizable hive settings to suit different bee species and environments.</li>
                    <li>Real-time monitoring and alerts for hive health and productivity.</li>
                    <li>Integrated educational resources for novice and experienced beekeepers alike.</li>
                </ul>
            </div>
            <img className="beehive-image" src={require('./img/beehive.jpeg')} alt="Rectangle" />
            <div className="text-wrapper-7">How It Works</div>
            <img className="beehive-infographic" src={require('./img/beehive-infographic.png')} alt="Rectangle" />
            <p className="text-wrapper-8">
                Get started with OneHive+ and experience beekeeping in a whole new way.
            </p>
            <p className="text-wrapper-9">
                Discover the simplicity and effectiveness of our hive management system.
            </p>
            <p className="text-wrapper-10">Join the beekeeping community and make a difference today.</p>
            <p className="text-wrapper-11">
                Explore the possibilities of sustainable beekeeping with OneHive+.
            </p>

            <div className="contribute-group">
                <div className="contribute">
                    <div className="heading-2">Contribute to the Foundation</div>
                    <p className="body-2">
                        Support the mission of the foundation by making a donation. Every contribution helps us protect bees and promote environmental conservation.
                    </p>
                </div>

                <div className="learn-more-button">
                    <div className="text-wrapper-12"><a type="button" href="https://feccanada.org/contribute/">Make a Donation</a></div>
                </div>

            </div>

            <div className="foot">
                <Footer/>
            </div>
        </div>

    );
};
export default ProductPage2;
