import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AdminPage1 = () => {
    const [books, setBooks] = useState([]);
    const [selectedBook, setSelectedBook] = useState(null);
    const [updatedBookName, setUpdatedBookName] = useState('');
    const [updatedBookDescription, setUpdatedBookDescription] = useState('');
    const [updatedBookPrice, setUpdatedBookPrice] = useState(0);
    const [updatedBookCategoryId, setUpdatedBookCategoryId] = useState(0);
    const [updatedBookBase64Image, setUpdatedBookBase64Image] = useState('');
  
    useEffect(() => {
      async function fetchBooks() {
        try {
          const response = await fetch('https://book-e-sell-node-api.vercel.app/api/book/all');
          const data = await response.json();
          setBooks(data.result);
        } catch (error) {
          console.error('Error fetching books:', error);
        }
      }
  
      fetchBooks();
    }, []);
  
    const handleEditBook = (bookId) => {
      const bookToEdit = books.find(book => book.id === bookId);
      setSelectedBook(bookToEdit);
      setUpdatedBookName(bookToEdit.name);
      setUpdatedBookDescription(bookToEdit.description);
      setUpdatedBookPrice(bookToEdit.price);
      setUpdatedBookCategoryId(bookToEdit.categoryId);
      setUpdatedBookBase64Image(bookToEdit.base64image);
    };
  
    const handleUpdateBook = async () => {
      if (!selectedBook) {
        return;
      }
  
      const updatedBook = {
        id: selectedBook.id,
        name: updatedBookName,
        description: updatedBookDescription,
        price: updatedBookPrice,
        categoryId: updatedBookCategoryId,
        base64image: updatedBookBase64Image,
      };
  
      try {
        await axios.put('https://book-e-sell-node-api.vercel.app/api/book', updatedBook);
        toast.success('Book updated successfully');
        // Update the list of books after update
        setBooks(prevBooks => prevBooks.map(book => book.id === updatedBook.id ? updatedBook : book));
        setSelectedBook(null);
      } catch (error) {
        console.error('Error updating book:', error);
      }
    };
  
    return (
      <div>
         <h2>Admin Page</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {books.map((book) => (
            <tr key={book.id}>
              <td>{book.id}</td>
              <td>{book.name}</td>
              <td>
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={() => handleEditBook(book.id)}
                >
                  Edit
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

  
        {selectedBook && (
          <div>
            <h2>Edit Book</h2>
            <TextField
              label="Name"
              value={updatedBookName}
              onChange={(e) => setUpdatedBookName(e.target.value)}
              fullWidth
            />
            <TextField
              label="Description"
              value={updatedBookDescription}
              onChange={(e) => setUpdatedBookDescription(e.target.value)}
              fullWidth
            />
            <TextField
              label="Price"
              value={updatedBookPrice}
              onChange={(e) => setUpdatedBookPrice(e.target.value)}
              fullWidth
            />
            <TextField
              label="Category ID"
              value={updatedBookCategoryId}
              onChange={(e) => setUpdatedBookCategoryId(e.target.value)}
              fullWidth
            />
            <TextField
              label="Base64 Image"
              value={updatedBookBase64Image}
              onChange={(e) => setUpdatedBookBase64Image(e.target.value)}
              fullWidth
            />
            <Button variant="contained" onClick={handleUpdateBook}>
              Update Book
            </Button>
          </div>
        )}
      </div>
    );
  };
  
  export default AdminPage1;
  