import React from 'react';
import { useNavigate } from 'react-router-dom'; // Import useHistory
import './About.css';
import Button from '@mui/material/Button';
import { useTheme } from './ThemeProvider';

export const About = () => {
  const navigate = useNavigate(); // Get the history object
  const theme = useTheme();

  const handleButtonClick = () => {
    navigate('/books'); // Redirect to the home page
  };

  return (
    <div className="AboutContainer">
      <div className="contentWrapper">
        <div className="AboutText">This is Shop🚶</div>
        <Button variant="contained" 
         style={{
          
          ...theme.buttons.primary,
          '&:hover': theme.buttons.primaryHover, // Apply hover styles
        }}
        onClick={handleButtonClick}>
          Go to Books
        </Button>
      </div>
    </div>
  );
};
