import React, { useState, useEffect, useCallback } from 'react';
import './Cart.css';
import { useAuth } from './AuthContext';
import Button from '@mui/material/Button';
import { useTheme } from './ThemeProvider';
import DeleteIcon from '@mui/icons-material/Delete'; 
import { toast } from 'react-toastify';
import {useNavigate } from "react-router-dom";
import 'react-toastify/dist/ReactToastify.css';

export const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const { user } = useAuth();
  const [subtotal, setSubtotal] = useState(0);
  const theme = useTheme();
  const navigate = useNavigate();
  const [showPopup, setShowPopup] = useState(false);


  const fetchCartItems = useCallback(async () => {
    try {
      const response = await fetch(`https://book-e-sell-node-api.vercel.app/api/cart?userId=${user.result.id}`, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        if (data.result && Array.isArray(data.result)) {
          setCartItems(data.result);
          calculateSubtotal(data.result);
        }
      } else {
        console.error('Error fetching cart items');
      }
    } catch (error) {
      console.error('Error fetching cart items:', error);
    }
  }, [user.result.id, user.token]);

  useEffect(() => {
    fetchCartItems();
  }, [fetchCartItems]);

  const calculateSubtotal = (items) => {
    const total = items.reduce((acc, item) => acc + item.book.price, 0);
    setSubtotal(total);
  };

  const handleDeleteItemClick = async (itemId) => {
    try {
      const response = await fetch(`https://book-e-sell-node-api.vercel.app/api/cart?id=${itemId}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });

      if (response.ok) {
        toast.success('Iteam Deleted successfully!');
        // Item deleted successfully, fetch updated cart items
        fetchCartItems();
        console.log('Item deleted from cart:', itemId);
      } else {
        console.error('Error deleting item from cart');
      }
    } catch (error) {
      console.error('Error deleting item from cart:', error);
    }
  };
  const handlePlaceOrderClick = async () => {
    if (cartItems.length > 0) {
      // Place order logic here
      // You can use fetch or axios to send the order request
      // If order is successful, show success toast
      toast.success('Order placed successfully!');
      // Show the success popup
      setShowPopup(true);

      // Clear the cart items
      setCartItems([]);
      setTimeout(() => {
        setShowPopup(false);
        navigate("/");
      }, 5500);
      
    } else {
      // Show error toast for empty cart
      toast.error('Cannot place order. Cart is empty.');
    }
  };

  return (
    <div className='carttt'>
      <h1>Shopping Cart</h1>
      <div className="cart-items-container">
        {cartItems.map((item) => (
          <div className="cart-item" key={item.id}>
            <div className="cart-item-details">
              <img className="cart-item-image" src={item.book.base64image} alt={item.book.name} />
              <h3 className="cart-item-title">{item.book.name}</h3>
              <p className="cart-item-price">Price: ₹{item.book.price}</p>
              <Button variant="contained" style={{ ...theme.buttons.primary }} onClick={() => handleDeleteItemClick(item.id)}>
              <DeleteIcon />
              </Button>
            </div>
          </div>
        ))}
      </div>
      <div className="subtotal">
        <p>Subtotal: ₹{subtotal}</p>
        <p>Name: {user.result.firstName} {user.result.lastName}</p>
        <Button variant="contained" style={{ ...theme.buttons.primary }} onClick={handlePlaceOrderClick}>
          Place Order
        </Button>
      </div>
      {showPopup && (
      <div className="popup">
        <p>Your order has been placed successfully!</p>
      </div>
    )}
    </div>
  );
};

export default Cart;
