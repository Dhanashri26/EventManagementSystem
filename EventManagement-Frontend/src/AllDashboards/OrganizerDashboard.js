import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../AllDashboards/OrganizerDashboard.css";
import { FaCalendarCheck, FaPlusSquare, FaSignOutAlt } from "react-icons/fa";
import axios from "axios";

const OrganizerDashboard = () => {
  const [totalEvents, setTotalEvents] = useState(0);
  const [upcomingEvents, setUpcomingEvents] = useState(0);

  const [venueName, setVenueName] = useState("");
  const [categoryName, setCategoryName] = useState("");
  const [eventTitle, setEventTitle] = useState("");
  const [filteredEvents, setFilteredEvents] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8084/api/events/countEvents")
      .then((response) => setTotalEvents(response.data))
      .catch((error) =>
        console.error("Error fetching total event count:", error)
      );

    axios
      .get("http://localhost:8084/api/events/getAllEvents")
      .then((response) => {
        const events = response.data;
        const todayDateOnly = new Date();
        todayDateOnly.setHours(0, 0, 0, 0);

        const upcoming = events.filter(
          (event) => new Date(event.dateTime) >= todayDateOnly
        ).length;
        setUpcomingEvents(upcoming);
      })
      .catch((error) => console.error("Error fetching all events:", error));
  }, []);

  const handleSearch = async (e) => {
    e.preventDefault();
    let results = [];

    try {
      if (eventTitle.trim()) {
        const titleResponse = await axios.get(
          `http://localhost:8084/api/events/search/title`,
          {
            params: { title: eventTitle },
          }
        );
        results = titleResponse.data;
      } else if (categoryName.trim()) {
        const categoryResponse = await axios.get(
          `http://localhost:8084/api/events/search/category`,
          {
            params: { category: categoryName },
          }
        );
        results = categoryResponse.data;
      } else if (venueName.trim()) {
        const venueResponse = await axios.get(
          `http://localhost:8084/api/events/search/venue`,
          {
            params: { venue: venueName },
          }
        );
        results = venueResponse.data;
      }

      setFilteredEvents(results);
    } catch (error) {
      console.error("Error fetching filtered events:", error);
      setFilteredEvents([]);
    }
  };

  return (
    <div className="org-dashboard-wrapper">
      <aside className="org-sidebar">
        <h2 className="org-sidebar-title">Organizer</h2>
        <ul className="org-sidebar-menu">
          <li>
            <Link to="/organizer/allEvents" className="org-link">
              <FaCalendarCheck className="org-icon" />
              <span>My Events</span>
            </Link>
          </li>
          <li>
            <Link to="/organizer/events" className="org-link">
              <FaPlusSquare className="org-icon" />
              <span>Create Event</span>
            </Link>
          </li>
          <li>
            <Link to="/" className="org-link">
              <FaSignOutAlt className="org-icon" />
              <span>Logout</span>
            </Link>
          </li>
        </ul>
      </aside>

      <main className="org-main-content">
        <h1>Welcome, Organizer!</h1>
        <p>Use the side menu to manage and create your events.</p>

        <div className="org-dashboard-info">
          <div className="org-info-card">
            <h3>{totalEvents}</h3>
            <p>Total Events</p>
          </div>
          <div className="org-info-card">
            <h3>{upcomingEvents}</h3>
            <p>Upcoming Events</p>
          </div>
        </div>

        {/* Filter Section */}
        <section className="org-event-filter">
          <h3>Search Events</h3>
          <form onSubmit={handleSearch} className="org-filter-form">
            <input
              type="text"
              placeholder="Venue Name"
              value={venueName}
              onChange={(e) => setVenueName(e.target.value)}
            />
            <input
              type="text"
              placeholder="Category Name"
              value={categoryName}
              onChange={(e) => setCategoryName(e.target.value)}
            />
            <input
              type="text"
              placeholder="Event Title"
              value={eventTitle}
              onChange={(e) => setEventTitle(e.target.value)}
            />
            <button type="submit">Search</button>
          </form>

          <div className="org-filtered-results">
            <h5>Filtered Events:</h5>
            {filteredEvents.length === 0 ? (
              <p>No events found.</p>
            ) : (
              <ul className="org-event-list">
                <div className="org-card-grid">
                  {filteredEvents.map((event) => (
                    <div key={event.id} className="org-event-card">
                      <div className="org-event-info">
                        <h4 className="org-event-title">{event.title}</h4>
                        <p>
                          <strong>Date & Time:</strong>{" "}
                          {new Date(event.dateTime).toLocaleString()}
                        </p>
                        <p>
                          <strong>Venue:</strong> {event.venue?.name}
                        </p>
                        <p>
                          <strong>Category:</strong> {event.category?.name}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </ul>
            )}
          </div>
        </section>
      </main>
    </div>
  );
};

export default OrganizerDashboard;
