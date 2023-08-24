import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { ThemeProvider } from './Components/ThemeProvider';
import { CookiesProvider } from 'react-cookie';
import { AuthProvider } from "./Components/AuthContext";


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <CookiesProvider>
    <ThemeProvider>
    
    <AuthProvider>
      <App />
    </AuthProvider>
  
    </ThemeProvider>
    </CookiesProvider>,
  </React.StrictMode>
);

