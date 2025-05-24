package com.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.model.Category;
import com.service.CategoryService;


@RestController
@RequestMapping("api/category")
@CrossOrigin(origins="http://localhost:3000")  //React Frontend

public class CategoryController {
	
	@Autowired
	private CategoryService categoryService;
	
	@PostMapping("/createCategory")
    public ResponseEntity<Category> createCategory(@RequestBody Category category) {
        Category createdCategory = categoryService.createCategory(category);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdCategory);
    }
	
	// Get all categories (with pagination)
    @GetMapping("/getAllCategory")
    public ResponseEntity<List<Category>> getAllCategories() {
    	List<Category> categoryList=categoryService.getAllCategories();
    	return ResponseEntity.ok(categoryList);
	}

    //get category by id
    @GetMapping("/getOneCategory/{id}")
    public ResponseEntity<?> getCategoryById(@PathVariable Long id) {
    	try {
    		Category category = categoryService.getCategoryById(id);
    		return ResponseEntity.ok(category);
    	} 
    	catch (RuntimeException e ) {
    		return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
    	}
    }
    
    // Update an existing category
    @PutMapping("/updateCategory/{id}")
    public ResponseEntity<?> updateCategory(@PathVariable Long id, @RequestBody Category category) {
        try {
            Category updatedCategory = categoryService.updateCategory(id, category);
            return ResponseEntity.ok(updatedCategory);
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        }
    }
    
 // Delete a category
    @DeleteMapping("/deleteCategory/{id}")
    public ResponseEntity<?> deleteCategory(@PathVariable Long id) {
        try {
            categoryService.deleteCategory(id);
            return ResponseEntity.ok("Category deleted successfully.");
        } catch (RuntimeException e) {
        	return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        }
    }
    
    //Search Categories by name
    @GetMapping("/searchCategory")
    public ResponseEntity<List<Category>> searchCategories(@RequestParam String name) {
    	List<Category> categories = categoryService.searchByName(name);
    	return ResponseEntity.ok(categories);
    }
}
