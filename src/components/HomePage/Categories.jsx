// Categories.jsx
import React from "react";
// Import Link from react-router-dom
import { Link } from "react-router-dom";
import "../../style/HomePage/Categories.css";
import { useProducts } from "../ProductDetail/ProductsContext"

function Categories() {
  
  const {products} = useProducts();

  return (
    <div className="categories">
      {products.map((product) => (
        // The 'key' prop is crucial for performance reasons,to help React identify which items have changed, are added, or are removed.
        <Link to={`/product/${product.id}`} key={product.id}>
          <div className="category-image">
            <img src={product.imageUrl} alt={product.description} />
          </div>
        </Link>
      ))}
    </div>
  );
}

export default Categories;
