package com.service;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.dao.UserRepository;
import com.model.User;

@Service
public class UserServiceImpl implements UserService {

	@Autowired
	private UserRepository userRepository;
	
	
	@Override
	public String registerUser(User user) {
		if (userRepository.findByEmail(user.getEmail()) != null) {
            return "Email already registered";
        }
        userRepository.save(user);
        return "User registered successfully";
	}

	@Override
	public User loginUser(String email, String password) {
		User user = userRepository.findByEmail(email);
        if (user != null && user.getPassword().equals(password)) {
            return user;
        }
        return null;
    }
	
	@Override
	public User getUserByEmail(String email) {
		 return userRepository.findByEmail(email);
	}
	


}
/*------------------Attendee pages API-------------*/
