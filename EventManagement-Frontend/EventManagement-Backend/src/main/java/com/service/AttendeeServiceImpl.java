package com.service;

import java.time.format.DateTimeFormatter;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.dao.AttendeeRepository;

import com.dao.EventRepository;
import com.model.Attendee;
import com.model.AttendeeEventInfoDTO;
import com.model.Event;

@Service
public class AttendeeServiceImpl implements AttendeeService {
	
	@Autowired
	private AttendeeRepository attendeeRepo;
	
	@Autowired
	private EventRepository eventRepo;

	@Override
	public AttendeeEventInfoDTO createAttendee(Long eventId, Attendee attendee) {
		Event event = eventRepo.findById(eventId)
				.orElseThrow(() -> new RuntimeException("Event with ID " + eventId + " not found"));

		// Associate event with attendee and save
		attendee.setEvent(event);
		Attendee saved = attendeeRepo.save(attendee);

		// Format the event date to string (e.g. "2025-05-20 14:30")
		String formattedDate = event.getDateTime().format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm"));

		// Create and return the populated DTO
		return new AttendeeEventInfoDTO(saved.getId(), saved.getName(), saved.getEmail(),

				event.getId(), event.getTitle(), formattedDate, event.getImageData());
	}
	
	@Override
	public List<AttendeeEventInfoDTO> getAllAttendees() {
	    List<Attendee> attendees = attendeeRepo.findAll();
	    return attendees.stream().map(attendee -> {
	        Event event = attendee.getEvent();
	        String formattedDate = event.getDateTime().format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm"));
	        return new AttendeeEventInfoDTO(
	            attendee.getId(),
	            attendee.getName(),
	            attendee.getEmail(),
	            event.getId(),
	            event.getTitle(),
	            formattedDate,
	            event.getImageData()
	        );
	    }).toList();
	}

	@Override
	public Attendee getAttendeeById(Long id) {
		return attendeeRepo.findById(id)
				.orElseThrow(() -> new RuntimeException("Attendee with ID " + id + " not found"));
	}

	@Override
	public Attendee updateAttendee(Long id, Attendee updated) {
		Attendee attendee = attendeeRepo.findById(id)
				.orElseThrow(() -> new RuntimeException("Attendee with ID " + id + " not found"));

		attendee.setName(updated.getName());
		attendee.setEmail(updated.getEmail());

		return attendeeRepo.save(attendee);
	}
	
	@Override
	public void deleteAttendee(Long id) {
		Attendee attendee = attendeeRepo.findById(id)
				.orElseThrow(() -> new RuntimeException("Attendee with ID " + id + " not found"));

		attendeeRepo.delete(attendee);

	}

	public Attendee registerAttendee(Long eventId, Attendee attendee) {
		// Fetch the event by ID
		Event event = eventRepo.findById(eventId).orElseThrow(() -> new RuntimeException("Event not found"));

		// Set the event for the attendee
		attendee.setEvent(event);

		// Save and return the attendee
		return attendeeRepo.save(attendee);
	}
	
	@Override
	public boolean cancelRegistration(Long attendeeId) {
		if (attendeeRepo.existsById(attendeeId)) {
			attendeeRepo.deleteById(attendeeId);
			return true;
		}
		return false;
	}
}
