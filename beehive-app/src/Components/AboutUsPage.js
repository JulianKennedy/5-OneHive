import React from "react";
import { Header } from "./Header";
import { MemberHeader } from "./MemberHeader";
import "./aboutuspagestyle.css";
//import "./homepagestyle.css";
import { Footer } from "./Footer";

export const AboutUsPage = () => {

  const isAuthenticated = localStorage.getItem("token") ? true : false;

  return (
    <div className="about-us-page" id="about">
      {isAuthenticated ? <MemberHeader /> : <Header />}
      <div className="div">
        <div className="overlap-group">
          <div className="text-wrapper">Save The Bees</div>
        </div>
        <div className="rectangle"></div>
        <img className="img" src={require('./img/team.png')} alt="Team" />
        <div className="one-hive">
          <div className="one-hive-2">
            <div className="heading">Our Team</div>
            <p className="body">
              Meet the dedicated team behind 5-OneHive, working to save the bees and promote environmental conservation. From top to bottom and left to right: Andi, Clare, Mena, Cesar, and Julian.
            </p>
          </div>
        </div>
        <div className="foot">
        <Footer/>
      </div>
      </div>
    </div>
  );
};

export default AboutUsPage;
