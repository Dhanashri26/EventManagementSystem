import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom"; // Import Link for navigation
import "./BrowseEvents.css";

const BrowseEvents = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8084/api/events/getAllEvents"
        );
        setEvents(response.data);
      } catch (error) {
        setError("Error fetching events. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="browse-events-container">
      <h2>Browse Events</h2>
      <div className="event-cards-container">
        {events.length === 0 ? (
          <p>No events available</p>
        ) : (
          events.map((event) => (
            <div key={event.id} className="event-card">
              {event.imageData && (
              <img
                src={`data:image/jpeg;base64,${event.imageData}`}
                alt="Event"
                className="event-image"
              />
            )}
              <h3>{event.title}</h3>
              <p>
                <strong>Date:</strong>{" "}
                {new Date(event.dateTime).toLocaleString()}
              </p>
              <p>
                <strong>Venue:</strong> {event.venue?.name || "Unknown venue"}
              </p>
              <p>
                <strong>Category:</strong>{" "}
                {event.category?.name || "Unknown category"}
              </p>
              <Link to={`/attendee/register/${event.id}`}>
                <button className="register-button">Register</button>
              </Link>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default BrowseEvents;
