// ProductCard.js
import React from "react";
import { Link } from "react-router-dom";
import "../../style/ProductList/ProductCard.css"; 
import { useState, useEffect} from "react";
import reviewContractABI from "./reviewContractABI.json";
import Web3 from "web3";

const web3 = new Web3(Web3.givenProvider);
const reviewContractAddress = "0xbe142227e16007a5eb3f9bc31a9109e5023e2a4e";
const reviewContract = new web3.eth.Contract(reviewContractABI, reviewContractAddress);

function ProductCard({ product }) {
  const [averageRating, setAverageRating] = useState(null);

  useEffect(() => {
    const fetchAverageRating = async () => {
      const reviewsData = await reviewContract.methods.getReviewsByProductId(product.id).call();
      
      // Calculate the average rating from review data
      const average = reviewsData.reduce((acc, review) => acc + parseInt(review.rating, 10), 0) / reviewsData.length;
      // Keeping one decimal for average
      setAverageRating(average.toFixed(1)); 
    };

    fetchAverageRating();
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
