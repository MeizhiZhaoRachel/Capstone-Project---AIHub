import React, { useState, useEffect } from 'react';
import Web3 from 'web3';
import reviewContractABI from './reviewContractABI.json';
import { useProducts } from './ProductsContext'; // Import useProducts hook
import './ProductDetailPage.css';

const web3 = new Web3(Web3.givenProvider);
const reviewContractAddress = '0xbe142227e16007a5eb3f9bc31a9109e5023e2a4e';
const reviewContract = new web3.eth.Contract(reviewContractABI, reviewContractAddress);

function ProductDetailPage({ match }) {
  const [productDetails, setProductDetails] = useState(null);
  const [reviews, setReviews] = useState([]);

  const { products } = useProducts(); // Use the useProducts hook to access the products context

  const fetchProductDetailsFromBlockchain = async () => {
    const details = await reviewContract.methods.getProductDetails(match.params.productId).call();
    // Combine blockchain details with context details based on matching ID
    const contextProductDetails = products.find(p => p.id.toString() === match.params.productId);
    // create a new object that merges properties from two existing objects
    setProductDetails({ ...details, ...contextProductDetails });
  };

  const fetchReviewsFromBlockchain = async () => {
    const reviewsData = await reviewContract.methods.getReviewsForProduct(match.params.productId).call();
    setReviews(reviewsData);
  };

  useEffect(() => {
    // Ensure products are loaded from context before attempting to fetch details
    if(products.length > 0) { 
      fetchProductDetailsFromBlockchain();
    }
    fetchReviewsFromBlockchain();
    // Re-fetch when productId or products change
  }, [match.params.productId, products]); 

  if (!productDetails) {
    return <div>Loading product details...</div>;
  }

  return (
    <div className="product-detail-page">
      <h1>{productDetails.name}</h1>
      <p>{productDetails.description}</p>
      {productDetails.imageUrl && <img src={productDetails.imageUrl} alt={productDetails.name} />} {/* Display image if available */}
      <h2>Reviews</h2>
      {reviews.length ? (
        reviews.map((review, index) => (
          <div key={index} className="review">
            <p>Content: {review.content}</p>
            <p>Rating: {review.rating}</p>
          </div>
        ))
      ) : (
        <p>No reviews yet.</p>
      )}
    </div>
  );
}

export default ProductDetailPage;
