// WriteReview.js
import React, { useState, useEffect } from "react";
import Web3 from "web3";
import reviewContractABI from "./reviewContractABI.json";
import { useProducts } from "../ProductDetail/ProductsContext";
import { useAuth } from "../Sign/AuthContext";
import { Link } from 'react-router-dom';
import "../../style/ProductList/WriteReview.css";

/* Initialize a Web3 instance, connecting to the Ethereum network 
via a provider injected by the user's Ethereum browser extension (e.g., MetaMask).*/
const web3 = new Web3(Web3.givenProvider);
const reviewContractAddress = "0xbe142227e16007a5eb3f9bc31a9109e5023e2a4e";
// Create a contract instance in your application, allowing you to interact with the smart contract.
// The first argument is the ABI (Application Binary Interface) of your contract, which is a JSON representation
// defining how to interact with the contract (functions, variables, etc.).
// The second argument is the address where the contract is deployed.
// You need to replace `reviewContractABI` with the actual ABI JSON of your contract.
const reviewContract = new web3.eth.Contract(
  reviewContractABI,
  reviewContractAddress
);

function WriteReview() {
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [isMetaMaskInstalled, setIsMetaMaskInstalled] = useState(false);

  useEffect(() => {
    // evaluates to true if 'ethereum' exists, indicating that an Ethereum wallet is installed.
    setIsMetaMaskInstalled(Boolean(window.ethereum));
    // The empty dependency array [] means this effect runs once after the initial render, similar to componentDidMount.
  }, []);

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
        Please <Link to="/signin">sign in</Link> or{" "}
        <Link to="/signup">sign up</Link> to write a review.
      </div>
    );
  }
  // e represents the event that triggered the call to handleInputChange.
  const handleInputChange = (e) => {
    // This line destructures the e.target object, extracting the name and value properties.
    const { name, value } = e.target;
    /* The new state is formed by spreading the previous state into a new object  (...prevState)
    updating the relevant property with the input's new value ([name]: value).*/
    // name variable will be used as the key
    setReview((prevState) => ({ ...prevState, [name]: value }));
  };

  // This function is called when the form is submitted.
  const submitReview = async () => {
    try {
      // prompt the user for permission to access their Ethereum accounts
      const accounts = await web3.eth.requestAccounts();
      const timestamp = Date.now(); // Current timestamp in milliseconds
      const userIdOrEmail = currentUser.email; // Assuming you have access to currentUser object
      await reviewContract.methods
        .writeReview(
          review.productId,
          review.content,
          review.rating,
          userIdOrEmail,
          timestamp
        )
        // the transaction should be made from the user's first account
        .send({ from: accounts[0] });
      // Additional logic to handle successful submission
    } catch (error) {
      // Additional logic to handle errors
      console.error("Error submitting review:", error);
    }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (!isMetaMaskInstalled) {
      // If MetaMask is not installed, provide a message or modal to instruct on installation
      // For demonstration, using console.log to avoid browser pop-up blocking
      console.log(
        "MetaMask is not installed. Please install it to write a review."
      );
      return;
    }
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
      {showReviewForm && isMetaMaskInstalled && (
        <div className="review-form-container">
          <h2>Write a review</h2>
          <form onSubmit={handleFormSubmit}>
            <select
              // set productId as the name of the select element
              name="productId"
              onChange={handleInputChange}
              value={review.productId}
            >
              {products.map((product) => (
                <option key={product.id} value={product.id}>
                  {product.name}
                </option>
              ))}
            </select>
            <div className="star-rating">
              {[...Array(5)].map((_, index) => (
                <button
                  key={index}
                  type="button"
                  className={`star-button ${
                    review.rating > index ? "selected" : ""
                  }`}
                  onClick={() =>
                    setReview((prevState) => ({
                      ...prevState,
                      rating: index + 1,
                    }))
                  }
                >
                  ★
                </button>
              ))}
            </div>
            <textarea
              name="content"
              placeholder="The feeling of experience"
              onChange={handleInputChange}
              value={review.content}
            ></textarea>
            <button type="submit" className="submit-review-button">
              Submit
            </button>
          </form>
        </div>
      )}
      {!isMetaMaskInstalled && showReviewForm && (
        <p>
          MetaMask is not installed. Please
          <a
            href="https://metamask.io/download.html"
            target="_blank"
            rel="noopener noreferrer"
          >
            {" "}
            install MetaMask
          </a>
          to write a review.
        </p>
      )}
    </div>
  );
}

export default WriteReview;
