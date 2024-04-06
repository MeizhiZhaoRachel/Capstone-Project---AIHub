// ProductList.js
import React from "react";
import ProductCard from "./ProductCard";
import WriteReview from "./WriteReview";
// Import useProducts hook from ProductsContext
import { useProducts } from "../ProductDetail/ProductsContext";
import { useSearchParams } from "react-router-dom";
import "../../style/ProductList/ProductList.css";

// useQuery returns a URLSearchParams object representing the query parameters
// of the current URL, even though it doesn't take any arguments itself.
function useQuery() {
  const [searchParams] = useSearchParams();
  return searchParams;
}

function ProductList() {
  const { products } = useProducts();

  // It represents the parsed query parameters of the current URL
  const query = useQuery();
  /* the .get('search') method is used to retrieve the value of the search parameter 
  from the URL query string. For example, if the current URL is 
  http://example.com/products?search=notebook, query.get('search') would return "notebook".*/
  const searchQuery = query.get("search");

  // Filter products based on search query
  // If searchQuery is empty or null, filteredProducts will be the same as the
  // original products array, meaning no filtering is applied.
  const filteredProducts = searchQuery
    ? products.filter((product) =>
      // The includes() determines whether an array includes a certain value among its entries
      product.name.toLowerCase().includes(searchQuery.toLowerCase())
    )
    : products;

  return (
    <div className="product-list-page">
      <WriteReview />
      <div className="product-list">
      {/* Check if there are any products in the filteredProducts array */}
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            // The key prop is essential for React's reconciliation process to 
            // identify elements uniquely. The product object is passed as a prop 
            // to ProductCard, which it uses to populate its UI.
            <ProductCard key={product.id} product={product} />
          ))
        ) : (
          <p>Sorry, no matching product.</p>
        )}
      </div>
    </div>
  );
}

export default ProductList;
