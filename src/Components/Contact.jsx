import React from 'react';
import FormComponent from './Form'; // Import the FormComponent from the Form.jsx file

export const Contact = () => {
  return (
    <div className="ContactContainer" style={{
      backgroundColor: '#f2f2f2',
      padding: '20px',
      margin: 'auto',
      textAlign: 'center',
      fontSize: '24px',
      fontWeight: 'bold',
      border: '1px solid #ddd',
      borderRadius: '8px',
      boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    
    }}>
      <div>
      <FormComponent /> {/* Render the FormComponent here */}
      </div>
    </div>
  )
}
