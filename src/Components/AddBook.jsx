import React, { useState } from 'react';
import axios from 'axios';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useTheme } from './ThemeProvider';
import './AddBook.css'


const AddBook = ({ onBookAdded }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [base64image, setBase64Image] = useState('');
  const theme = useTheme();

  const handleAddBook = async () => {
    const newBook = {
      name,
      description,
      price: parseInt(price),
      categoryId: parseInt(categoryId),
      base64image,
    };

    try {
      const response = await axios.post('https://book-e-sell-node-api.vercel.app/api/book', newBook);
      console.log('Book added successfully:', response.data);
      toast.success('Book added successfully');
      // Optionally, you can trigger a callback to update the book listing
      if (onBookAdded) {
        onBookAdded();
      }
      // Clear the form inputs
      setName('');
      setDescription('');
      setPrice('');
      setCategoryId('');
      setBase64Image('');
    } catch (error) {
      console.error('Error adding book:', error);
    }
  };

  return (
    <div className="add-book-container">
      <h2>Add New Book</h2>
      <TextField
        label="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        fullWidth
      />
      <TextField
        label="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        fullWidth
      />
      <TextField
        label="Price"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        fullWidth
      />
      <TextField
        label="Category ID"
        value={categoryId}
        onChange={(e) => setCategoryId(e.target.value)}
        fullWidth
      />
      <TextField
        label="Base64 Image"
        value={base64image}
        onChange={(e) => setBase64Image(e.target.value)}
        fullWidth
      />
     <Button variant="contained" 
         style={{
          
          ...theme.buttons.primary,
          '&:hover': theme.buttons.primaryHover, // Apply hover styles
        }}
        onClick={handleAddBook}>
          Add Book
        </Button>
    </div>
  );
};

export default AddBook;
