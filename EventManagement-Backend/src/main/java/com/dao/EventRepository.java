package com.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.model.Event;

public interface EventRepository extends JpaRepository<Event, Long> {

	List<Event> findByTitleContainingIgnoreCase(String title);

	List<Event> findByCategoryName(String categoryName);

	List<Event> findByVenueName(String venueName);

}
