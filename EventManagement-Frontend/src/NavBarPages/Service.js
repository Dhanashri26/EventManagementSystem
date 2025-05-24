import React, { useState } from 'react';
import Footer from '../OtherPage/Footer';
import '../NavBarPagesCss/Services.css';

const services = [
  {
    id: 1,
    title: "Corporate Event Management",
    description:
      "If you want to make a statement at your next corporate event, partner with Melodia Event Management Company in Kerala.",
    imgSrc:
      "https://storage.googleapis.com/a1aa/image/86d96619-8d25-4c6f-ef87-56e87a43c2ce.jpg",
  },
  {
    id: 2,
    title: "Wedding Planners",
    description:
      "Have you ever dreamed of planning the perfect dream event to be remembered forever?",
    imgSrc:
      "https://storage.googleapis.com/a1aa/image/5e4854db-8286-464c-83fa-68c7f03c8ccc.jpg",
  },
  {
    id: 3,
    title: "Destination Wedding In Kerala",
    description:
      "Celebrate your special day in paradise as you enjoy a luxurious destination event with us!",
    imgSrc:
      "https://storage.googleapis.com/a1aa/image/27f0e06b-6ecc-45c0-2710-3754c11797e2.jpg",
  },
  {
    id: 4,
    title: "Beach Weddings",
    description:
      "Celebrate your love amidst the serene shores and palm-fringed beaches of Kerala",
    imgSrc:
      "https://storage.googleapis.com/a1aa/image/535377e8-1e82-4417-a19f-91295c954485.jpg",
  },
  {
    id: 5,
    title: "Music & Entertainment",
    description:
      "From live bands and DJs to mesmerizing performers, we have everything you need",
    imgSrc:
      "https://storage.googleapis.com/a1aa/image/203ce93b-7d59-49e8-f82b-a316359212e1.jpg",
  },
  {
    id: 6,
    title: "Private Parties",
    description:
      "Melodia Event Management in Kerala holds Private Parties and crafts unforgettable moments.",
    imgSrc:
      "https://storage.googleapis.com/a1aa/image/09976173-a297-4586-9cb3-e766f4400e29.jpg",
  },
];

const ServiceCard = ({ title, description, imgSrc }) => {
  const [zoomedOut, setZoomedOut] = useState(false);

  const handleCardClick = () => {
    setZoomedOut(!zoomedOut);
  };

  return (
    <div className={`custom-service-card ${zoomedOut ? 'zoom-out-active' : ''}`} onClick={handleCardClick}>
      <img src={imgSrc} alt={title} className="custom-service-img" />
      <h2>{title}</h2>
      <p>{description}</p>
    </div>
  );
};

const Service = () => {
  return (
    <div className="custom-page-wrapper">
      <div className="custom-services-container">
        <h1 id='serviceId'>Services by OccasionCraft</h1>
        <p className="custom-intro" style={{ textAlign: "center" }}>
          "The Event Management System is a comprehensive platform designed to
          simplify and streamline the planning and execution of events of all
          sizes. Whether you are organizing corporate conferences, weddings,
          workshops, or social gatherings, our system provides intuitive tools to
          manage every detail with ease..."
        </p>

        <div className="custom-services-grid">
          {services.map((service) => (
            <ServiceCard key={service.id} {...service} />
          ))}
        </div>
      </div>

      <div className="venue-card">
        <div className="venue-images">
          <img src="/assests/contactScreenImage1.jpeg" alt="venue1" />
          {/* Ekde img takshil */}
          <img src="/assests/contactScreenImage2.jpeg" alt="venue2" />
          <img src="/assests/contactScreenImage3.jpeg" alt="venue3" />
          <img src="/assests/contactScreenImage4.jpeg" alt="venue4" />
        </div>

        <div className="venue-content">
          <h2>Struggling to find the perfect venue?</h2>
            <p>
              Find your perfect venue hassle-free with <strong>OccasionCraft</strong>.<br />
              Easy booking, endless choices.
            </p>
          <button className="explore-btn">Explore Venues</button>
          <div className="leaf"></div>
        </div>
      </div>

      <div className="custom-footer-spacing">
        <Footer />
      </div>
    </div>
  );
};

export default Service;
