import React, { useState } from 'react';
import { TextField, Button } from '@mui/material';
import { toast } from 'react-toastify';
import { useTheme } from './ThemeProvider';
import 'react-toastify/dist/ReactToastify.css';

const UpdateProfile = () => {
  const [userId, setUserId] = useState('');
  const [foundUser, setFoundUser] = useState(null);
  const theme = useTheme();
  const [updatedUser, setUpdatedUser] = useState({
    id: '',
    email: '',
    firstName: '',
    lastName: '',
    roleId: '',
    role: '',
    password: '',
  });

  const handleSearchUser = async () => {
    try {
      const response = await fetch(
        `https://book-e-sell-node-api.vercel.app/api/user/byId?id=${userId}`
      );
      const data = await response.json();
      setFoundUser(data.result);
      setUpdatedUser(data.result);
      toast.success('User Found');
    } catch (error) {
      console.error('Error fetching user:', error);
    }
  };

  const handleUpdateUser = async () => {
    try {
      // Exclude the _id field from the updatedUser object
      const { _id, __v, ...userDataWithoutId } = updatedUser;
  
      const response = await fetch(
        `https://book-e-sell-node-api.vercel.app/api/user`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(userDataWithoutId), // Use the modified object without _id
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
      <h2>Search User by ID & Update</h2>
      <TextField
        label="User ID"
        variant="outlined"
        value={userId}
        onChange={(e) => setUserId(e.target.value)}
        autoComplete="off"
      />
      <Button variant="contained" style={{ ...theme.buttons.primary }} onClick={handleSearchUser}>
        Search
      </Button>

      {foundUser && (
        <div className="user-details">
          <TextField
            label="Email"
            name="email"
            value={updatedUser.email}
            onChange={handleInputChange}
            autoComplete="off"
          />
          <TextField
            label="First Name"
            name="firstName"
            value={updatedUser.firstName}
            onChange={handleInputChange}
            autoComplete="off"
          />
          <TextField
            label="Last Name"
            name="lastName"
            value={updatedUser.lastName}
            onChange={handleInputChange}
            autoComplete="off"
          />
          <TextField
            label="Role ID"
            name="roleId"
            value={updatedUser.roleId}
            onChange={handleInputChange}
            autoComplete="off"
          />
          <TextField
            label="Role"
            name="role"
            value={updatedUser.role}
            onChange={handleInputChange}
            autoComplete="off"
          />
          <TextField
            label="Password"
            name="password"
            value={updatedUser.password}
            onChange={handleInputChange}
            autoComplete="off"
          />
          <Button variant="contained" style={{ ...theme.buttons.primary }} onClick={handleUpdateUser}>
            Update User
          </Button>
        </div>
      )}
    </div>
  );
};

export default UpdateProfile;
