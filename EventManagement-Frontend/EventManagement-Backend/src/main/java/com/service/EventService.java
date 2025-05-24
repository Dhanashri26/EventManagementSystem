package com.service;

import java.util.List;

import com.model.Event;

public interface EventService {

	// Create and save a new event
		Event createEvent(Event event);

		// Fetch all events without pagination
		List<Event> getAllEvents();

		// Get a single event by its ID
		Event getEventById(Long id);

		// Update an existing event using ID
		Event updateEvent(Long id, Event eventDetails);

		// Delete an event by ID
		void deleteEvent(Long id);

		long countEvents();

		List<Event> searchByTitle(String title);

		List<Event> searchByCategory(String categoryName);

		List<Event> searchByVenue(String venueName);
	



}
