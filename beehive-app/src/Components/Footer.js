import PropTypes from "prop-types";
import React from "react";
import "./footerstyle.css";
import { faGlobe, faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { faFacebook, faFacebookMessenger, faXTwitter, faLinkedin } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export const Footer = () => {
  return (
    <div className="footer">
      <div className="footer-middle">
        <div className="footer-logo">
          <img src={require('./img/fec.png')} alt="FEC" />
        </div>
      </div>
      <div className="footer-social">
        <a href="https://feccanada.org">
          <FontAwesomeIcon icon={faGlobe} />
          {/* Replace "https://example.com" with the URL of the external website */}
          <p>FECCanada.org</p>
        </a>
        <a href="https://www.linkedin.com/shareArticle?title=Our%20Team&url=https://feccanada.org/our-team"> {/* Replace "https://example.com" with the URL of the external website */}
          <FontAwesomeIcon icon={faLinkedin} />
          <p>LinkedIn</p>
        </a>
        <a href="https://www.facebook.com/sharer.php?t=Our%20Team&u=https://feccanada.org/our-team"> {/* Replace "https://example.com" with the URL of the external website */}
          <FontAwesomeIcon icon={faFacebook} />
          <p>Facebook</p>
        </a>
        <a href="https://www.facebook.com/dialog/send?link=https://feccanada.org/our-team&app_id=291494419107518&redirect_uri=https://www.sharethis.com">
          <FontAwesomeIcon icon={faFacebookMessenger} /> {/* Replace "https://example.com" with the URL of the external website */}
          <p>Messenger</p>
        </a>
        <a href="https://twitter.com/intent/tweet?text=Our%20Team&url=https://feccanada.org/our-team&via=">
          <FontAwesomeIcon icon={faXTwitter} />
          <p>Twitter</p>
        </a>
        <a href="mailto:info@ttgteams.com?subject=Our Team&body=https://feccanada.org/our-team"> {/* Replace "https://example.com" with the URL of the external website */}
          <FontAwesomeIcon icon={faEnvelope} />
          <p>Email</p>
        </a>
      </div>
    </div>
  );
};