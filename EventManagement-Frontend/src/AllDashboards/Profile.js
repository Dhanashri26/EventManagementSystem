import React, { useEffect, useState } from "react";
import axios from "axios";

const Profile = () => {
  const [name, setName] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const userEmail = "choudhurydivya01@gmail.com"; // Hardcode the email to test

    if (userEmail) {
      axios
        .get(`http://localhost:8084/api/auth/profile?email=${userEmail}`)
        .then((response) => {
          setName(response.data.name); // Assume response.data contains name
        })
        .catch((error) => {
          console.error("Error fetching user name:", error);
          setError("User not found or API error.");
        });
    } else {
      setError("No email found. Please login first.");
    }
  }, []);

  return (
    <div style={{ padding: "20px", fontFamily: "Arial" }}>
      <h2>User Profile</h2>
      {error ? <p style={{ color: "red" }}>{error}</p> : <p><strong>Name:</strong> {name}</p>}
    </div>
  );
};

export default Profile;
