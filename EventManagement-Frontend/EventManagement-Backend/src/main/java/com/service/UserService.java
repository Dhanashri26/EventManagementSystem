package com.service;

import org.springframework.http.ResponseEntity;

import com.model.User;

public interface UserService {

	String registerUser(User user);
	User loginUser(String email, String password);
	User getUserByEmail(String email);
	

	
}
