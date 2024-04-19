import React, { useState, useEffect } from "react";
import Web3 from "web3";
import "../../style/HomePage/Reviews.css";
import reviewContractABI from "../ProductList/reviewContractABI.json";

// Define constants for connecting to the blockchain
const INFURA_URL =
  "https://sepolia.infura.io/v3/dee208015aa64ad7ac33bdc6c192bc4f";
const web3 = new Web3(INFURA_URL);
const contractAddress = "0x296ffee7e9be5f2b57cc1ce417f1ac6030fbb45b";
const reviewContract = new web3.eth.Contract(
  reviewContractABI,
  contractAddress
);

function Reviews() {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const productIds = ["1", "2", "3"];
        let allReviews = [];
        for (const id of productIds) {
          const reviewData = await reviewContract.methods
            .getReviewsByProductId("1")
            .call();
          // Filter for only 5-star reviews and limit to 9 entries
          const parsedReviewsData = reviewData.map((review) => ({
            ...review,
            rating: parseInt(review.rating, 10),
          }));
          const filteredReviews = parsedReviewsData
            .filter((review) => review.rating === 5)
            .slice(0, 9);
          allReviews = allReviews.concat(filteredReviews);
        }
        setReviews(allReviews);
      } catch (error) {
        console.error("Error fetching reviews from blockchain:", error);
      }
    };

    fetchReviews();
  }, []);

  return (
    <div className="reviews-container">
      <div className="reviews-headline">Browse reviews</div>
      {reviews.length > 0 ? (
        reviews.map((review, index) => (
          <div key={index} className="review">
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
              reviewed <span className="reviewer-name">ChatGPT</span>
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
