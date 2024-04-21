import React, { createContext, useContext, useState, useEffect} from "react";
import Web3 from "web3";
import reviewContractABI from "../ProductList/reviewContractABI.json";
import { useProducts } from "./ProductsContext";
import { useParams } from "react-router-dom";

// Create a Context object for authentication data
const ReviewContext = createContext();

// Define the URL for the Infura provider
const INFURA_URL =
  "https://sepolia.infura.io/v3/dee208015aa64ad7ac33bdc6c192bc4f";
// Smart contract address on the blockchain.
const contractAddress = "0x4e9abec89a8b6a2453511d97e3d7a85d2a5193a7";
const web3 = new Web3(INFURA_URL);
// Creates an instance of the smart contract.
const reviewContract = new web3.eth.Contract(
  reviewContractABI,
  contractAddress
);

// Define a provider component to encapsulate the authentication logic and state
export const ReviewProvider = ({ children }) => {
  // State hooks for storing product details and reviews.
  const [productDetails, setProductDetails] = useState(null);
  const [reviews, setReviews] = useState([]);

  /* If a user visits http://yourwebsite.com/product/12345, 
    the productId extracted by useParams() would be the string "12345".*/
  const { productId } = useParams();
  const { products } = useProducts();

  useEffect(() => {
    // Find the product details from the provided context
    const currentProductDetails = products.find(
      (product) => product.id.toString() === productId
    );
    setProductDetails(currentProductDetails);
    // Fetch reviews from the blockchain
    const fetchReviewsFromBlockchain = async () => {
      try {
        const reviewsData = await reviewContract.methods
          .getReviewsByProductId(productId)
          .call();
        const parsedReviewsData = reviewsData.map((review) => ({
          ...review,
          rating: parseInt(review.rating, 10),
        }));
        setReviews(parsedReviewsData);
      } catch (error) {
        console.error("Error fetching reviews from blockchain:", error);
      }
    };
    // Ensure products are loaded from context before attempting to fetch details
    if (productId && products.length > 0) {
      fetchReviewsFromBlockchain();
    }
    /* The array [productId, products] at the end of the useEffect hook is known 
    as the dependencies array. This array tells React to re-run the effect in the 
    useEffect hook whenever any value in this array changes */
  }, [productId, products]);


return (
    <ReviewContext.Provider
      value={{ reviews }}
    >
      {children}
    </ReviewContext.Provider>
  );
};

// The data comes from AuthContext.Provider value={{ currentUser, signIn, signUp, signOut, authToken }}
export const useReview = () => useContext(ReviewContext);
