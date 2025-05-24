import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import axios from "axios";
import '../AllDashboards/AttendeeDashboard.css';

const AttendeeDashboard = () => {
  const [events, setEvents] = useState([]);
  const [searchTitle, setSearchTitle] = useState("");
  const [searchDate, setSearchDate] = useState("");

  const searchByTitle = async () => {
    if (!searchTitle.trim()) return;
    try {
      const res = await axios.get(`http://localhost:8084/api/events/search/title`, {
        params: { title: searchTitle }
      });
      setEvents(res.data);
    } catch (err) {
      console.error("Failed to search by title", err);
    }
  };

  const searchByDate = async () => {
    if (!searchDate) return;
    try {
      const res = await axios.get(`http://localhost:8084/events/search/date`, {
        params: { date: searchDate }
      });
      setEvents(res.data);
    } catch (err) {
      console.error("Failed to search by date", err);
    }
  };

  return (
    <div className="attendee-dashboard sidebar-layout">
      <aside className="sidebar">
        <nav className="sidebar-nav">
          <Link to="/attendee/events" className="sidebar-link">Browse Events</Link>
          <Link to="/attendee/registrations" className="sidebar-link">My Registrations</Link>
          <Link to="/" className="sidebar-link logout-link">Logout</Link>
        </nav>
      </aside>

      <main className="dashboard-main">
        <div className="dashboard-header">
          <h2>Welcome, Attendee!</h2>
          <p>Choose an option from the sidebar.</p>
        </div>

        <div className="search-section">
          <input
            type="text"
            placeholder="Search by event title"
            value={searchTitle}
            onChange={(e) => setSearchTitle(e.target.value)}
          />
          <button onClick={searchByTitle}>Search Title</button>

          <input
            type="date"
            value={searchDate}
            onChange={(e) => setSearchDate(e.target.value)}
          />
          <button onClick={searchByDate}>Search Date</button>
        </div>

        <div className="events-list">
          {events.length > 0 && events.map(event => (
            <div key={event.id} className="event-card">
              <h3>{event.title}</h3>
              <p>Date: {event.date}</p>
              {event.image && (
                <img
                  src={`data:image/jpeg;base64,${event.image}`}
                  alt="Event"
                  className="event-image"
                />
              )}
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default AttendeeDashboard;
