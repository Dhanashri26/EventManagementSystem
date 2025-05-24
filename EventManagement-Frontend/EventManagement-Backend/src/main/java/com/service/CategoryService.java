package com.service;

import java.util.List;

import com.model.Category;

public interface CategoryService {
	Category createCategory(Category category); 
	List<Category> getAllCategories();
	Category getCategoryById(Long id); 
	Category updateCategory(Long id, Category category);
	void deleteCategory(Long id);
	
	List<Category> searchByName(String name); 

}
