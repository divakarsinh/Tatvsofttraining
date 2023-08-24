import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import './BookListing.css';
import axios from 'axios'; // Import axios
import { useAuth } from './AuthContext'; // Import useAuth hook
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export const BookListing = () => {
  const [books, setBooks] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOption, setSortOption] = useState('');
  const { user } = useAuth(); // Get the logged-in user

  useEffect(() => {
    async function fetchBooks() {
      try {
        const response = await fetch('https://book-e-sell-node-api.vercel.app/api/book/all');
        const data = await response.json();
        if (data.result && Array.isArray(data.result)) {
          setBooks(data.result);
        } else {
          console.error('Invalid response structure:', data);
        }
      } catch (error) {
        console.error('Error fetching books:', error);
      }
    }

    fetchBooks();
  }, []);

  // const handleShopNowClick = (book) => {
  //   console.log('Shop Now clicked for:', book.name);
  // };

 
// ...

const handleAddToCartClick = async (book) => {
  try {
    const response = await axios.post(
      'https://book-e-sell-node-api.vercel.app/api/cart',
      {
        userId: user.result.id, // Pass the logged-in user's ID as userId
        bookId: book.id,
        quantity: 1, // Set the quantity to 1 (or any desired value)
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${user.token}`,
        },
      }
    );

    if (response.status === 200) {
      console.log('Book added to cart successfully:', book.name);
      toast.success('Book added to cart successfully');
    } else {
      console.error('Error adding book to cart');
      toast.error('Error adding book to cart');
    }
  } catch (error) {
    console.error('Error adding book to cart:', error);
    toast.error('Error please login first or added already');
  }
};

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSortChange = (event) => {
    setSortOption(event.target.value);
  };

  const filteredBooks = books.filter((book) =>
    book.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sortedBooks = sortOption === 'price'
    ? [...filteredBooks].sort((a, b) => a.price - b.price)
    : filteredBooks;

  return (
    <div>
      <h1>Book Listings</h1>
      <div className="filters">
        <input
          type="text"
          placeholder="Search books"
          value={searchTerm}
          onChange={handleSearchChange}
        />
        <select value={sortOption} onChange={handleSortChange}>
          <option value="">Sort by</option>
          <option value="price">Price</option>
        </select>
      </div>
      <div className="book-previews-containe">
        {sortedBooks.map((book) => (
          <div className="book-preview" key={book.id}>
            <div className="book-details">
              <h1 className="book-title">{book.name}</h1>
              <h3 className="book-author">Category: {book.category}</h3>
              <p className="book-description">{book.description}</p>
              <p className="book-price">₹{book.price}</p>
              {/* <Button
                variant="contained"
                style={{ marginRight: '10px' }}
                onClick={() => handleShopNowClick(book)}
              >
                Shop Now
              </Button> */}
              <Button
                variant="contained"
                color="secondary"
                onClick={() => handleAddToCartClick(book)} // Call handleAddToCartClick on button click
              >
                Add to Cart
              </Button>
            </div>
            <div className="book-image">
              <img src={book.base64image} alt={book.name} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BookListing;
