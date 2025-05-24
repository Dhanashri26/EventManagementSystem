import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './EventDetails.css';

const EventDetails = () => {
  const { id } = useParams();
  const [event, setEvent] = useState(null);

  useEffect(() => {
    axios
      .get(`http://localhost:8084/api/events/getOneEvent/${id}`)
      .then((res) => setEvent(res.data))
      .catch((err) => console.error('Failed to fetch event details:', err));
  }, [id]);

  if (!event) return <div className="event-details-loading">Loading...</div>;

  return (
    <div className="event-details-page">
      {/* Full top image */}
      {event.imageData && (
        <div className="event-image-banner">
          <img
            src={`data:image/jpeg;base64,${event.imageData}`}
            alt="Event"
            className="event-banner-img"
          />
        </div>
      )}

      {/* Details block */}
      <div className="event-info-container">
        <h1 className="event-title">{event.title}</h1>
        <p className="event-description">{event.description}</p>
        <p><strong>Date & Time:</strong> {new Date(event.dateTime).toLocaleString()}</p>
        <p><strong>Venue:</strong> {event.venue?.name || 'N/A'}</p>
        <p><strong>Category:</strong> {event.category?.name || 'N/A'}</p>
      </div>
    </div>
  );
};

export default EventDetails;
