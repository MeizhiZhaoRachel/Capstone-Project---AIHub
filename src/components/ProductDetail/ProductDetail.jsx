import React, { useState, useEffect } from "react";
import Web3 from "web3";
import reviewContractABI from "../ProductList/reviewContractABI.json";
import { useProducts } from "./ProductsContext";
import "../../style/ProductDetail/ProductDetail.css";
import { useParams } from "react-router-dom";

// Initialize Web3 with the given provider from the browser (e.g., MetaMask).
const web3 = new Web3(Web3.givenProvider);
// Smart contract address on the blockchain.
const reviewContractAddress = "0xbe142227e16007a5eb3f9bc31a9109e5023e2a4e";
// Creates an instance of the smart contract.
const reviewContract = new web3.eth.Contract(
  reviewContractABI,
  reviewContractAddress
);

function ProductDetail() {
  // State hooks for storing product details and reviews.
  const [productDetails, setProductDetails] = useState(null);
  const [reviews, setReviews] = useState([]);
  // <Route path="/product/:productId" element={<ProductDetail />} />
  // Extracts productId from the URL.
  /* If a user visits http://yourwebsite.com/product/12345, 
    the productId extracted by useParams() would be the string "12345".*/
  const { productId } = useParams();
  // Accesses shared products context.
  const { products } = useProducts();

  /* Use async when you're dealing with operations that return promises
  Common examples include network requests (e.g., fetching data from an API), 
  reading files in Node.js, or, as in your case, interacting with smart contracts 
  on the blockchain.*/
  const fetchProductDetailsFromBlockchain = async () => {
    const details = await reviewContract.methods
      // Function comes from the smart contract ABI
      .getProductDetail(productId)
      .call();
    // Combine blockchain details with context details based on matching ID
    const contextProductDetails = products.find(
      (p) => p.id.toString() === productId
    );
    // create a new object that merges properties from two existing objects
    setProductDetails({ ...details, ...contextProductDetails });
  };

  const fetchReviewsFromBlockchain = async () => {
    const reviewsData = await reviewContract.methods
      // Function comes from the smart contract ABI
      .getReviewsByProductId(productId)
      .call();
    setReviews(reviewsData);
  };

  /* Use useEffect to fetch data or run async operations when your component mounts 
  or when specified values change. */
  useEffect(() => {
    // Ensure products are loaded from context before attempting to fetch details
    if (products.length > 0) {
      fetchProductDetailsFromBlockchain();
    }
    fetchReviewsFromBlockchain();
    /* The array [productId, products] at the end of the useEffect hook is known 
    as the dependencies array. This array tells React to re-run the effect in the 
    useEffect hook whenever any value in this array changes */
  }, [productId, products]);

  if (!productDetails) {
    return <div>Loading product details...</div>;
  }

  return (
    <div className="product-detail-page">
      <h1>{productDetails.name}</h1>
      <p>{productDetails.description}</p>
      {productDetails.imageUrl && (
        <img src={productDetails.imageUrl} alt={productDetails.name} />
      )}
      <h2>Reviews</h2>
      {reviews.length ? (
        /* For each element (review), it also provides the position 
        of that element within the array (index). */
        reviews.map((review, index) => (
          /* React requires a key prop on elements in a list to create 
          a stable identity for each element */
          <div key={index} className="review">
            <p>Content: {review.content}</p>
            <p>Rating: {review.rating}</p>
          </div>
        ))
      ) : (
        <p>No reviews yet.</p>
      )}
    </div>
  );
}

export default ProductDetail;
