import React, { useState } from "react";
import { useProducts } from "../ProductDetail/ProductsContext";
import { useAuth } from "../Sign/AuthContext";
import { Link } from "react-router-dom";
import "../../style/ProductList/WriteReview.css";
import { useNavigate } from 'react-router-dom';
// import reviewContractABI from "../components/ProductList/reviewContractABI.json" assert { type: "json" };

function WriteReview() {
  const [showReviewForm, setShowReviewForm] = useState(false);
  const { currentUser } = useAuth();
  const [review, setReview] = useState({
    productId: "",
    content: "",
    rating: 0,
    vocation: currentUser.vocation,
  });
  // const contractAddress = '0x1dc66c0bf4d4e389477984f550ff7d98614aefdf'
  // const web3 = new Web3(window.ethereum);
  // const contractAddress = process.env.REACT_APP_CONTRACT_ADDRESS;

  const navigate = useNavigate(); // instantiate useNavigate
  const { products } = useProducts();


  if (!currentUser) {
    return (
      <div>
        Please <Link to="/signin">sign in</Link> or <Link to="/signup">sign up</Link> to write a review.
      </div>
    );
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    // Convert productId to string if it's the target of the change event
    if (name === "productId") {
      setReview((prevState) => ({ ...prevState, [name]: value.toString() }));
    } else {
      setReview((prevState) => ({ ...prevState, [name]: value }));
    }
  };

  const submitReview = async () => {
    try {
    const response = await fetch("http://localhost:3000/api/reviews", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...review, userIdOrEmail: currentUser.email }),
      
    });
    console.log(response);

    if(response.ok) {
      setReview({productId: "",
      content: "",
      rating: 0,})
    }

    navigate('/thankyou');
 
  } catch (error) {
    console.error('Error submitting the review:', error);
    alert('Failed to submit review');
  }
 
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    submitReview();
  };

  return (
    <div className="write-review-container">
      <button
        onClick={() => setShowReviewForm(!showReviewForm)}
        className="write-review-button"
      >
        Write a review
      </button>
      {showReviewForm && (
        <div className="review-form-container">
          {/* <h2>Write a review</h2> */}
          <form onSubmit={handleFormSubmit}>
            <select
              name="productId"
              onChange={handleInputChange}
              value={review.productId}
            >
              {products.map((product) => (
                <option key={product.id} value={product.id.toString()}>
                  {product.name}
                </option>
              ))}
            </select>
            <div className="star-rating">
            {/* Each button represents a star for the rating. The key is index because it's unique for each element in the map.*/}
              {[...Array(5)].map((_, index) => (
                <button
                  key={index}
                  type="button"
                  className={`star-button ${review.rating > index ? "selected" : ""}`}
                  onClick={() => setReview((prevState) => ({ ...prevState, rating: index + 1 }))}
                >
                  ★
                </button>
              ))}
            </div>
            <textarea
              name="content"
              placeholder="Share your experience"
              onChange={handleInputChange}
              value={review.content}
            ></textarea>
            <button type="submit" className="submit-review-button">
              Submit
            </button>
          </form>
        </div>
      )}
    </div>
  );
}

export default WriteReview;
