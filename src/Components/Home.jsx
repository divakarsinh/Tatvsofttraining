import React from 'react';
import './Home.css';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import { useTheme } from './ThemeProvider';
import UserProfile from "./UserGreeting";


export const Home = () => {
  const theme = useTheme();
  const navigate = useNavigate(); // Get the history object

  const handleButtonClick = () => {
    navigate('/books'); // Redirect to the home page
  };

  return (
    <div className="Home">
      
      <div className="book-previews-container">
        <div className="book-preview">
          <div className="book-details">
            <h1 className="book-title"><UserProfile /></h1>
            
            <h3 className="book-author">Greetings From Online Book Store:</h3>
            <p className="book-descriptionn">"Welcome to our enchanting world of books! Immerse yourself in captivating stories, insightful knowledge, and boundless imagination. Explore our curated collection and embark on a journey through words that will inspire, entertain, and broaden your horizons. Happy reading!" </p>
            <Button variant="contained" style={{ ...theme.buttons.primary }} onClick={handleButtonClick}>
              Happy Shopping
            </Button>
          </div>
          {/* <div className="book-image">
            <img src="interstellar.jpg" alt="img" />
          </div> */}
        </div>

        <div className="book-preview">
          <div className="book-details">
            <h1 className="book-title">Interstellar: </h1>
            <h3 className="book-author">By Kip Throne</h3>
            <p className="book-description">THE END OF EARTH WILL NOT BE THE END OF USFrom acclaimed filmmaker Christopher Nolan (The Dark Knight Triology, Inception),INTERSTELLAR and all related characters and elements are trademarks of and © Warner Bros. Entertainment Inc. </p>
            <Button variant="contained" style={{ ...theme.buttons.primary }} onClick={handleButtonClick}>
              Shop Now
            </Button>
          </div>
          <div className="book-image">
            <img src="interstellar.jpg" alt="img" />
          </div>
        </div>

        <div className="book-preview">
          <div className="book-details">
            <h1 className="book-title">A BOOK OF LIGHT: </h1>
            <h3 className="book-author">By  Jerry Pinto (ed.)</h3>
            <p className="book-description">
In "Em and the Big Hoom," Jerry Pinto portrays a family grappling with mental illness's impact. Love and wounds intertwine as a mother's bipolar disorder, a distant father, and the aftermath of suicide shape their dynamics. The resulting collection, "A Book of Light," gathers poignant stories that illuminate love's resilience amidst life's challenges.</p>
            <Button variant="contained" style={{ ...theme.buttons.primary }} onClick={handleButtonClick}>
              Shop Now
            </Button>
          </div>
          <div className="book-image">
             <img src="bookphotuu.jpeg" alt="img" />
          </div>
        </div>
        <footer className="footer">
            <p>&copy; {new Date().getFullYear()} Online Book Store. All rights reserved.</p>
          </footer>
      </div>
    </div>
  );
};
