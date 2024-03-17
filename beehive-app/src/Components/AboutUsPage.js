import React from "react";
import { Header } from "./Header";
import { MemberHeader } from "./MemberHeader";
import "./aboutuspagestyle.css";
//import "./homepagestyle.css";

export const AboutUsPage = () => {
  const isAuthenticated = localStorage.getItem("jwt") ? true : false;

  return (
    <div className="about-us-page" id="about">
      <div className="div">
      {isAuthenticated ? <MemberHeader /> : <Header />}
        <div className="overlap-group">
          <div className="text-wrapper">Save The Bees</div>
        </div>
        <div className="rectangle"></div>
        <img className="img" src={require('./img/team.png')} alt="Team" />
        <div className="one-hive">
          <div className="one-hive-2">
            <div className="heading">Our Team</div>
            <p className="body">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
              dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex
              ea commodo consequat.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUsPage;
