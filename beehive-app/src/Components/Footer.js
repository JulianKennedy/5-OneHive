import PropTypes from "prop-types";
import React from "react";
import "./footerstyle.css";

export const Footer = () => {
  return (
    <div className="footer">
      <img class="footer" src="img/footer.svg" />
    </div>
  );
};

Footer.propTypes = {
  frame: PropTypes.string,
};
