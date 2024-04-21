import React, { useState, useEffect } from "react";
import Web3 from "web3";
import reviewContractABI from "../ProductList/reviewContractABI.json";
import { useProducts } from "./ProductsContext";
import "../../style/ProductDetail/ProductDetail.css";
import { useParams } from "react-router-dom";
import DataAnalysis from "./DataAnalysis";
import WriteReview from "../../components/ProductList/WriteReview";
import StarRating from "./StarRating";
import "../../style/HomePage/Reviews.css";

// Define the URL for the Infura provider
const INFURA_URL =
  "https://sepolia.infura.io/v3/dee208015aa64ad7ac33bdc6c192bc4f";
// Smart contract address on the blockchain.
const contractAddress = "0x4e9abec89a8b6a2453511d97e3d7a85d2a5193a7";
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
  const [averageRating, setAverageRating] = useState(null);

  /* Use useEffect to fetch data or run async operations when your component mounts 
  or when specified values change. */
  useEffect(() => {
    // Find the product details from the provided context
    const currentProductDetails = products.find(
      (product) => product.id.toString() === productId
    );
    setProductDetails(currentProductDetails);
    // Fetch reviews from the blockchain
    const fetchReviewsFromBlockchain = async () => {
      try {
        const reviewsData = await reviewContract.methods
          .getReviewsByProductId(productId)
          .call();
        const parsedReviewsData = reviewsData.map((review) => ({
          ...review,
          rating: parseInt(review.rating, 10),
        }));
        if (parsedReviewsData.length > 0) {
          const total = parsedReviewsData.reduce(
            (acc, review) => acc + parseInt(review.rating, 10),
            0
          );
          const average = total / parsedReviewsData.length;
          // Keeping one decimal for average rating
          setAverageRating(parseFloat(average.toFixed(1)));
          setReviews(parsedReviewsData);
        } else {
          setAverageRating("No ratings yet");
        }
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
      <div className="top-left-container">
        {productDetails.imageUrl && (
          <img
            className="image"
            src={productDetails.imageUrl}
            alt={productDetails.name}
          />
        )}
        <span className="star-1">
          {" "}
          <StarRating averageRating={averageRating} />
        </span>

        <div className="review-summary">
          {averageRating && (
            <p>
              {" "}
              <span className="scoreBlue">Score: </span>
              {averageRating} out of 5
            </p>
          )}{" "}
        </div>
      </div>

      <div className="writeReview-container">
        <WriteReview />
      </div>

      <div className="productionInformation-container">
        <div className="productName">What is {productDetails.name}</div>
        <p className="productDescription">
          <br /> {productDetails.description}
        </p>
      </div>

      <div className="dataAnalysis-container">
        {" "}
        {DataAnalysis ? <DataAnalysis /> : "No Data Analysis Yet"}{" "}
      </div>

      <div className="productDetailReviews-container">
        <h2 className="reviews-title">Reviewer Sentiment</h2>
        {reviews.length ? (
          /* For each element (review), it also provides the position 
          of that element within the array (index). */
          reviews.map((review, index) => (
            /* React requires a key prop on elements in a list to create 
            a stable identity for each element */
            //<div key={index} className="review">
            <div className={`review review${index + 1}`} key={index}>
              <div className="review-rating">
                {/* Display a star for each rating point */}
                {/* it expands the elements of the array into individual elements */}
                {/* _ represents the current element of the array during each iteration */}
                {[...Array(review.rating)].map((_, i) => (
                  <span key={i}>★</span>
                ))}
              </div>
              <div className="review-info">
                <span className="reviewer-name">{review.userIdOrEmail} </span>
                reviewed <br /> <span className="reviewer-name">{productDetails.name}</span>
              </div>
              <hr />
              <div className="review-body">{review.content}</div>
            </div>
          ))
        ) : (
          <p>No 5-star reviews available.</p>
        )}
      </div>
    </div>
  );
}

export default ProductDetail;

