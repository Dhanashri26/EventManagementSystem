import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../AllDashboards/AdminDashboard.css';

const AdminDashboard = () => {
  const navigate = useNavigate();

  // States for category search
  const [categorySearchTerm, setCategorySearchTerm] = useState('');
  const [categoryResults, setCategoryResults] = useState([]);

  // States for venue search and filter
  const [venueSearchTerm, setVenueSearchTerm] = useState('');
  const [venueFilterLocation, setVenueFilterLocation] = useState('');
  const [venueResults, setVenueResults] = useState([]);

  // Loading and error states (optional but better UX)
  const [loading, setLoading] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/');
  };

  // Reusable fetch wrapper for handling API calls
  const fetchData = async (url, setResults, errorMsg) => {
    try {
      setLoading(true);
      const res = await fetch(url);
      if (res.status === 204) {
        setResults([]);
      } else if (res.ok) {
        const data = await res.json();
        setResults(data);
      } else {
        alert(`Error: ${res.status} ${res.statusText}`);
      }
    } catch (error) {
      console.error(errorMsg, error);
      alert(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  const handleCategorySearch = () => {
    if (!categorySearchTerm.trim()) {
      alert('Please enter a category name.');
      return;
    }
    fetchData(
      `http://localhost:8084/api/category/searchCategory?name=${encodeURIComponent(categorySearchTerm.trim())}`,
      setCategoryResults,
      'Error while searching categories.'
    );
  };

  const handleVenueSearch = () => {
    if (!venueSearchTerm.trim()) {
      alert('Please enter a venue name.');
      return;
    }
    fetchData(
      `http://localhost:8084/api/venue/search/venue?venue=${encodeURIComponent(venueSearchTerm.trim())}`,
      setVenueResults,
      'Error while searching venues.'
    );
  };

  const handleVenueFilter = () => {
    if (!venueFilterLocation.trim()) {
      alert('Please enter a location to filter.');
      return;
    }
    fetchData(
      `http://localhost:8084/api/venue/filter?location=${encodeURIComponent(venueFilterLocation.trim())}`,
      setVenueResults,
      'Error while filtering venues.'  
    );
  };

  return (
    <div className="admin-dashboard">
      <aside className="admin-sidebar">
        <ul>
          <li><Link to="/admin/events">All Events</Link></li>
          <li><Link to="/admin/categories">Manage Categories</Link></li>
          <li><Link to="/admin/venues">Manage Venues</Link></li>
          <li><button onClick={handleLogout} className="logout-btn">Logout</button></li>
        </ul>
      </aside>

      <main className="admin-content">
        <h1>Welcome, Admin</h1>

        {/* Category Search */}
        <section className="category-search-section">
          <h3>Search Categories</h3>
          <div className="search-box">
            <input
              type="text"
              placeholder="Enter category name"
              value={categorySearchTerm}
              onChange={(e) => setCategorySearchTerm(e.target.value)}
              className="search-input"
              onKeyDown={(e) => e.key === 'Enter' && handleCategorySearch()}
            />
            <button onClick={handleCategorySearch} className="search-btn" disabled={loading}>
              {loading ? 'Searching...' : 'Search'}
            </button>
          </div>
          {categoryResults.length > 0 ? (
            <ul className="search-results">
              {categoryResults.map((cat) => (
                <li key={cat.id}>{cat.name}</li>
              ))}
            </ul>
          ) : (
            categorySearchTerm && !loading && <p>No categories found.</p>
          )}
        </section>

        {/* Venue Search */}
        <section className="venue-search-section">
          <h3>Search Venues by Name</h3>
          <div className="search-box">
            <input
              type="text"
              placeholder="Enter venue name"
              value={venueSearchTerm}
              onChange={(e) => setVenueSearchTerm(e.target.value)}
              className="search-input"
              onKeyDown={(e) => e.key === 'Enter' && handleVenueSearch()}
            />
            <button onClick={handleVenueSearch} className="search-btn" disabled={loading}>
              {loading ? 'Searching...' : 'Search'}
            </button>
          </div>

          <h3>Filter Venues by Location</h3>
          <div className="search-box">
            <input
              type="text"
              placeholder="Enter location"
              value={venueFilterLocation}
              onChange={(e) => setVenueFilterLocation(e.target.value)}
              className="search-input"
              onKeyDown={(e) => e.key === 'Enter' && handleVenueFilter()}
            />
            <button onClick={handleVenueFilter} className="search-btn" disabled={loading}>
              {loading ? 'Filtering...' : 'Filter'}
            </button>
          </div>

          {venueResults.length > 0 ? (
            <ul className="search-results">
              {venueResults.map((venue) => (
                <li key={venue.id}>
                  <strong>{venue.name}</strong> - {venue.location}
                </li>
              ))}
            </ul>
          ) : (
            (venueSearchTerm || venueFilterLocation) && !loading && <p>No venues found.</p>
          )}
        </section>
      </main>
    </div>
  );
};

export default AdminDashboard;
