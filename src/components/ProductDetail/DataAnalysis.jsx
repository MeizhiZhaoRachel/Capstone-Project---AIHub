// ProductCard.js
import React, { useState, useEffect } from "react";
import reviewContractABI from "../ProductList/reviewContractABI.json";
import Web3 from "web3";
import { useParams } from "react-router-dom";
import {
  Chart, 
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Tooltip,
  Legend
} from 'chart.js';
import { Bar, Pie } from 'react-chartjs-2';

// Register necessary Chart.js components
Chart.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Tooltip,
  Legend
);


const INFURA_URL =
  "https://sepolia.infura.io/v3/dee208015aa64ad7ac33bdc6c192bc4f";
const web3 = new Web3(INFURA_URL);
const reviewContractAddress = "0x296ffee7e9be5f2b57cc1ce417f1ac6030fbb45b";
const reviewContract = new web3.eth.Contract(
  reviewContractABI,
  reviewContractAddress
);

function DataAnalysis() {
  const [reviews, setReviews] = useState([]);
  const { productId } = useParams();
  const [ratingCounts, setRatingCounts] = useState([0, 0, 0, 0, 0]);
  const [vocationData, setVocationData] = useState({
    labels: [],
    datasets: [],
  });

  useEffect(() => {
    const fetchReviewsFromBlockchain = async () => {
      try {
        const reviewsData = await reviewContract.methods
          .getReviewsByProductId(productId)
          .call();
        setReviews(reviewsData);
        analyzeData(reviewsData);
        analyzeVocations(reviewsData);
      } catch (error) {
        console.error("Error fetching reviews:", error);
      }
    };
    fetchReviewsFromBlockchain();
  }, [productId]);

  const analyzeData = (reviews) => {
    const counts = [1, 2, 3, 4, 5].map(
      (rating) =>
        reviews.filter(
          (review) => review.rating === rating && review.productId === productId
        ).length
    );
    setRatingCounts(counts);
  };

  const analyzeVocations = (reviewsData) => {
    const vocations = {};
    reviewsData.forEach((review) => {
      vocations[review.vocation] = (vocations[review.vocation] || 0) + 1;
    });
    setVocationData({
      labels: Object.keys(vocations),
      datasets: [
        {
          data: Object.values(vocations),
          backgroundColor: [
            "rgba(255, 99, 132, 0.6)",
            "rgba(54, 162, 235, 0.6)",
            "rgba(255, 206, 86, 0.6)",
            "rgba(75, 192, 192, 0.6)",
            "rgba(153, 102, 255, 0.6)",
            "rgba(255, 159, 64, 0.6)",
            "rgba(199, 199, 199, 0.6)",
          ],
        },
      ],
    });
  };

  const data = {
    labels: ["1 Star", "2 Stars", "3 Stars", "4 Stars", "5 Stars"],
    datasets: [
      {
        label: "Rating Distribution",
        data: ratingCounts,
        backgroundColor: [
          "rgba(255, 99, 132, 0.6)",
          "rgba(54, 162, 235, 0.6)",
          "rgba(255, 206, 86, 0.6)",
          "rgba(75, 192, 192, 0.6)",
          "rgba(153, 102, 255, 0.6)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  const optionsBar = {
    scales: {
      x: { type: 'category' },
      y: { beginAtZero: true }
    },
    responsive: true,
    maintainAspectRatio: false
  };

  return (
    <div>
      <h1>Data Analysis</h1>
      <Bar data={data} options={optionsBar} />
      <Pie data={vocationData} options={{ responsive: true, maintainAspectRatio: false }} />
    </div>
  );
}

export default DataAnalysis;
