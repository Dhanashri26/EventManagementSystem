package com.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.model.Venue;

public interface VenueRepository extends JpaRepository<Venue, Long> {

	List<Venue> findByNameContainingIgnoreCase(String name);

	List<Venue> findByLocationContainingIgnoreCase(String location);

}
