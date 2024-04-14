// ProductCard.js
import { Link } from "react-router-dom";
import "../../style/ProductList/ProductCard.css";
import React, { useState, useEffect } from "react";
import reviewContractABI from "./reviewContractABI.json";
import Web3 from "web3";

// URL for the Ganache HTTP provider
const ganacheUrl = "http://localhost:7545";
// Initialize Web3 with the Ganache HTTP provider
const web3 = new Web3(new Web3.providers.HttpProvider(ganacheUrl));
const reviewContractAddress = "0x860771da83fa4f2f4b1c47cc0b0aba8c9b6c0e35";
const reviewContract = new web3.eth.Contract(
  reviewContractABI,
  reviewContractAddress
);

function ProductCard({ product }) {
  const [averageRating, setAverageRating] = useState(null);
  useEffect(() => {
    async function fetchAverageRating() {
      const productIdString = String(product.id); // Ensure productId is a string
      try {
        const reviewsData = await reviewContract.methods
          .getReviewsByProductId(productIdString)
          .call();

        if (reviewsData.length > 0) {
          const total = reviewsData.reduce(
            (acc, review) => acc + parseInt(review.rating, 10),
            0
          );
          const average = total / reviewsData.length;
          // Keeping one decimal for average rating
          setAverageRating(average.toFixed(1)); 
        } else {
          setAverageRating("No ratings yet");
        }
      } catch (error) {
        console.error("Error fetching reviews:", error);
        setAverageRating("Error fetching ratings");
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
          {averageRating && <p>Rating: {averageRating} / 5</p>}
        </div>
      </div>
    </Link>
  );
}

export default ProductCard;
