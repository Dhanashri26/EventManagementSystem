import React, { useEffect, useState } from "react";
import axios from "axios";
import "./MyEvents.css";

// New Edit form component
const EditEventForm = ({ event, onCancel, onUpdate }) => {
  const [formData, setFormData] = useState({
    title: event.title || "",
    description: event.description || "", // Add this
    dateTime: event.dateTime ? event.dateTime.slice(0, 16) : "",
    categoryId: event.category?.id || "",
    venueId: event.venue?.id || "",
    imageFile: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "imageFile") {
      setFormData((prev) => ({ ...prev, imageFile: files[0] }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdate(formData);
  };

  return (
    <div className="modal-overlay">
      <div className="edit-modal">
        <h3>Edit Event</h3>
        <form onSubmit={handleSubmit}>
          <label>Title</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
          />

          <label>Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
          />

          <label>Date & Time</label>
          <input
            type="datetime-local"
            name="dateTime"
            value={formData.dateTime}
            onChange={handleChange}
            required
          />

          <label>Category ID</label>
          <input
            type="number"
            name="categoryId"
            value={formData.categoryId}
            onChange={handleChange}
            required
          />

          <label>Venue ID</label>
          <input
            type="number"
            name="venueId"
            value={formData.venueId}
            onChange={handleChange}
            required
          />

          <label>Image (optional)</label>
          <input
            type="file"
            name="imageFile"
            accept="image/*"
            onChange={handleChange}
          />

          <div className="btn-group" style={{ marginTop: "15px" }}>
            <button type="submit" className="btn-edit">
              Update
            </button>
            <button
              type="button"
              className="btn-cancel"
              onClick={onCancel}
              style={{ marginLeft: "10px" }}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

const MyEvents = () => {
  const [events, setEvents] = useState(null);
  const [editingEvent, setEditingEvent] = useState(null);

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
      fetchEvents();
    } catch (error) {
      console.error("Error deleting event:", error);
    }
  };

  // Called from EditEventForm submit
  const handleUpdate = async (formData) => {
    try {
      const updatePayload = new FormData();
      updatePayload.append("title", formData.title);
      updatePayload.append("description", formData.description); // Add this line
      updatePayload.append("dateTime", formData.dateTime);
      updatePayload.append("categoryId", formData.categoryId);
      updatePayload.append("venueId", formData.venueId);
      if (formData.imageFile) {
        updatePayload.append("image", formData.imageFile);
      }

      await axios.put(
        `http://localhost:8084/api/events/updateEvents/${editingEvent.id}`,
        updatePayload,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      alert("Event updated successfully!");
      setEditingEvent(null);
      fetchEvents();
    } catch (error) {
      console.error("Error updating event:", error);
      alert(error.response?.data?.message || "Failed to update event.");
    }
  };

  if (events === null) return <div className="loading">Loading...</div>;

  return (
    <div className="my-events-container" style={{ paddingTop: "80px" }}>
      {/* paddingTop to avoid navbar overlap */}

      <h2 className="header">My Events</h2>
      <div className="card-grid">
        {events.map((event) => (
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
              <strong>Date:</strong> {new Date(event.dateTime).toLocaleString()}
            </p>
            <p>
              <strong>Venue:</strong> {event.venue?.name || "N/A"}
            </p>
            <p>
              <strong>Category:</strong> {event.category?.name || "N/A"}
            </p>
            <div className="btn-group">
              <button
                className="btn-edit"
                onClick={() => setEditingEvent(event)}
              >
                Edit
              </button>
              <button
                className="btn-delete"
                onClick={() => deleteEvent(event.id)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {editingEvent && (
        <EditEventForm
          event={editingEvent}
          onCancel={() => setEditingEvent(null)}
          onUpdate={handleUpdate}
        />
      )}
    </div>
  );
};

export default MyEvents;
