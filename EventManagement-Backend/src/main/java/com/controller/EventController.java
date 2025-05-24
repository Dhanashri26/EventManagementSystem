package com.controller;

import java.io.IOException;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.time.format.DateTimeParseException;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.model.Category;
import com.model.Event;
import com.model.Venue;
import com.service.EventService;

@RestController
@RequestMapping("api/events")
@CrossOrigin(origins = "http://localhost:3000")
public class EventController {
	
	 @Autowired
	 private EventService eventService;
	
	 
	//Create a new event
	 @PostMapping("/createEvent")
		public ResponseEntity<Event> createEvent(@RequestParam("title") String title,
				@RequestParam("description") String description, @RequestParam("dateTime") String dateTime,
				@RequestParam("categoryId") Long categoryId, @RequestParam("venueId") Long venueId,
				@RequestParam("image") MultipartFile imageFile) {
			try {
				Event event = new Event();
				event.setTitle(title);
				event.setDescription(description);
				event.setDateTime(LocalDateTime.parse(dateTime)); // Ensure ISO format
				event.setImageData(imageFile.getBytes());

				// Set category and venue via service or dummy if not implemented
				Category category = new Category();
				category.setId(categoryId);
				event.setCategory(category);

				Venue venue = new Venue();
				venue.setId(venueId);
				event.setVenue(venue);

				Event createdEvent = eventService.createEvent(event);
				return ResponseEntity.status(HttpStatus.CREATED).body(createdEvent);
			} catch (IOException e) {
				return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
			}
		}
    
    @GetMapping("/getAllEvents")
    public ResponseEntity<List<Event>> getAllEvents() {
	        try {
	            List<Event> events = eventService.getAllEvents();
	            return ResponseEntity.ok(events);
	        } catch (Exception e) {
	            throw new RuntimeException("Internal Server Error"); // Simulate 500
	        }
    }
    
    // Get event by ID
  	 @GetMapping("/getOneEvent{id}")
  	 public ResponseEntity<Event> getEventById(@PathVariable Long id) {
  	        try {
  	            Event event = eventService.getEventById(id);
  	            return ResponseEntity.ok(event);
  	        } catch (Exception e) {
  	            throw new RuntimeException("Internal Server Error"); // Simulate 500
  	        }
  	  }
  	 
  // Update existing event by ID
 	@PutMapping("/updateEvents/{id}")
 	public ResponseEntity<?> updateEvent(@PathVariable("id") long id, @RequestParam("title") String title,
 			@RequestParam("description") String description, @RequestParam("dateTime") String dateTime,
 			@RequestParam("categoryId") Long categoryId, @RequestParam("venueId") Long venueId,
 			@RequestParam(value = "image", required = false) MultipartFile imageFile) {
 		try {
 			// Get the existing event
 			Optional<Event> optionalEvent = Optional.ofNullable(eventService.getEventById(id));
 			if (!optionalEvent.isPresent()) {
 				return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Event not found with ID: " + id);
 			}

 			Event existingEvent = optionalEvent.get();

 			// Update title and description
 			existingEvent.setTitle(title);
 			existingEvent.setDescription(description);

 			// Parse and set dateTime
 			try {
 				DateTimeFormatter formatter = DateTimeFormatter.ISO_DATE_TIME;
 				LocalDateTime parsedDateTime = LocalDateTime.parse(dateTime, formatter);
 				existingEvent.setDateTime(parsedDateTime);
 			} catch (DateTimeParseException e) {
 				return ResponseEntity.status(HttpStatus.BAD_REQUEST)
 						.body("Invalid dateTime format. Use ISO format like '2025-05-19T15:30:00'");
 			}

 			// Update image if provided
 			if (imageFile != null && !imageFile.isEmpty()) {
 				existingEvent.setImageData(imageFile.getBytes());
 			}

 			// Set category and venue
 			Category category = new Category();
 			category.setId(categoryId);
 			existingEvent.setCategory(category);

 			Venue venue = new Venue();
 			venue.setId(venueId);
 			existingEvent.setVenue(venue);

 			// Save updated event
 			Event updated = eventService.updateEvent(id, existingEvent);
 			return ResponseEntity.ok(updated);

 		} catch (IOException e) {
 			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to update image data.");
 		} catch (Exception e) {
 			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
 					.body("Error updating event: " + e.getMessage());
 		}
 	}
	 
	// Delete event by ID
    @DeleteMapping("/deleteEvents/{id}")
    public ResponseEntity<String> deleteEvent(@PathVariable Long id) {
        try {
            eventService.deleteEvent(id);
            return ResponseEntity.ok("Event deleted successfully.");
        } catch (Exception e) {
            throw new RuntimeException("Internal Server Error"); // Simulate 500
        }
    }
    
 // Count total number of events
 	@GetMapping("/countEvents")
 	public ResponseEntity<Long> countEvents() {
 		try {
 			long count = eventService.countEvents();
 			return ResponseEntity.ok(count);
 		} catch (Exception e) {
 			throw new RuntimeException("Internal Server Error");
 		}
 	}

 	@GetMapping("/search/title")
 	public List<Event> searchByTitle(@RequestParam String title) {
 		return eventService.searchByTitle(title);
 	}

 	@GetMapping("/search/category")
 	public List<Event> searchByCategory(@RequestParam String category) {
 		return eventService.searchByCategory(category);
 	}

 	@GetMapping("/search/venue")
 	public List<Event> searchByVenue(@RequestParam String venue) {
 		return eventService.searchByVenue(venue);
 	}
}

