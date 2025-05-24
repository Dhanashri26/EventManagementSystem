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
import org.springframework.web.bind.annotation.RestController;

import com.model.Attendee;
import com.model.AttendeeEventInfoDTO;
import com.service.AttendeeService;
import com.service.CategoryService;

@RestController
@RequestMapping("api/attendee")
@CrossOrigin(origins = "http://localhost:3000")

public class AttendeeController {
	
	@Autowired
	private AttendeeService attendeeService;
	
	@PostMapping("/register/{eventId}")
	public ResponseEntity<String> registerAttendee(@PathVariable Long eventId, @RequestBody Attendee attendee) {
		try {
			attendeeService.registerAttendee(eventId, attendee);
			return new ResponseEntity<>("Registration successful", HttpStatus.CREATED);
		} catch (Exception e) {
			return new ResponseEntity<>("Error registering attendee: " + e.getMessage(), HttpStatus.BAD_REQUEST);
		}
	}
	
	@PostMapping("/add/{eventId}")
    public ResponseEntity<?> addAttendeeToEvent(@PathVariable Long eventId, @RequestBody Attendee attendee) {
        try {
            AttendeeEventInfoDTO dto = attendeeService.createAttendee(eventId, attendee);
            return ResponseEntity.status(HttpStatus.CREATED)
                                 .header("info", "Attendee added to event successfully")
                                 .body(dto);
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                                 .body(e.getMessage());
        }
    }
	
	@GetMapping("/getAll")
	public ResponseEntity<List<AttendeeEventInfoDTO>> getAllAttendees() {
		List<AttendeeEventInfoDTO> attendeeList = attendeeService.getAllAttendees();
		return ResponseEntity.ok(attendeeList);
	}

	@GetMapping("/getOne/{id}")
	public ResponseEntity<?> getAttendeeById(@PathVariable Long id) {
		try {
			Attendee attendee = attendeeService.getAttendeeById(id);
			return ResponseEntity.ok(attendee);
		} catch (RuntimeException e) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
		}
	}
	
	// Update attendee details
	@PutMapping("/update/{id}")
	public ResponseEntity<?> updateAttendee(@PathVariable Long id, @RequestBody Attendee updatedAttendee) {

		try {
			Attendee updated = attendeeService.updateAttendee(id, updatedAttendee);
			return ResponseEntity.ok(updated);
		} catch (RuntimeException e) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
		}
	}
	
	// Delete attendee by ID
	@DeleteMapping("/delete/{id}")
	public ResponseEntity<?> deleteAttendee(@PathVariable Long id) {
		try {
			attendeeService.deleteAttendee(id);
			return ResponseEntity.ok("Attendee deleted successfully.");
		} catch (RuntimeException e) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
		}
	}
	
	// Cancel Event
	@DeleteMapping("/{id}")
	public ResponseEntity<String> cancelRegistration(@PathVariable Long id) {
		boolean deleted = attendeeService.cancelRegistration(id);
		if (deleted) {
			return ResponseEntity.ok("Registration cancelled successfully.");
		} else {
			return ResponseEntity.notFound().build();
		}
	}
}
