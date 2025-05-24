import React, { useEffect, useState } from "react";
import "../NavBarPagesCss/Home.css";
import axios from "axios";
import Footer from "../OtherPage/Footer";
import { useNavigate } from "react-router-dom"; // <-- ADD
import Reviewpage from "../OtherPage/Reviewpage";

const Home = () => {
  const [events, setEvents] = useState([]);
  const [activeArrow, setActiveArrow] = useState(null); // <-- NEW
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:8084/api/events/getAllEvents")
      .then((res) => setEvents(res.data))
      .catch((err) => console.error("Error fetching events", err));
  }, []);

  const handleCardClick = (id) => {
    navigate(`/event/${id}`);
  };

  const scrollLeft = () => {
    const slider = document.getElementById("event-slider");
    slider.scrollBy({ left: -300, behavior: "smooth" });
    setActiveArrow("left"); // <-- Mark active
  };

  const scrollRight = () => {
    const slider = document.getElementById("event-slider");
    slider.scrollBy({ left: 300, behavior: "smooth" });
    setActiveArrow("right"); // <-- Mark active
  };
  return (
    <div className="home-container">
      <div
        id="carouselExampleIndicators"
        className="carousel slide"
        data-ride="carousel"
        data-interval="3000"
      >
        <div className="carousel-overlay-content">
          <h1>Welcome to Our OccasionCraft Studio</h1>
          <p>Craft your memories with our OccasionCraft Studio!!</p>
          {/* <p>Discover, Explore, and Join Amazing Events Near You!</p> */}
        </div>

        <div className="carousel-inner">
          <div className="carousel-item active">
            <img src="/assests/event4.jpg" alt="event-pic" />
          </div>
          <div className="carousel-item">
            <img src="/assests/marriage_img.jpg" alt="event-pic" />
          </div>
          <div className="carousel-item">
            <img src="/assests/indoor_wedding_hall.jpg" alt="event-pic" />
          </div>
          <div className="carousel-item">
            <img src="/assests/indoor_night_img.jpg" alt="event-pic" />
          </div>
          <div className="carousel-item">
            <img src="/assests/outdoor_event_img.jpg" alt="event-pic" />
          </div>
        </div>
      </div>

      <section className="event-section">
        <h2>Our Gallery</h2>
        <div className="slider-wrapper">
          {/* Left Arrow Button */}
          <button
            className={`arrow left-arrow ${
              activeArrow === "left" ? "active" : ""
            }`}
            onClick={scrollLeft}
          >
            <i className="fas fa-chevron-left"></i>
          </button>

          {/* Slider container for event cards */}
          <div className="card-slider" id="event-slider">
            {events.map((event) => (
              <div
                className="event-card-3d"
                key={event.id}
                onClick={() => handleCardClick(event.id)}
              >
                <img src="/assests/event3.jpg" alt="event-pic" />
                <div className="card-content">
                  <h3>{event.title}</h3>
                  <span>{new Date(event.dateTime).toLocaleString()}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Right Arrow Button */}
          <button
            className={`arrow right-arrow ${
              activeArrow === "right" ? "active" : ""
            }`}
            onClick={scrollRight}
          >
            <i className="fas fa-chevron-right"></i>
          </button>
        </div>
      </section>

      <Reviewpage/>
      <Footer />
    </div>
  );
};

export default Home;
