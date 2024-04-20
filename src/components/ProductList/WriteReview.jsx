import React, { useState, useEffect } from "react";
import { useProducts } from "../ProductDetail/ProductsContext";
import { useAuth } from "../Sign/AuthContext";
import { Link } from "react-router-dom";
import "../../style/ProductList/WriteReview.css";
import { useNavigate } from 'react-router-dom';
import reviewContractABI from "./reviewContractABI.json";
import Web3 from "web3";

const INFURA_URL =
  "https://sepolia.infura.io/v3/dee208015aa64ad7ac33bdc6c192bc4f";
const web3 = new Web3(INFURA_URL);
const reviewContractAddress = "0x296ffee7e9be5f2b57cc1ce417f1ac6030fbb45b";
const reviewContract = new web3.eth.Contract(
  reviewContractABI,
  reviewContractAddress
);

function WriteReview() {
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [showIntro, setShowIntro] = useState(true)
  const { currentUser } = useAuth();
  const [review, setReview] = useState({
    productId: "",
    content: "",
    rating: 0,
    userIdOrEmail: "",
    vocation: "",
  });
  // const contractAddress = '0x1dc66c0bf4d4e389477984f550ff7d98614aefdf'
  // const web3 = new Web3(window.ethereum);
  // const contractAddress = process.env.REACT_APP_CONTRACT_ADDRESS;

  

  const navigate = useNavigate(); // instantiate useNavigate
  const { products } = useProducts();

  useEffect(() => {
    if (currentUser) {
      setReview(prev => ({ ...prev, userIdOrEmail: currentUser.email, vocation: currentUser.vocation }));
    }
  }, [currentUser]);


  // if (!currentUser) {
  //   return (
  //     <div>
  //       Please <Link to="/signin">login in</Link> or <Link to="/signup">sign up</Link> to write a review.
  //     </div>
  //   );
  // }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    // Convert productId to string if it's the target of the change event
    if (name === "productId") {
      setReview((prevState) => ({ ...prevState, [name]: value.toString() }));
    } else {
      setReview((prevState) => ({ ...prevState, [name]: value }));
    }
  };

  async function getAccount() {
    // Check if MetaMask is installed on user's browser
    if (window.ethereum) {
      try {
        // Request account access if needed
        await window.ethereum.request({ method: 'eth_requestAccounts' });
  
        // Accounts now exposed, get the list of accounts
        const accounts = await web3.eth.getAccounts();
        return accounts[0];
      } catch (error) {
        throw new Error('User denied account access or an error occurred.');
      }
    } else {
      // If MetaMask is not installed, alert the user
      alert('MetaMask is not installed. Please consider installing it: https://metamask.io/download.html');
    }
  }

  const submitReview = async () => {
    try {
    const response = await fetch("http://localhost:3000/api/reviews", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...review }),
      
    });
    console.log(response);

    if (response.ok) {
      const responseBody = await response.json();

      // Ensure the window.ethereum object is available.
      if (window.ethereum) {
        // Request account access
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });

        if (accounts.length === 0) {
          throw new Error('No Ethereum account available.');
        }

        const account = accounts[0]; // The selected account in MetaMask

        // Ensure the account is a valid Ethereum address
        if (!web3.utils.isAddress(account)) {
          throw new Error('Invalid Ethereum address.');
        }

        // Now use MetaMask to send the transaction
        const txHash = await window.ethereum.request({
          method: 'eth_sendTransaction',
          params: [{
            from: account,
            to: reviewContractAddress,
            data: responseBody.transactionData,
            value: '0x0', // Ensure this is a hex string
          }],
        });

        console.log("Transaction Hash:", txHash);

        navigate('/thankyou');
      } else {
        throw new Error('MetaMask is not installed.');
      }
    } else {
      // Handle errors from your API
      const errorResponse = await response.json();
      console.error('Failed to submit review:', errorResponse);
      alert('Failed to submit review: ' + (errorResponse.errors.join(', ') || 'Unknown error'));
    }
  } catch (error) {
    console.error('Error submitting the review:', error);
    alert('Failed to submit review. ' + error.message);
  }
};

  const handleFormSubmit = (e) => {
    e.preventDefault();
    submitReview();
  };

  return (
    <div className="write-review-container">
      {showIntro && (
        <div className="write-review">
          <div className="reviews-img"></div>
            <p>Help people looking for great
              <br/>products just like you!</p>
            <button
              onClick={() => {setShowReviewForm(!showReviewForm); setShowIntro(!showIntro)}}
              className="write-review-button"
            >
              Write a review
            </button>     
        </div>
          )}

      {showReviewForm && !currentUser && (    
      <div className="login-prompt">
        <div className="reviews-img"></div>
        <p>
        Please <Link to="/signin">login in</Link> or <Link to="/signup">sign up</Link> to write a review.
        </p>
      </div>
      )
      }
      {showReviewForm && currentUser && (
        <div className="review-form">
          <div className="review-header">
            <div className="pen-img"></div>
            <h2>Write A Review</h2>
          </div>
          <form onSubmit={handleFormSubmit}>
            <select
              name="productId"
              onChange={handleInputChange}
              value={review.productId}
            ><option value="" disabled>Select a product</option>
              {products.map((product) => (
                <option key={product.id} value={product.id.toString()}>
                  {product.name}
                </option>
              ))}
            </select>
            <div className="rate">
              <p>Rate your experience</p>
              <div className="star-rating">
              {/* Each button represents a star for the rating. The key is index because it's unique for each element in the map...*/}
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
            </div>
            <div className="text-content">
              <p>The feeling of experience</p>
              <textarea
                name="content"
                placeholder="Share your experience"
                onChange={handleInputChange}
                value={review.content}
              ></textarea>
            </div>
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
