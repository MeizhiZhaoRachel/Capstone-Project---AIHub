// ProductCard.js
import React from "react";
import { Link } from "react-router-dom";
import "../../style/ProductList/ProductCard.css"; // Make sure to have CSS for styling

function ProductCard({ product }) {

  return (
    // Wrap the card in a Link component to make it clickable
    <Link to={`/product/${product.id}`} className="product-card-link">
      <div className="product-card">
        <img
          src={product.imageUrl}
          alt={product.name}
          className="product-image"
        />
        <div className="product-info">
          <h3>{product.name}</h3>
          <p>{product.description}</p>
          {/* Implementing the rating component would go here */}
        </div>
      </div>
    </Link>
  );
}

export default ProductCard;
