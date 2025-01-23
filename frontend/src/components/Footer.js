import React from "react";
import "../style/footer.css";
import about from "../image/about.png";

const Footer = () => {
  return (
    <footer className="footer-container">
      <div className="footer-content">
        {/* Logo Section */}
        <div className="footer-logo">
          <img 
            src={about}
            alt="Bihari Samosa Logo" 
            className="footer-logo-image" 
          />
        </div>

        {/* Links Section */}
        <div className="footer-links">
          <div className="links-column">
            <h4>ABOUT</h4>
            <ul>
              <li><a href="#home">Home</a></li>
              <li><a href="#menu">Menu</a></li>
              <li><a href="#about-us">About us</a></li>
              <li><a href="#contact-us">Contact us</a></li>
            </ul>
          </div>
          <div className="links-column">
            <h4>TERMS</h4>
            <ul>
              <li><a href="#privacy-policy">Privacy Policy</a></li>
              <li><a href="#terms-of-service">Terms of Services</a></li>
              <li><a href="#shipping-policy">Shipping Policy</a></li>
            </ul>
          </div>
          <div className="links-column">
            <h4>CONTACT US</h4>
            <p>Manek Chowk, Opp. Santram Mandir, Nadiad, Dist: Kheda, Gujarat, India-387001.</p>
            <p>📞 +91 83202 39598</p>
            <p>📞 +91 87359 44220</p>
          </div>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="footer-bottom">
        © 2025 Ghantawala Bihari Samosa
      </div>
    </footer>
  );
};

export default Footer;

