import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaEdit, FaTrash } from "react-icons/fa"; // Importing Font Awesome icons
import "./ManageVenues.css";

const ManageVenues = () => {
  const [venues, setVenues] = useState([]);
  const [newVenue, setNewVenue] = useState({ name: "", location: "" });
  const [isEditing, setIsEditing] = useState(false);
  const [venueId, setVenueId] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:8084/api/venue/getAllVenues")
      .then((response) => setVenues(response.data))
      .catch((error) => console.error("Error fetching venues:", error));
  }, []);

  const handleAddVenue = () => {
    if (newVenue.name && newVenue.location) {
      axios
        .post("http://localhost:8084/api/venue/createVenue", newVenue, {
          headers: {
            "Content-Type": "application/json",
          },
        })
        .then((response) => {
          setVenues([...venues, response.data]);
          setNewVenue({ name: "", location: "" });
        })
        .catch((error) => console.error("Error adding venue:", error));
    }
  };

  const handleDeleteVenue = (id) => {
    axios
      .delete(`http://localhost:8084/api/venue/deleteVenue/${id}`)
      .then(() => {
        setVenues(venues.filter((venue) => venue.id !== id));
      })
      .catch((error) => console.error("Error deleting venue:", error));
  };

  const handleEditVenue = (id, name, location) => {
    setIsEditing(true);
    setVenueId(id);
    setNewVenue({ name, location });
  };

  const handleUpdateVenue = () => {
    if (newVenue.name && newVenue.location && venueId !== null) {
      axios
        .put(
          `http://localhost:8084/api/venue/updateVenue/${venueId}`,
          newVenue
        )
        .then((response) => {
          setVenues(
            venues.map((venue) =>
              venue.id === venueId ? response.data : venue
            )
          );
          setIsEditing(false);
          setVenueId(null);
          setNewVenue({ name: "", location: "" });
        })
        .catch((error) => console.error("Error updating venue:", error));
    }
  };

  return (
    <div className="manage-venues-container">
      <h2>Manage Venues</h2>
      <div className="form-container">
        <input
          type="text"
          value={newVenue.name}
          onChange={(e) => setNewVenue({ ...newVenue, name: e.target.value })}
          placeholder="Venue Name"
        />
        <input
          type="text"
          value={newVenue.location}
          onChange={(e) =>
            setNewVenue({ ...newVenue, location: e.target.value })
          }
          placeholder="Venue Location"
        />
        {isEditing ? (
          <button className="btn update-btn" onClick={handleUpdateVenue}>
            Update Venue
          </button>
        ) : (
          <button className="btn add-btn" onClick={handleAddVenue}>
            Add Venue
          </button>
        )}
      </div>

      <table className="venues-table">
        <thead>
          <tr>
            <th>Id</th>
            <th>Venue Name</th>
            <th>Location</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {venues.map((venue) => (
            <tr key={venue.id} className="venue-row">
              <td>{venue.id}</td> 
              <td>{venue.name}</td>
              <td>{venue.location}</td>
              <td className="action-buttons">
                <button
                  className="btn edit-btn"
                  onClick={() =>
                    handleEditVenue(venue.id, venue.name, venue.location)}>
                  <FaEdit /> {/* Edit Icon */}
                </button>
                <button
                  className="btn delete-btn"
                  onClick={() => handleDeleteVenue(venue.id)}>
                  <FaTrash /> {/* Delete Icon */}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ManageVenues;
