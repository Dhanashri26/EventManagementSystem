package com.service;

import java.util.List;
import java.util.Optional;

import com.model.Venue;

public interface VenueService {

	Venue createVenue(Venue venue);
	List<Venue> getAllVenues();
	
	// Search venues by name (case-insensitive)
	List<Venue> searchByName(String venueName);
	
	// Get a venue by ID, return Optional to allow better error handling
    Optional<Venue> getVenueById(Long id);
    
    // Update venue by ID
	Venue updateVenue(Long id, Venue venueDetails);
	
	 // Delete venue by ID
	void deleteVenue(Long id);
	
	//filter venue by location
	List<Venue> filterByLocation(String location); 


}
