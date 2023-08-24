import React, { useState } from 'react';
import axios from 'axios';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useTheme } from './ThemeProvider';
// import './AddCategory.css'; // Make sure you have the appropriate CSS file for styling

export const AddCategory = ({ onCategoryAdded }) => {
  const [categoryName, setCategoryName] = useState('');
  const theme = useTheme();

  const handleAddCategory = async () => {
    const newCategory = {
      name: categoryName,
    };

    try {
      const response = await axios.post('https://book-e-sell-node-api.vercel.app/api/category', newCategory);
      console.log('Category added successfully:', response.data);
      toast.success('Category added successfully');
      // Optionally, you can trigger a callback to update the category listing
      if (onCategoryAdded) {
        onCategoryAdded();
      }
      // Clear the form input
      setCategoryName('');
    } catch (error) {
      console.error('Error adding category:', error);
    }
  };

  return (
    <div className="add-category-container">
      <h2>Add New Category</h2>
      <TextField
        label="Category Name"
        value={categoryName}
        onChange={(e) => setCategoryName(e.target.value)}
        autoComplete="off"
        fullWidth
      />
      <Button
        variant="contained"
        style={{
          ...theme.buttons.primary,
          '&:hover': theme.buttons.primaryHover, // Apply hover styles
        }}
        onClick={handleAddCategory}
      >
        Add Category
      </Button>
    </div>
  );
};

export default AddCategory;
