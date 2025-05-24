package com.service;

import java.util.List;

import com.model.Attendee;
import com.model.AttendeeEventInfoDTO;

public interface AttendeeService {
	Attendee registerAttendee(Long eventId, Attendee attendee);

	AttendeeEventInfoDTO createAttendee(Long eventId, Attendee attendee);

	List<AttendeeEventInfoDTO> getAllAttendees();

	Attendee getAttendeeById(Long id);

	Attendee updateAttendee(Long id, Attendee updatedAttendee);

	void deleteAttendee(Long id);

	boolean cancelRegistration(Long id);

}
