import React from "react";
import "../style/SearchBox.css";
import { Link } from "react-router-dom";

function SearchBox() {
  const [searchTerm, setSearchTerm] = useState("");
  const history = useHistory();

  const handleSearch = (e) => {
    // Prevent the form from refreshing the page
    // e is the event object for whatever triggers the handleSearch function
    e.preventDefault();
    // Navigate to the product list with a query parameter
    //encodeURIComponent is a JavaScript function that encodes special characters in the searchTerm variable
    history.push(`/productlist?search=${encodeURIComponent(searchTerm)}`);
  };

  return (
    <div className="container">
      <div className="prompt">
        <p>Find a product</p>
      </div>
      <div className="search-container">
        <input type="text" className="search-box" placeholder="Search..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}/>
        <button className="search-button" onClick={handleSearch} >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            className="bi bi-search"
            viewBox="0 0 16 16"
          >
            <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0" />
          </svg>
        </button>
      </div>
      <Link to="/productlist" className="view-all-button">
        View All Products
      </Link>
    </div>
  );
}

export default SearchBox;
