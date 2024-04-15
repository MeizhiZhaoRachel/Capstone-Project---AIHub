import React, { useState, useEffect } from "react";
import Web3 from "web3";
import reviewContractABI from "../ProductList/reviewContractABI.json";
import { useProducts } from "./ProductsContext";
import "../../style/ProductDetail/ProductDetail.css";
import { useParams } from "react-router-dom";
import DataAnalysis from "./DataAnalysis";

// Define the URL for the Infura provider
const INFURA_URL =
  "https://sepolia.infura.io/v3/dee208015aa64ad7ac33bdc6c192bc4f";
  // Smart contract address on the blockchain.
const contractAddress = "0x296ffee7e9be5f2b57cc1ce417f1ac6030fbb45b";
const web3 = new Web3(INFURA_URL);
// Creates an instance of the smart contract.
const reviewContract = new web3.eth.Contract(
  reviewContractABI,
  contractAddress
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

  /* Use useEffect to fetch data or run async operations when your component mounts 
  or when specified values change. */
  useEffect(() => {
    // Find the product details from the provided context
    const currentProductDetails = products.find( 
      (product) => product.id.toString() === productId
    );
    ;
    setProductDetails(currentProductDetails); 
    // Fetch reviews from the blockchain
    const fetchReviewsFromBlockchain = async () => {
      try {
        const reviewsData = await reviewContract.methods
          .getReviewsByProductId(productId)
          .call();
        setReviews(reviewsData);
      } catch (error) {
        console.error("Error fetching reviews from blockchain:", error);
      }
    };

    // Ensure products are loaded from context before attempting to fetch details
    if (productId && products.length > 0) { 
      fetchReviewsFromBlockchain();
    }
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
      {DataAnalysis ? <DataAnalysis /> : 'No Data Analysis Yet'}
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
