import React from "react";
import "../style/SearchBox.css";

function SearchBox() {
    return (
      <div class="container">
    <div class="search-container">
      <input type="text" class="search-box" placeholder="Search..."/>
      <button class="search-button">Search</button>
    </div>
    <a href="#" class="view-all-button">View All Products</a>
  </div>
    );
  }
  
  export default SearchBox;