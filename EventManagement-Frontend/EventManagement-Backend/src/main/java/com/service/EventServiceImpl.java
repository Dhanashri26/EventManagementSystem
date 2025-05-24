package com.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.dao.CategoryRepository;
import com.dao.EventRepository;
import com.dao.VenueRepository;
import com.model.Category;
import com.model.Event;
import com.model.Venue;

@Service
public class EventServiceImpl implements EventService {

	@Autowired
	private EventRepository eventRepo;
	
	@Autowired
	private VenueRepository venueRepo;
	
	@Autowired
	private CategoryRepository categoryRepo;
	

	@Override
	public Event createEvent(Event event) {
		 // Fetch the full Venue and Category from DB
		Venue venue = venueRepo.findById(event.getVenue().getId())
                .orElseThrow(() -> new RuntimeException("Venue not found"));
		
		Category category = categoryRepo.findById(event.getCategory().getId())
		                .orElseThrow(() -> new RuntimeException("Category not found"));
		
		// Set the fetched Venue and Category to the Event
		event.setVenue(venue);
		event.setCategory(category);
		
		// Save and return the event
		return eventRepo.save(event);
	}


	@Override
	public List<Event> getAllEvents() {
		return eventRepo.findAll();
	}


	@Override
	public Event getEventById(Long id) {
		return eventRepo.findById(id).orElseThrow(() -> new RuntimeException("Event with ID " + id + " not found"));
	}


	@Override
	public Event updateEvent(Long id, Event eventDetails) {
		Event existing = eventRepo.findById(id)
              .orElseThrow(() -> new RuntimeException("Event with ID " + id + " not found"));

		// Update the fields
				existing.setTitle(eventDetails.getTitle());
				existing.setDescription(eventDetails.getDescription());
				existing.setDateTime(eventDetails.getDateTime());
				existing.setVenue(eventDetails.getVenue());
				existing.setCategory(eventDetails.getCategory());
				existing.setImageData(eventDetails.getImageData());

				return eventRepo.save(existing);
	}


	@Override
	public void deleteEvent(Long id) {
		Event existing = eventRepo.findById(id)
                .orElseThrow(() -> new RuntimeException("Event with ID " + id + " not found"));
        eventRepo.delete(existing);	
	}

	@Override
	public long countEvents() {
		return eventRepo.count();
	}

	@Override
	public List<Event> searchByTitle(String title) {
		return eventRepo.findByTitleContainingIgnoreCase(title);
	}

	@Override
	public List<Event> searchByCategory(String categoryName) {
		return eventRepo.findByCategoryName(categoryName);
	}

	@Override
	public List<Event> searchByVenue(String venueName) {
		return eventRepo.findByVenueName(venueName);
	}	
}
