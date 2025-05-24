package com.dao;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.model.User;



public interface UserRepository extends JpaRepository<User, Long> {
	public User findByEmail(String email);
//	public User findUserByName(String name);  //Dhanashri
	
	
//	@Query("SELECT u.name FROM User u WHERE u.email = :email")
//    String findNameByEmail(String email);

}
