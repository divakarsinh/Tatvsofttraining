import React, { useState } from 'react';
import axios from 'axios';
import './SearchUser.css'
import { useTheme } from './ThemeProvider';
import Button from '@mui/material/Button';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const SearchUser = () => {
  const [userId, setUserId] = useState('');
  const [user, setUser] = useState(null);
  const theme = useTheme();

  const handleSearchUser = async () => {
    try {
      const response = await axios.get(`https://book-e-sell-node-api.vercel.app/api/user/byId?id=${userId}`);
      setUser(response.data.result);
      toast.success('User Found');
    } catch (error) {
      console.error('Error fetching user:', error);
      toast.error('User Not Found');
    }
  };

  const handleDeleteUser = async () => {
    if (!user) {
      return;
    }

    try {
      await axios.delete('https://book-e-sell-node-api.vercel.app/api/user', {
        params: { id: user.id }
      });
      console.log('User deleted successfully');
      toast.success('User deleted successfully');
      setUser(null); // Clear user data in the state
    } catch (error) {
      console.error('Error deleting user:', error);
      toast.error('Error deleting user');
    }
  };

  return (
    <div className="search-user-container">
      <h2>Search User by ID</h2>
      <input
        type="text"
        placeholder="User ID"
        value={userId}
        onChange={(e) => setUserId(e.target.value)}
      />
      <Button
        variant="contained"
        style={{
          ...theme.buttons.primary,
          '&:hover': theme.buttons.primaryHover, marginLeft: '30px', // Apply hover styles
        }}
        onClick={handleSearchUser}
      >
        Search 
      </Button>

      {user && (
        <div className="user-details">
          <h3>User Details:</h3>
          <p>ID: {user.id}</p>
          <p>Email: {user.email}</p>
          <p>First Name: {user.firstName}</p>
          <p>Last Name: {user.lastName}</p>
          <p>Role ID: {user.roleId}</p>
          <p>Role: {user.role}</p>

          <Button variant="contained" style={{ ...theme.buttons.primary, marginLeft: '10px', }} onClick={handleDeleteUser}>
              Delete User
            </Button>

        </div>
      )}
    </div>
  );
};

export default SearchUser;
