import React, { useState } from "react";
import { useProducts } from "../ProductDetail/ProductsContext";
import { useAuth } from "../Sign/AuthContext";
import { Link } from "react-router-dom";
import "../../style/ProductList/WriteReview.css";

function WriteReview() {
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [review, setReview] = useState({
    productId: "",
    content: "",
    rating: 0,
  });

  const { products } = useProducts();
  const { currentUser } = useAuth();

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
    const response = await fetch("http://localhost:3000/api/reviews", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...review, userIdOrEmail: currentUser.email }),
    });

    const data = await response.json();
    if (response.ok) {
      alert("Review submitted successfully: " + data.message);
      // Reset form or handle next steps
    } else {
      alert("Failed to submit review: " + data.error);
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
          <h2>Write a review</h2>
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
