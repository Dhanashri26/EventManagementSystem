import React, { useState } from "react";
import Footer from "../OtherPage/Footer.js";
import "../NavBarPagesCss/About.css";
import TeamMember from "../OtherPage/TeamMember.js";

function About() {
  const [zoomed, setZoomed] = useState(false);

  const handleCardClick = () => {
    setZoomed(!zoomed);
  };

  return (
    <div className="about-page-wrapper">
      <div className="about-container">
        <h1 id="about-heading">Welcome to OccasionCraft</h1>
        <p className="about-intro">
          We are a leading event management company based in Pune, Maharashtra,
          specializing in a wide range of services including weddings, corporate
          events, and private gatherings. With over a decade of experience, we
          ensure that every event is unique, stress-free, and memorable.
        </p>

        {/* Journey */}
        <div
          className={`about-card ${zoomed ? "zoomed" : ""}`}
          onClick={handleCardClick}
        >
          <div className="about-text">
            <h2>Our Journey</h2>
            <p>
              Started in 2010 in Pune, we’ve grown into one of the most
              reputable event companies in Maharashtra. We’ve planned over 500+
              grand events, blending tradition with creativity.
            </p>
          </div>
          <div className="about-image">
            <img
              src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d"
              alt="Our Journey"
            />
          </div>
        </div>

        {/* Mission & Vision */}
        <div
          className={`about-card mission-vision ${zoomed ? "zoomed" : ""}`}
          onClick={handleCardClick}
        >
          <div className="about-image">
            <img
              src="https://images.unsplash.com/photo-1556742031-c6961e8560b0"
              alt="Our Mission"
            />
          </div>
          <div className="about-text">
            <h2>Our Mission & Vision</h2>
            <p>
              Our mission is to redefine event planning with personal touches,
              ensuring every moment is unforgettable. Our vision is to become
              India's most loved event brand through innovation and integrity.
            </p>
          </div>
        </div>

        {/* Achievements */}
        <div
          className={`about-card ${zoomed ? "zoomed" : ""}`}
          onClick={handleCardClick}
        >
          <div className="about-text">
            <h2>Our Achievements</h2>
            <p>
              We’ve hosted celebrity weddings, high-end corporate functions, and
              won multiple national awards. Our story is one of dedication,
              client satisfaction, and excellence.
            </p>
          </div>
          <div className="about-image">
            <img
              src="https://images.unsplash.com/photo-1592194996308-7b43878e84a6"
              alt="Our Achievements"
            />
          </div>
        </div>
      </div>

      <TeamMember />
      <div className="about-footer-spacing">
        <Footer />
      </div>
    </div>
  );
}

export default About;
