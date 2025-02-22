// Footer.jsx
import React from "react";
import "./footer.css";
import { FaFacebook, FaInstagram } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-section">
          <h2 className="footer-title">Atmanirbhar Hills</h2>
          <p className="footer-text">
            Empowering India through local businesses
          </p>
          <div className="social-icons" style={{ justifyContent: "center" }}>
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaFacebook className="icon" />
            </a>
            <a href="https://x.com" target="_blank" rel="noopener noreferrer">
              <FaXTwitter className="icon" />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaInstagram className="icon" />
            </a>
          </div>
        </div>

        <div className="footer-section">
          <h3 className="footer-subtitle">Quick Links</h3>
          <ul className="footer-links">
            <li>
              <a href="/about" className="footer-link">
                About Us
              </a>
            </li>
            <li>
              <a href="/products" className="footer-link">
                Products
              </a>
            </li>
            <li>
              <a href="/community" className="footer-link">
                Community
              </a>
            </li>
            <li>
              <a href="/contact" className="footer-link">
                Contact Us
              </a>
            </li>
          </ul>
        </div>

        <div className="footer-section">
          <h3 className="footer-subtitle">Contact Us</h3>
          <p className="footer-text">Atmanirbhar Hills Team</p>
          <p className="footer-text">Email: support@atmanirbharhills.com</p>
          <p className="footer-text">Phone: +91 12345 67890</p>
        </div>
      </div>

      <div className="footer-bottom">
        <p>
          &copy; {new Date().getFullYear()} Atmanirbhar Hills. All rights
          reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
