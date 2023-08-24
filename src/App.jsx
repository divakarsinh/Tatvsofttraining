import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'; // Import Navigate
import './App.css';
import { Home } from './Components/Home';
import { About } from './Components/About';
import { Contact } from './Components/Contact';
import { Cart } from './Components/Cart';
import { ToastContainer } from 'react-toastify';
import Header from './Components/Header';
import Login from './Components/Login';
import {Profile} from './Components/Profile';
import { AuthProvider, useAuth } from './Components/AuthContext'; // Import useAuth
import {BookListing } from './Components/BookListing'
import AddBook from './Components/AddBook'
import UpdateBook from './Components/UpdateBook'
import AdminPage from './Components/AdminPage'
import AdminPage1 from './Components/AdminEdit'
import Admin from './Components/Admin'
import UpdateUser from './Components/UpdateUser'
import EditUser from './Components/EditUser'
import CategoryList from './Components/CategoryList'
import AddCategory from './Components/AddCategory'
import FakeBook from './Components/FakeBook'

const ProtectedRoute = ({ path, element }) => {
  const { isAuthenticated } = useAuth();

  return isAuthenticated ? element : <Navigate to="/login" />;
};

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <ToastContainer />
        <div className="App">
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route
              path="/cart"
              element={<ProtectedRoute element={<Cart />} />}
            />
            <Route
              path="/profile"
              element={<ProtectedRoute element={<Profile />} />}
            />
            <Route path="/login" element={<Login />} />
            <Route path="/books" element={<BookListing />} />
            <Route path="/addbooks" element={<AddBook />} />
            <Route path="/updatebooks" element={<UpdateBook />} />
            <Route path="/admin1" element={<AdminPage />} />
            <Route path="/admin2" element={<AdminPage1 />} />
            <Route path="/admin" element={<ProtectedRoute element={<Admin />} />} />
            <Route path="/user1" element={<UpdateUser />} />
            <Route path="/user2" element={<EditUser />} />
            <Route path="/cat" element={<CategoryList />} />
            <Route path="/addcat" element={<AddCategory />} />
            <Route path="/fakebook" element={<ProtectedRoute element={<FakeBook />} />} />
          </Routes>
        </div>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
