import React, { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import SearchIcon from "@mui/icons-material/Search";

export default function SearchBar() {
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    // Perform any action you want to take when the searchTerm state changes
    console.log("Search term changed:", searchTerm);
  }, [searchTerm]); 

  const handleChange = (event) => {
    setSearchTerm(event.target.value);
    
  };

  return (
    <TextField
      id="search"
      type="search"
      label="Search"
      value={searchTerm}
      onChange={handleChange}
      variant="standard"
      size="small" // Set the size to 'small' to make the search bar smaller
      InputProps={{
        style: {
            color: "black",
            backgroundColor: "#d9d3c3", 
            borderRadius: "20px",
            borderBlockColor: "black", 
            fontFamily: "'Montserrat', sans-serif",
        },
        startAdornment: (
          <InputAdornment position="start">
            <SearchIcon />
          </InputAdornment>
        ),
      }}
      InputLabelProps={{
        style: {
          fontFamily: "'Montserrat', sans-serif",
            
          color: "black", // Set the input label color to white
          fontWeight: "bold",
        },
      }}
    />
  );
}
