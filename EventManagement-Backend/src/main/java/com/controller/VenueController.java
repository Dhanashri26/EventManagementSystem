package com.controller;

import java.util.List;

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

import com.model.Venue;
import com.service.VenueService;

@RestController
@RequestMapping("api/venue")
@CrossOrigin(origins = "http://localhost:3000") 
public class VenueController {
	
	  @Autowired
	    private VenueService venueService;
	  
	  //Add new venue
	  @PostMapping("/createVenue")
	    public ResponseEntity<Venue> addVenue(@RequestBody Venue venue) {
	        Venue createdVenue = venueService.createVenue(venue);
	        return ResponseEntity.status(HttpStatus.CREATED).body(createdVenue);
	   }
	  
	  @GetMapping("/getAllVenues")
	    public ResponseEntity<List<Venue>> getAllVenues() {
	        List<Venue> venues = venueService.getAllVenues();
	        return ResponseEntity.ok(venues);
	    }
	  
	// Search venues by name (case-insensitive)
	    @GetMapping("/search/venue")
	    public ResponseEntity<List<Venue>> searchByName(@RequestParam String venue) {
	        List<Venue> venues = venueService.searchByName(venue);
	        return venues.isEmpty() 
	            ? ResponseEntity.status(HttpStatus.NO_CONTENT).build()
	            : ResponseEntity.ok(venues);
	    }
	    
	 // Get venue by ID
	    @GetMapping("/getVenueById/{id}")
	    public ResponseEntity<Venue> getVenueById(@PathVariable Long id) {
	        return venueService.getVenueById(id)
	                .map(ResponseEntity::ok)
	                .orElseGet(() -> ResponseEntity.status(HttpStatus.NOT_FOUND).build());
	    }
	    
	 // Update a venue by ID
	    @PutMapping("/updateVenue/{id}")
	    public ResponseEntity<Venue> updateVenue(@PathVariable Long id, @RequestBody Venue venueDetails) {
	        try {
	            Venue updatedVenue = venueService.updateVenue(id, venueDetails);
	            return ResponseEntity.ok(updatedVenue);
	        } catch (RuntimeException e) {
	            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
	        }
	    }
	   
	 // Delete a venue by ID
	    @DeleteMapping("/deleteVenue/{id}")
	    public ResponseEntity<String> deleteVenue(@PathVariable Long id) {
	        try {
	            venueService.deleteVenue(id);
	            return ResponseEntity.ok("Venue deleted successfully.");
	        } catch (RuntimeException e) {
	            return ResponseEntity.status(HttpStatus.NOT_FOUND)
	                                 .body("Venue not found.");
	        }
	    }
	    
	 // Filter venues by location (case-insensitive)
	    @GetMapping("/filter")
	    public ResponseEntity<List<Venue>> filterByLocation(@RequestParam String location) {
	        List<Venue> venues = venueService.filterByLocation(location);
	        return venues.isEmpty() 
	            ? ResponseEntity.status(HttpStatus.NO_CONTENT).build()
	            : ResponseEntity.ok(venues);
	    }
}
