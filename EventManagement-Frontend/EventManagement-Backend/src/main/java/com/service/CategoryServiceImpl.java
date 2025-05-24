package com.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.dao.CategoryRepository;
import com.model.Category;

@Service
public class CategoryServiceImpl implements CategoryService {
	
	 @Autowired
	  private CategoryRepository categoryRepo;
	 
   @Override
   public Category createCategory(Category category) {
		return categoryRepo.save(category);
	}

	@Override
	public List<Category> getAllCategories() {
		return categoryRepo.findAll();
	}
	@Override
    public Category getCategoryById(Long id) {
        return categoryRepo.findById(id)
                .orElseThrow(() -> new RuntimeException("Category with ID " + id + " not found"));
    }

	@Override
    public Category updateCategory(Long id, Category category) {
        Category existingCategory = categoryRepo.findById(id)
                .orElseThrow(() -> new RuntimeException("Category with ID " + id + " not found"));
        
        existingCategory.setName(category.getName()); // Example for updating a field

        return categoryRepo.save(existingCategory);
    }

	@Override
    public void deleteCategory(Long id) {
        Category existingCategory = categoryRepo.findById(id)
                .orElseThrow(() -> new RuntimeException("Category with ID " + id + " not found"));
        
        categoryRepo.delete(existingCategory);
    }

	@Override
	public List<Category> searchByName(String name) {
		return categoryRepo.findByNameContainingIgnoreCase(name);
	}
}
