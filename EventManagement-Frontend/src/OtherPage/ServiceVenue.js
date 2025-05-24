import React from 'react'

const ServiceVenue = () => {
  return (
    <div>
      <div className="venue-card">
      <div className="venue-images">
        <img src="/assets/contactScreenImage1.jpeg" alt="venue1" />
        {/* Ekde img takshil */}
        <img src="/assets/contactScreenImage2.jpeg" alt="venue2" />
        <img src="/assets/contactScreenImage3.jpeg" alt="venue3" />
        <img src="/assets/contactScreenImage4.jpeg" alt="venue4" />
      </div>

      <div className="venue-content">
        <h2>Struggling to find the perfect venue?</h2>
          <p>
            Find your perfect venue hassle-free with <strong>Melodia</strong>.<br />
            Easy booking, endless choices.
          </p>
        <button className="explore-btn">Explore Venues</button>
         <div className="leaf"></div>
      </div>
    </div>
    </div>
  )
}

export default ServiceVenue
