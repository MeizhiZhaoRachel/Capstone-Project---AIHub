// WriteReview.js
import React, { useState, useEffect } from "react";
import Web3 from "web3";
import reviewContractABI from "./reviewContractABI.json";
import { useProducts } from "../ProductDetail/ProductsContext";
import { useAuth } from "../Sign/AuthContext";
import { Link } from "react-router-dom";
import "../../style/ProductList/WriteReview.css";

// Initialize a Web3 instance,
// connecting to the Ethereum network
// via a provider injected by the user's Ethereum browser extension (e.g., MetaMask).
const web3 = new Web3(Web3.givenProvider);
const reviewContractAddress = "0xbe142227e16007a5eb3f9bc31a9109e5023e2a4e";
// Create a contract instance in your application, allowing you to interact with the smart contract.
// The first argument is the ABI (Application Binary Interface) of your contract, which is a JSON representation
// defining how to interact with the contract (functions, variables, etc.).
// The second argument is the address where the contract is deployed.
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
    name: "",
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
    // e.target essentially gives you access to the element that triggered the event.
    const { name, value } = e.target;
    // ...prevState: (...) is used to copy all the properties from the current state object into a new object.
    // the event object is used to extract the name of the textarea and the value entered by the user.
    // For example, in textarea with name="content", name will be "content" and value will be the text entered by the user.
    // and value is the new value for that property.
    setReview((prevState) => ({ ...prevState, [name]: value }));
  };

  // This function is called when the form is submitted.
  const submitReview = async () => {
    try {
      // prompt the user for permission to access their Ethereum accounts
      const accounts = await web3.eth.requestAccounts();
      // Date.now() returns the number of milliseconds elapsed since January 1, 1970 00:00:00 UTC.
      const timestamp = Date.now();
      // Assuming you have access to currentUser object with an email property
      const userIdOrEmail = currentUser.email;
      //
      await reviewContract.methods
        // Function comes from the smart contract ABI
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
    // Prevent form from causing a page reload
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
          {/* }If there's no handleInputChange function implemented or a similar mechanism 
          to update the component's state based on user input, then 
          the component would not automatically gather or update its state with the values 
          from the form inputs (review.productId, review.content, review.rating, etc.). */}
          <form onSubmit={handleFormSubmit}>
            <select
              // setReview((prevState) => ({ ...prevState, [name]: value }));
              // name = "productId" and value = {review.productId}
              name="productId"
              onChange={handleInputChange}
              // The value={review.productId} on the <select> element ensures that
              // the dropdown's selected value corresponds to the productId in your component's review state.
              // When a user selects a product from the dropdown, review.productId is updated to match the value of the selected <option>, which is product.id.
              value={review.productId}
            >
              {products.map((product) => (
                // When a user selects a product from the dropdown,
                // review.productId is updated to match the value of the selected <option>,
                // which is product.id.
                // The key provides a unique identifier for each element in the list
                // Technically, you can render a list without providing a key prop
                // Without keys, React has no way of knowing which elements have changed.
                <option key={product.id} value={product.id}>
                  {product.name}
                </option>
              ))}
            </select>
            <div className="star-rating">
              {/* The underscore used when you don't need the value provided by the map */}
              {/* index: Represents the current position in the array, 
              starting from 0 up to 4 (since there are 5 stars). */}
              {[...Array(5)].map((_, index) => (
                // This line generates an individual star button for each iteration.
                <button
                  key={index}
                  type="button"
                  // Backticks (`): when you want to include dynamic expressions inside a string
                  // This is where an expression is evaluated to dynamically set the class names.
                  className={`star-button ${
                    review.rating > index ? "selected" : ""
                  }`}
                  onClick={() =>
                    setReview((prevState) => ({
                      // prevState is used to ensure that we only update the rating property
                      // while keeping the rest of the review state unchanged.
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
              // setReview((prevState) => ({ ...prevState, [name]: value }));
              // name = "content" and value = {review.content}
              name="content"
              // This text is displayed in the <textarea> before the user enters a value
              placeholder="The feeling of experience"
              onChange={handleInputChange}
              // bind the input to the review.content state property
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
