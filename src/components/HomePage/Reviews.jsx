
// function Reviews() {


//   return (
//     <div className="reviews-container">
//       <div className="reviews-headline">Browse reviews</div>
//       <div className="review1 review">
//         <div className="review-rating">
//           <span>★</span>
//           <span>★</span>
//           <span>★</span>
//           <span>★</span>
//           <span>★</span>
//         </div>
//         <div className="review-info"><span className="reviewer-name">xxx </span>reviewed <span className="reviewer-name">ChatGPT</span></div>
//         <hr />
//         <div className="review-header">Excitement</div>
//         <div className="review-body">
//           I love this excellent AI product, and I got a lot of inspiration from
//           it
//         </div>
//       </div>
//       <div className="review2 review">
//         <div className="review-rating">
//           <span>★</span>
//           <span>★</span>
//           <span>★</span>
//           <span>★</span>
//           <span>★</span>
//         </div>
//         <div className="review-info"><span className="reviewer-name">xxx </span>reviewed <span className="reviewer-name">Gemini</span></div>
//         <hr />
//         <div className="review-header">Great work done</div>
//         <div className="review-body">
//           Impressive job! This AI product has been incredibly helpful and
//           efficient.
//         </div>
//       </div>
//       <div className="review3 review">
//         <div className="review-rating">
//           <span>★</span>
//           <span>★</span>
//           <span>★</span>
//           <span>★</span>
//           <span>★</span>
//         </div>
//         <div className="review-info"><span className="reviewer-name">xxx </span>reviewed <span className="reviewer-name">Gemini</span></div>
//         <hr />
//         <div className="review-header">Good Site</div>
//         <div className="review-body">
//           I found this site to be quite useful and user-friendly. It offers
//           valuable information and resources.
//         </div>
//       </div>
//       <div className="review4 review">
//         <div className="review-rating">
//           <span>★</span>
//           <span>★</span>
//           <span>★</span>
//           <span>★</span>
//         </div>
//         <div className="review-info"><span className="reviewer-name">xxx </span>reviewed <span className="reviewer-name">ChatGPT</span></div>
//         <hr />
//         <div className="review-header">Love this service</div>
//         <div className="review-body">
//           Absolutely love this service! It's been a game-changer for me,
//           providing exceptional value and convenience.
//         </div>
//       </div>
//       <div className="review5 review">
//         <div className="review-rating">
//           <span>★</span>
//           <span>★</span>
//           <span>★</span>
//           <span>★</span>
//         </div>
//         <div className="review-info"><span className="reviewer-name">xxx </span>reviewed <span className="reviewer-name">ChatGPT</span></div>
//         <hr />
//         <div className="review-header">Expert</div>
//         <div className="review-body">
//           This AI product truly demonstrates expertise in its field. It's a
//           top-notch solution that consistently delivers outstanding results.
//         </div>
//       </div>
//       <div className="review6 review">
//         <div className="review-rating">
//           <span>★</span>
//           <span>★</span>
//           <span>★</span>
//           <span>★</span>
//           <span>★</span>
//         </div>
//         <div className="review-info"><span className="reviewer-name">xxx </span>reviewed <span className="reviewer-name">Gemini</span></div>
//         <hr />
//         <div className="review-header">Recommended</div>
//         <div className="review-body">
//           Highly recommend this AI product! It's been a game-changer for me,
//           offering exceptional performance and reliability.
//         </div>
//       </div>
//       <div className="review7 review">
//         <div className="review-rating">
//           <span>★</span>
//           <span>★</span>
//           <span>★</span>
//         </div>
//         <div className="review-info"><span className="reviewer-name">xxx </span>reviewed <span className="reviewer-name">ChatGPT</span></div>
//         <hr />
//         <div className="review-header">The price was affordable</div>
//         <div className="review-body">
//           I was pleasantly surprised by the affordability of this product. It
//           offers great value for the price.
//         </div>
//       </div>
//       <div className="review8 review">
//         <div className="review-rating">
//           <span>★</span>
//           <span>★</span>
//         </div>
//         <div className="review-info"><span className="reviewer-name">xxx </span>reviewed <span className="reviewer-name">Gemini</span></div>
//         <hr />
//         <div className="review-header">Having trouble with using</div>
//         <div className="review-body">
//           Encountering some difficulties while using this AI product. It needs
//           some improvements for better usability.
//         </div>
//       </div>
//       <div className="review9 review">
//         <div className="review-rating">
//           <span>★</span>
//           <span>★</span>
//           <span>★</span>
//           <span>★</span>
//           <span>★</span>
//         </div>
//         <div className="review-info"><span className="reviewer-name">xxx </span>reviewed <span className="reviewer-name">ChatGPT</span></div>
//         <hr />
//         <div className="review-header">Excellent customer support</div>
//         <div className="review-body">
//           The customer support provided by this company is outstanding. They are
//           responsive, helpful, and go above and beyond to ensure customer
//           satisfaction.
//         </div>
//       </div>
//     </div>
//   );
// }

import React, { useState, useEffect } from 'react';
import Web3 from 'web3';
import "../../style/HomePage/Reviews.css";
import reviewContractABI from "../ProductList/reviewContractABI.json";

// Define constants for connecting to the blockchain
const INFURA_URL = "https://sepolia.infura.io/v3/YOUR_PROJECT_ID";
const web3 = new Web3(INFURA_URL);
const contractAddress = "0x296ffee7e9be5f2b57cc1ce417f1ac6030fbb45b";
const reviewContract = new web3.eth.Contract(reviewContractABI, contractAddress);

function Reviews() {
    const [reviews, setReviews] = useState([]);

    useEffect(() => {
        const fetchReviews = async () => {
            try {
                
                const reviewData = await reviewContract.methods.getReviewsByProductId("1").call();
                // Filter for only 5-star reviews and limit to 9 entries
                const filteredReviews = reviewData
                    .filter(review => review.rating === 5)
                    .slice(0, 9);
                setReviews(filteredReviews);
            } catch (error) {
                console.error("Error fetching reviews from blockchain:", error);
            }
        };

        fetchReviews();
    }, []);

    return (
        <div className="reviews-container">
            <div className="reviews-headline">Browse reviews</div>
            {reviews.length > 0 ? (
                reviews.map((review, index) => (
                    <div key={index} className="review">
                        <div className="review-rating">
                        {/* Display a star for each rating point */}
                        {/* it expands the elements of the array into individual elements */}
                        {/* _ represents the current element of the array during each iteration */}
                            {[...Array(review.rating)].map((_, i) => <span key={i}>★</span>)}
                        </div>
                        <div className="review-info">
                            <span className="reviewer-name">{review.userIdOrEmail} </span>
                            reviewed <span className="reviewer-name">ChatGPT</span>
                        </div>
                        <hr />
                        <div className="review-body">
                            {review.content}
                        </div>
                    </div>
                ))
            ) : (
                <p>No 5-star reviews available.</p>
            )}
        </div>
    );
}

export default Reviews;
