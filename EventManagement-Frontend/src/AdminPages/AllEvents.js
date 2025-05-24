import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./AllEvents.css";

const AdminAllEvents = () => {
  const [events, setEvents] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8084/api/events/getAllEvents"
      );
      setEvents(response.data);
    } catch (error) {
      console.error("Error fetching events:", error);
    }
  };

  const deleteEvent = async (eventId) => {
    try {
      await axios.delete(
        `http://localhost:8084/api/events/deleteEvents/${eventId}`
      );
      alert("Event deleted successfully!");
      fetchEvents(); // Refresh
    } catch (error) {
      console.error("Error deleting event:", error);
    }
  };

  const handleView = (eventId) => {
    navigate(`/event-details/${eventId}`);
  };

  return (
    <div className="admin-all-events-container">
      <h2 className="admin-all-events-header">All Events</h2>
      <div className="admin-all-events-card-grid">
        {events.map((event) => (
          <div key={event.id} className="admin-all-events-card">
            {event.imageData && (
              <img
                src={`data:image/jpeg;base64,${event.imageData}`}
                alt="Event"
                className="admin-all-events-image"
              />
            )}
            <h3>{event.title}</h3>
            <p>
              <strong>Date:</strong> {new Date(event.dateTime).toLocaleString()}
            </p>
            <p>
              <strong>Venue:</strong> {event.venue?.name || "N/A"}
            </p>
            <p>
              <strong>Category:</strong> {event.category?.name || "N/A"}
            </p>
            <div className="admin-all-events-btn-group">
              <button
                className="admin-all-events-btn-view"
                onClick={() => handleView(event.id)}
              >
                View
              </button>
              <button
                className="admin-all-events-btn-delete"
                onClick={() => deleteEvent(event.id)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminAllEvents;
