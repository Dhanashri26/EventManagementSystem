import React, { useState, useEffect } from "react";
import axios from "axios";
import "./CreateEvent.css";
import { useNavigate } from "react-router-dom";

const CreateEvent = () => {
  const [categories, setCategories] = useState([]);
  const [venues, setVenues] = useState([]);
  const [imageFile, setImageFile] = useState(null);

  const [eventData, setEventData] = useState({
    title: "",
    description: "",
    dateTime: "",
    venue: "",
    category: "",
  });

  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:8084/api/categories/getAllCategories")
      .then((res) => setCategories(res.data))
      .catch((err) => console.error("Error fetching categories:", err));

    axios
      .get("http://localhost:8084/api/venues/getAllVenues")
      .then((res) => setVenues(res.data))
      .catch((err) => console.error("Error fetching venues:", err));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEventData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    setImageFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", eventData.title);
    formData.append("description", eventData.description);
    formData.append("dateTime", eventData.dateTime);
    formData.append("venueId", eventData.venue);
    formData.append("categoryId", eventData.category);
    if (imageFile) {
      formData.append("image", imageFile);
    }

    try {
      await axios.post(
        "http://localhost:8084/api/events/createEvent",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      alert("Event added successfully!");
      navigate("/organizer/allEvents");
    } catch (error) {
      console.error("Error adding event:", error);
      alert("Failed to add event.");
    }
  };

  return (
    <div className="create-event-container">
      <h2>Create New Event</h2>
      <form
        onSubmit={handleSubmit}
        className="event-form"
        encType="multipart/form-data"
      >
        <div className="form-group">
          <label>Title</label>
          <input
            type="text"
            name="title"
            value={eventData.title}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Date & Time</label>
          <input
            type="datetime-local"
            name="dateTime"
            value={eventData.dateTime}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Description</label>
          <input
            type="text"
            name="description"
            value={eventData.description}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Venue</label>
          <select
            name="venue"
            value={eventData.venue}
            onChange={handleChange}
            required
          >
            <option value="">-- Select Venue --</option>
            {venues.map((venue) => (
              <option key={venue.id} value={venue.id}>
                {venue.name}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label>Category</label>
          <select
            name="category"
            value={eventData.category}
            onChange={handleChange}
            required
          >
            <option value="">-- Select Category --</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label>Image</label>
          <input type="file" accept="image/*" onChange={handleFileChange} />
        </div>

        <button type="submit" className="submit-btn">
          Add Event
        </button>
      </form>
    </div>
  );
};

export default CreateEvent;
