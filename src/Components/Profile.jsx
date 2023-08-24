import React from 'react';
import { useNavigate } from 'react-router-dom'; // Import useHistory
import './Profile.css';
import Button from '@mui/material/Button';
import { useTheme } from './ThemeProvider';
import { useAuth } from "./AuthContext";

export const Profile = () => {
  const navigate = useNavigate(); // Get the history object
  const theme = useTheme();
  const { user } = useAuth();

  const handleButtonClick = () => {
    navigate('/'); // Redirect to the home page
  };
  const handleFakeBookButtonClick = () => {
    navigate('/fakebook'); // Navigate to the "/fakebook" page
  };

  return (
    <div className="CartContainer">
      <div className="contentWrapper">
        <div className="CartText">  </div>
        <div className="user-profile">
      <h2>User Profile</h2>
      <p>ID: {user.result.id}</p>
      <p>Email: {user.result.email}</p>
      <p>First Name: {user.result.firstName}</p>
      <p>Last Name: {user.result.lastName}</p>
      {/* <p>Role ID: {user.result.roleId}</p> */}
      <p>Role: {user.result.role}</p>
      {/* You can display other user attributes here */}
    </div>
        <Button variant="contained" 
         style={{
          
          ...theme.buttons.primary,
          '&:hover': theme.buttons.primaryHover, // Apply hover styles
        }}
        onClick={handleButtonClick}>
          Go to Home
        </Button>
        <Button
          variant="contained"
          style={{
            ...theme.buttons.primary,
          '&:hover': theme.buttons.primaryHover, 
            marginLeft: '10px', // Add some margin between buttons
          }}
          onClick={handleFakeBookButtonClick}
        >
          Edit Profile
        </Button>
      </div>
    </div>
  );
};
