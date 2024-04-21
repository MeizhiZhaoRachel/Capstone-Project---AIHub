import React, { useState, useEffect } from "react";
import Web3 from "web3";
import "../../style/HomePage/Reviews.css";
import reviewContractABI from "../ProductList/reviewContractABI.json";
import { useProducts } from "../ProductDetail/ProductsContext";

// Define constants for connecting to the blockchain
const INFURA_URL =
  "https://sepolia.infura.io/v3/dee208015aa64ad7ac33bdc6c192bc4f";
const web3 = new Web3(INFURA_URL);
const contractAddress = "0x4e9abec89a8b6a2453511d97e3d7a85d2a5193a7";
const reviewContract = new web3.eth.Contract(
  reviewContractABI,
  contractAddress
);

function Reviews() {
  const [reviews, setReviews] = useState([]);
  const {products} = useProducts();

  const getProductNameById = (id) => {
    const product = products.find((product) => product.id == id);
    return product ? product.name : "Unknown Product";
  
  }

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const productIds = ["1", "2", "3"];
        let allReviews = [];
        for (const id of productIds) {
          const reviewData = await reviewContract.methods
            .getReviewsByProductId(id)
            .call();
          // Filter for only 5-star reviews and limit to 9 entries
          const parsedReviewsData = reviewData.map((review) => ({
            ...review,
            rating: parseInt(review.rating, 10),
          }));
          const filteredReviews = parsedReviewsData
            .filter((review) => review.rating === 5)
            ;
          allReviews = allReviews.concat(filteredReviews);
        }
        setReviews(allReviews.slice(0, 9));
      } catch (error) {
        console.error("Error fetching reviews from blockchain:", error);
      }
    };

    fetchReviews();
  }, []);

  return (
    <div className="reviews-container">
      <div className="reviews-headline">Browse Reviews</div>
      {reviews.length > 0 ? (
        reviews.map((review, index) => (
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
              reviewed <br /> <span className="reviewer-name">{getProductNameById(review.productId)}</span>
            </div>
            <hr />
            <div className="review-body">{review.content}</div>
          </div>
        ))
      ) : (
        <p>No 5-star reviews available.</p>
      )}
    </div>
  );
}

export default Reviews;
