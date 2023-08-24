import React from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from './ThemeProvider';
import Button from '@mui/material/Button';
import './Admin.css';

const Admin = () => {
  const theme = useTheme();

  return (
    <div className="admin-container">
      <h1 className="admin-heading">Admin Dashboard</h1>
      
      {/* Section for Books */}
      <div className="admin-section">
        <h1>Books</h1>
        <Link to="/addbooks" className="admin-link">
          <Button
            variant="contained"
            style={{
              ...theme.buttons.primary,
              '&:hover': theme.buttons.primaryHover,
            }}
          >
            Add Book
          </Button>
        </Link>
        <Link to="/admin2" className="admin-link">
          <Button
            variant="contained"
            style={{
              ...theme.buttons.primary,
              '&:hover': theme.buttons.primaryHover,
            }}
          >
            Edit Book
          </Button>
        </Link>
        <Link to="/admin1" className="admin-link">
          <Button
            variant="contained"
            style={{
              ...theme.buttons.primary,
              '&:hover': theme.buttons.primaryHover,
            }}
          >
            Delete Book
          </Button>
        </Link>
      </div>
      
      {/* Section for Users */}
      <div className="admin-section">
        <h2>Users</h2>
        <Link to="/user1" className="admin-link">
          <Button
            variant="contained"
            style={{
              ...theme.buttons.primary,
              '&:hover': theme.buttons.primaryHover,
            }}
          >
            Find and Delete User
          </Button>
        </Link>
        <Link to="/user2" className="admin-link">
          <Button
            variant="contained"
            style={{
              ...theme.buttons.primary,
              '&:hover': theme.buttons.primaryHover,
            }}
          >
            Update User
          </Button>
        </Link>
      </div>
      
      {/* Section for Categories */}
      <div className="admin-section">
        <h2>Categories</h2>
        <Link to="/addcat" className="admin-link">
          <Button
            variant="contained"
            style={{
              ...theme.buttons.primary,
              '&:hover': theme.buttons.primaryHover,
            }}
          >
            Add Category
          </Button>
        </Link>
        <Link to="/cat" className="admin-link">
          <Button
            variant="contained"
            style={{
              ...theme.buttons.primary,
              '&:hover': theme.buttons.primaryHover,
            }}
          >
            Delete Category
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default Admin;
