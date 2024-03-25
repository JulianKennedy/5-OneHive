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
                            Beekeeping Like
                            <br />
                            Never Before
                        </div>
                    </div>
                </div>
            </div>
            <div className="one-hive">
                <div className="one-hive-2">
                    <div className="one-hive-heading">OneHive+</div>
                    <p className="one-hive-body">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
                        dolore magna aliqua.
                    </p>
                </div>
            </div>
            <div className="adopt-now-button">
                <div className="text-wrapper-5">Pay By Donation</div>
            </div>
            <div className="frame-4">
                <div className="text-wrapper-6">Features</div>
                <ul className="p">
                    {/* Insert bullet points */}
                    <li>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
                    dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                    incididunt </li>
                    <li>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
                    dolore magna aliqua.</li>
                    <li>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
                    dolore magna aliqua.</li>
                </ul>
            </div>
            <img className="beehive-image" src={require('./img/beehive.png')} alt="Rectangle" />
            <div className="text-wrapper-7">How It Works</div>
            <img className="beehive-infographic" src={require('./img/beehive-infographic.png')} alt="Rectangle" />
            <p className="text-wrapper-8">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore.
            </p>
            <p className="text-wrapper-9">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.
            </p>
            <p className="text-wrapper-10">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do.</p>
            <p className="text-wrapper-11">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.
            </p>

            <div className="contribute-group">
                <div className="contribute">
                    <div className="heading-2">Contribute to the Foundation</div>
                    <p className="body-2">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
                        dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex
                        ea commodo consequat.
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