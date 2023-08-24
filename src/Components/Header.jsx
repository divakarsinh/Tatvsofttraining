import React from 'react';
import { Link } from 'react-router-dom';
// import SearchBar from './SearchBar';
import IconButton from '@mui/material/IconButton';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import StyledBadge from '@mui/material/Badge';
import { Cart } from './Cart';

const Header = () => {
  const cartItemCount = Cart.cartItemCount;

  return (
    <header className="App-header">
      <div className="header-left">
        <Link to="/">Home</Link>
        <Link to="/books">Shop</Link>
        <Link to="/profile">Profile</Link>
        {/* <Link to="/contact">Profile 0</Link> */}
        <Link to="/admin">Admin</Link>
        {/* <Link to="/fakebook">Fake</Link> */}
      </div>

      <div className="header-center">
        {/* Add your logo here */}
        <img src="logonew1.jpg" alt="Logo" />
      </div>

      <div className="header-right">
        {/* <SearchBar className="search-bar" /> */}
        <div className="cart-icon">
          <Link to="/cart">
            <IconButton aria-label="cart">
              <StyledBadge badgeContent={cartItemCount} color="error">
                <ShoppingCartIcon />
              </StyledBadge>
            </IconButton>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
