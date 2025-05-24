package com.model;

public class AttendeeEventInfoDTO {
	
	private Long id;
	private String name;
	private String email;
	private Long eventId;
	private String eventTitle;
	private String eventDate;
	private byte[] eventImage;
	public AttendeeEventInfoDTO() {
		super();
		// TODO Auto-generated constructor stub
	}
	public AttendeeEventInfoDTO(Long id, String name, String email, Long eventId, String eventTitle, String eventDate,
			byte[] eventImage) {
		super();
		this.id = id;
		this.name = name;
		this.email = email;
		this.eventId = eventId;
		this.eventTitle = eventTitle;
		this.eventDate = eventDate;
		this.eventImage = eventImage;
	}
	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	public Long getEventId() {
		return eventId;
	}
	public void setEventId(Long eventId) {
		this.eventId = eventId;
	}
	public String getEventTitle() {
		return eventTitle;
	}
	public void setEventTitle(String eventTitle) {
		this.eventTitle = eventTitle;
	}
	public String getEventDate() {
		return eventDate;
	}
	public void setEventDate(String eventDate) {
		this.eventDate = eventDate;
	}
	public byte[] getEventImage() {
		return eventImage;
	}
	public void setEventImage(byte[] eventImage) {
		this.eventImage = eventImage;
	}
}
	
	
	