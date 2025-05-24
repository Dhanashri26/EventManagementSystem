import React from 'react';
import { Link } from 'react-router-dom';   
import './Footer.css';

const Footer = () => {
  return (
    <footer className="cf-footer">
      <div className="cf-footer-container">
        <div className="cf-footer-left">
          <h2 className="cf-footer-brand"><i className="fas fa-calendar-check"></i> OccasionCraft</h2>
          <p className="cf-footer-desc">
            Planning a full event has never been easier! OccasionCraft Event Management, an ISO 9001:2015 Certified Event Management Company based in Pune, India. We organize weddings, corporate events, private parties, and destination events across Pune from our offices in Mumbai, Amravati, Nagpur, and Nashik.
          </p>
        </div>

        <div className="cf-footer-middle">
          <h3 className="cf-footer-heading">Contact Info</h3>
          <p><i className="fas fa-map-marker-alt"></i> Pune, India</p>
          <p><i className="fas fa-phone-alt"></i> +91-859-001-0011</p>
          <p><i className="fas fa-envelope"></i> occasioncrafteventmanagement@gmail.com</p>
        </div>

        <div className="cf-footer-right">
          <h3 className="cf-footer-heading">Follow Us</h3>
          <div className="cf-social-icons">
             <Link className="me-3" to="/"><i className="bi bi-facebook"></i></Link>
            <Link className="me-3" to="/"><i className="bi bi-instagram"></i></Link>
            <Link className="me-3" to="/"><i className="bi bi-twitter"></i></Link>
            <Link className="me-3" to="/"><i className="bi bi-linkedin"></i></Link>
          </div>
        </div>
      </div>

      <div className="cf-footer-bottom">
        <p>© 2008–2025 OccasionCraft Event Management. All Rights Reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
