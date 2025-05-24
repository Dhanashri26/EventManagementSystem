package com.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.dao.VenueRepository;
import com.model.Venue;

@Service
public class VenueServiceImpl implements VenueService {

	@Autowired
	private VenueRepository venueRepo;

	@Override
	public Venue createVenue(Venue venue) {
		return venueRepo.save(venue);
	}

	@Override
	public List<Venue> getAllVenues() {
		return venueRepo.findAll();
	}

	@Override
	public List<Venue> searchByName(String venueName) {
		return venueRepo.findByNameContainingIgnoreCase(venueName);
	}

	@Override
	public Optional<Venue> getVenueById(Long id) {
		return venueRepo.findById(id);
	}

	@Override
	public Venue updateVenue(Long id, Venue venueDetails) {
		Venue existingVenue = venueRepo.findById(id)
				.orElseThrow(() -> new RuntimeException("Venue with ID " + id + " not found"));
		// Update venue details
		existingVenue.setName(venueDetails.getName());
		existingVenue.setLocation(venueDetails.getLocation());

		return venueRepo.save(existingVenue);
	}

	@Override
	public void deleteVenue(Long id) {
		Venue existingVenue = venueRepo.findById(id)
				.orElseThrow(() -> new RuntimeException("Venue with ID " + id + " not found"));

		venueRepo.delete(existingVenue);

	}

	@Override
	public List<Venue> filterByLocation(String location) {
		return venueRepo.findByLocationContainingIgnoreCase(location);
	}

}
