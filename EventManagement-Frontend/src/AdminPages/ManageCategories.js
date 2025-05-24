import React, { useState, useEffect } from "react";
import axios from "axios";
import "./ManageCategories.css";
import { FaEdit, FaTrash } from "react-icons/fa";

const ManageCategories = () => {
  const [categories, setCategories] = useState([]);
  const [newCategory, setNewCategory] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [categoryId, setCategoryId] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:8084/api/category/getAllCategory")
      .then((response) => setCategories(response.data))
      .catch((error) => console.error("Error fetching categories:", error));
  }, []);

  const handleAddCategory = () => {
    if (newCategory) {
      axios
        .post("http://localhost:8084/api/category/createCategory", {
          name: newCategory,
        })
        .then((response) => {
          setCategories([...categories, response.data]);
          setNewCategory("");
        })
        .catch((error) => console.error("Error adding category:", error));
    }
  };

  const handleDeleteCategory = (id) => {
    axios
      .delete(`http://localhost:8084/api/category/deleteCategory/${id}`)
      .then(() => {
        setCategories(categories.filter((category) => category.id !== id));
      })
      .catch((error) => console.error("Error deleting category:", error));
  };

  const handleEditCategory = (id, name) => {
    setIsEditing(true);
    setCategoryId(id);
    setNewCategory(name);
  };

  const handleUpdateCategory = () => {
    if (newCategory && categoryId !== null) {
      axios
        .put(
          `http://localhost:8084/api/category/updateCategory/${categoryId}`,
          { name: newCategory }
        )
        .then((response) => {
          setCategories(
            categories.map((category) =>
              category.id === categoryId ? response.data : category
            )
          );
          setIsEditing(false);
          setCategoryId(null);
          setNewCategory("");
        })
        .catch((error) => console.error("Error updating category:", error));
    }
  };

  return (
    // ✅ No logic changes needed, only ensure your container uses full width
    <div className="custom-manage-categories">
      <h2>📂 Manage Categories</h2>

      <div className="custom-category-input">
        <input
          type="text"
          value={newCategory}
          onChange={(e) => setNewCategory(e.target.value)}
          placeholder="Enter category name"
        />
        {isEditing ? (
          <button className="custom-btn-update" onClick={handleUpdateCategory}>
            Update
          </button>
        ) : (
          <button className="custom-btn-add" onClick={handleAddCategory}>
            Add
          </button>
        )}
      </div>

      <table className="custom-category-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Category Name</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {categories.map((category) => (
            <tr key={category.id}>
              <td>{category.id}</td>
              <td>{category.name}</td>
              <td>
                <button
                  onClick={() => handleEditCategory(category.id, category.name)}
                  className="custom-edit-btn"
                >
                  <FaEdit />
                </button>
                <button
                  onClick={() => handleDeleteCategory(category.id)}
                  className="custom-delete-btn"
                >
                  <FaTrash />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ManageCategories;
