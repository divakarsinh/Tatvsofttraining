import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const UpdateBook = ({ bookId }) => {
  const [book, setBook] = useState({});
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [base64image, setBase64Image] = useState('');

  useEffect(() => {
    async function fetchBookDetails() {
      try {
        const response = await axios.get(`https://book-e-sell-node-api.vercel.app/api/book/${bookId}`);
        setBook(response.data);
      } catch (error) {
        console.error('Error fetching book details:', error);
      }
    }

    fetchBookDetails();
  }, [bookId]);

  useEffect(() => {
    // Pre-fill form fields with existing book details
    setName(book.name || '');
    setDescription(book.description || '');
    setPrice(book.price || '');
    setCategoryId(book.categoryId || '');
    setBase64Image(book.base64image || '');
  }, [book]);

  const handleUpdateBook = async () => {
    const updatedBook = {
      name,
      description,
      price: parseInt(price),
      categoryId: parseInt(categoryId),
      base64image,
    };

    try {
      const response = await axios.put(`https://book-e-sell-node-api.vercel.app/api/book/${bookId}`, updatedBook);
      console.log('Book updated successfully:', response.data);
      toast.success('Book updated successfully');
    } catch (error) {
      console.error('Error updating book:', error);
    }
  };

  return (
    <div className="update-book-container">
      <h2 className="update-book-heading">Update This Book</h2>
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
      <Button variant="contained" onClick={handleUpdateBook}>
        Update That Book
      </Button>
    </div>
  );
};

export default UpdateBook;
