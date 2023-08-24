import React, { useState, useEffect } from 'react';
import { TextField, Button } from '@mui/material';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useTheme } from './ThemeProvider';
import { useAuth } from "./AuthContext";

const UpdateProfile = () => {
  // const [userId, setUserId] = useState('');
  // const [foundUser, setFoundUser] = useState(null);
  const theme = useTheme();
  const { user } = useAuth(); // Get the logged-in user
  const [updatedUser, setUpdatedUser] = useState({
    email: '',
    firstName: '',
    lastName: '',
    password: '',
  });

  useEffect(() => {
    // Populate the input fields with the logged-in user's data
    if (user) {
      setUpdatedUser({
        email: user.result.email,
        firstName: user.result.firstName,
        lastName: user.result.lastName,
        password: user.result.password,
      });
    }
  }, [user]);

  // const handleSearchUser = async () => {
  //   try {
  //     setFoundUser(user.result); // Set foundUser to the logged-in user's data
  //     toast.success('User Found');
  //   } catch (error) {
  //     console.error('Error fetching user:', error);
  //   }
  // };

  const handleUpdateUser = async () => {
    try {
      const response = await fetch(
        `https://book-e-sell-node-api.vercel.app/api/user`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(updatedUser),
        }
      );

      if (response.ok) {
        console.log('User updated successfully');
        toast.success('User Updated successfully');
        // You can add your navigation logic here
      } else {
        const errorData = await response.json();
        console.error('Error updating user:', errorData);
      }
    } catch (error) {
      console.error('Error updating user:', error);
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUpdatedUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  return (
    <div className="search-user-container">
      <h2>Update Your Profile</h2>
      <TextField
        label="Email"
        name="email"
        variant="outlined"
        value={updatedUser.email}
        onChange={handleInputChange}
      />
      <TextField
        label="First Name"
        name="firstName"
        variant="outlined"
        value={updatedUser.firstName}
        onChange={handleInputChange}
      />
      <TextField
        label="Last Name"
        name="lastName"
        variant="outlined"
        value={updatedUser.lastName}
        onChange={handleInputChange}
      />
      <TextField
        label="Password"
        name="password"
        variant="outlined"
        value={updatedUser.password}
        onChange={handleInputChange}
      />
      <Button
        variant="contained"
        style={{ ...theme.buttons.primary , marginLeft: '10px'}}
        onClick={handleUpdateUser}
      >
        Update Profile
      </Button>
    </div>
  );
};

export default UpdateProfile;
