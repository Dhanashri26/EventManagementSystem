import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import './EventRegistration.css';

const EventRegistration = () => {
  const [attendee, setAttendee] = useState({ name: '', email: '', eventId: '' });
  const [message, setMessage] = useState('');
  const navigate = useNavigate(); // Initialize navigate

  const handleChange = (e) => {
    setAttendee({ ...attendee, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`http://localhost:8084/attendee/register/${attendee.eventId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: attendee.name,
          email: attendee.email
        })
      });

      if (!res.ok) throw new Error('Registration failed');
      const data = await res.text();
      setMessage('Registration successful!');
      console.log(data);
      
      // Redirect to the success page
      navigate('/success'); 
    } catch (err) {
      setMessage('Error registering attendee');
      console.error(err);
    }
  };

  return (
    <div className="custom-container">
      <h2 className="custom-heading">Register for Event</h2>
      <form className="custom-form" onSubmit={handleSubmit}>
        <input
          className="custom-input"
          type="text"
          name="name"
          value={attendee.name}
          onChange={handleChange}
          placeholder="Name"
          required
        />
        <input
          className="custom-input"
          type="email"
          name="email"
          value={attendee.email}
          onChange={handleChange}
          placeholder="Email"
          required
        />
        <input
          className="custom-input"
          type="number"
          name="eventId"
          value={attendee.eventId}
          onChange={handleChange}
          placeholder="Event ID"
          required
        />
        <input
          className="custom-input"
          type="title"
          name="title"
          value={attendee.title}
          onChange={handleChange}
          placeholder="Title"
          required
        
        />
        <button className="custom-button" type="submit">Register</button>
      </form>
      <p className="custom-message">{message}</p>
    </div>
  );
}

export default EventRegistration;
