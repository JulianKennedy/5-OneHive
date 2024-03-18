import React from "react";
import { Footer } from "./Footer";
import { Header } from "./Header";
import { MemberHeader } from "./MemberHeader";
import "./homepagestyle.css";

export const HomePage = () => {
  // document.getElementById("head").createElement("header-instance");
  // if(localStorage) {
  //   document.getElementsByClassName("header-instance").createElement(MemberHeader);
  // }
  // else {
  //   document.getElementsByClassName("header-instance").createElement(Header);
  // }

  const isAuthenticated = localStorage.getItem("token") ? true : false;

  return (
    <div className="home-page-desktop" id="home">
      <div className="div" id="head">
        {isAuthenticated ? <MemberHeader /> : <Header />}
        <div className="overlap-group">
          <div className="text-wrapper">Save The Bees</div>
          <div className="text-wrapper-2">or else</div>
        </div>
        <div className="rectangle"></div>
        <img className="img" src={require('./img/One-Hive+.png')} alt="One-Hive+" />
        <img className="rectangle-2" src={require('./img/community.png')} alt="Community" />
        <img className="rectangle-3" src={require('./img/stats.png')} alt="Stats" />
        <div class="frame">
          <div class="one-hive">
            <div class="div-2">
              <div class="heading">OneHive+</div>
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
            <div class="heading">Our Community</div>
            <p class="p">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
              dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex
              ea commodo consequat.
            </p>
          </div>
          <div class="frame-3"></div>
          <div class="div-wrapper"><div class="text-wrapper-3"><a type="button" href="adopt">Join the Family</a></div></div>
        </div>
        <div class="real-time-stats">
          <div class="div-2">
            <div class="heading">Real-Time Stats</div>
            <p class="body">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
              dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex
              ea commodo consequat.
            </p>
          </div>
          <div class="div-wrapper"><div class="text-wrapper-3"><a href="product">Learn More</a></div></div>
        </div>
      </div>
    </div>
  );
};
export default HomePage;