import React from "react";
import "./howtoadoptpagestyle.css";
import { Header } from "./Header";
import { Footer } from "./Footer";

export const HowToAdoptPage = () => {
  return (
    <div className="how-to-adopt-page" id="howtoadopt">
      <div className="div">
        <div className="overlap">
          <Header className="header-instance" />
          <img
            className="howtoadopt-home-image"
            src={require("./img/learn_beekeeping.png")}
            alt="Learn Beekeeping"
          />
        </div>

        <div className="content-wrapper">
          <h1 className="heading">How To Adopt</h1>
          <p className="body">
            Learn how to start your journey as a beekeeper and support our cause to save the bees.
          </p>

          <div className="div-wrapper">
            <a href="/product2">Buy a Beehive</a>
          </div>
        </div>
      </div>

      <div className="footerr">
        <Footer />
      </div>
    </div>
  );
};

export default HowToAdoptPage;
