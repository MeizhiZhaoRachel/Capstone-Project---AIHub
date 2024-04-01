// ProductList.js
import React, { useState, useEffect } from "react";
import ProductCard from "./ProductCard";
import WriteReview from "./WriteReview";
import { useProducts } from "../ProductDetail/ProductsContext"; // Import useProducts hook
import { useSearchParams } from "react-router-dom";
import "../../style/ProductList/ProductList.css";

function useQuery() {
  const [searchParams] = useSearchParams();
  return searchParams;
}

function ProductList() {
  const { products } = useProducts();
  //It represents the parsed query parameters of the current URL

  const query = useQuery();
  /*the .get('search') method is used to retrieve the value of the search parameter 
  from the URL query string. For example, if the current URL is 
  http://example.com/products?search=notebook, query.get('search') would return "notebook".*/
  const searchQuery = query.get("search");

  // Filter products based on search query
  const filteredProducts = searchQuery
    ? products.filter((product) =>
        // The includes() determines whether an array includes a certain value among its entries
        // If searchQuery is empty or null, filteredProducts will be the same as the original products array, meaning no filtering is applied.
        product.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : products;

  return (
    <div className="product-list-page">
      <WriteReview />
      <div className="product-list">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
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
