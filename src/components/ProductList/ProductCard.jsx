// ProductCard.js
import { Link } from "react-router-dom";
import "../../style/ProductList/ProductCard.css";
import React, { useState, useEffect } from "react";
import reviewContractABI from "./reviewContractABI.json";
import Web3 from "web3";
import StarRating from "../ProductDetail/StarRating";


// URL for the Ganache HTTP provider
// const ganacheUrl = "http://localhost:7545";
// Initialize Web3 with the Ganache HTTP provider
// const web3 = new Web3(new Web3.providers.HttpProvider(ganacheUrl));
const INFURA_URL =
  "https://sepolia.infura.io/v3/dee208015aa64ad7ac33bdc6c192bc4f";
const web3 = new Web3(INFURA_URL);
const reviewContractAddress = "0x296ffee7e9be5f2b57cc1ce417f1ac6030fbb45b";
const reviewContract = new web3.eth.Contract(
  reviewContractABI,
  reviewContractAddress
);

function ProductCard({ product }) {
  const [averageRating, setAverageRating] = useState(null);
  useEffect(() => {
    async function fetchAverageRating() {
      if (reviewContract) {
        // Ensure productId is a string
        try {
          const productIdString = String(product.id);
          const reviewsData = await reviewContract.methods
            .getReviewsByProductId(productIdString)
            .call();

          // Parse the rating from string to integer
          const parsedReviewsData = reviewsData.map((review) => {
            return {
              ...review,
              rating: parseInt(review.rating, 10), // Parses the string rating to an integer
            };
          });

          if (parsedReviewsData.length > 0) {
            const total = parsedReviewsData.reduce(
              (acc, review) => acc + parseInt(review.rating, 10),
              0
            );
            const average = total / parsedReviewsData.length;
            // Keeping one decimal for average rating
            setAverageRating(average.toFixed(1));
          } else {
            setAverageRating("No ratings yet");
          }
        } catch (error) {
          console.error("Error fetching reviews with MetaMask:", error);
          setAverageRating("Error fetching ratings");
        }
      } else {
        console.log("MetaMask is not installed");
        setAverageRating("MetaMask not available");
      }
    }

    if (product.id) {
      fetchAverageRating();
    }
  }, [product.id]);

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
          <StarRating averageRating={averageRating} />
          {averageRating && <p>Rating: {averageRating} / 5</p>}
        </div>
      </div>
    </Link>
  );
}

export default ProductCard;
