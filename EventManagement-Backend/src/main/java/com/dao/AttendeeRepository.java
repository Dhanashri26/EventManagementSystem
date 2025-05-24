package com.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import com.model.Attendee;


public interface AttendeeRepository extends JpaRepository<Attendee, Long>  {

}
