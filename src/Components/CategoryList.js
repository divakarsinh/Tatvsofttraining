import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Category.css";
import Button from '@mui/material/Button';

const CategoryList = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await axios.get(
        "https://book-e-sell-node-api.vercel.app/api/category/all"
      );
      setCategories(response.data.result);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const handleDeleteCategory = async (categoryId) => {
    try {
      await axios.delete(
        `https://book-e-sell-node-api.vercel.app/api/category?id=${categoryId}`
      );
      // Refresh the list of categories after successful deletion
      fetchCategories();
      toast.success("Category deleted successfully");
    } catch (error) {
      console.error("Error deleting category:", error);
      toast.error("Error deleting category");
    }
  };

  return (
    <div className="cat-div">
      <h2>Categories</h2>
      <ul>
        {categories.map((category) => (
          <li key={category.id}>
           ID: {category.id} - Name: {category.name}
            <Button onClick={() => handleDeleteCategory(category.id)}>
              Delete
            </Button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CategoryList;
