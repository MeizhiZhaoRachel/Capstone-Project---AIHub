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
  Legend,
} from "chart.js";
import { Bar, Pie } from "react-chartjs-2";
import "../../style/ProductDetail/DataAnalysis.css";
import ChartDataLabels from "chartjs-plugin-datalabels";
import { color } from "chart.js/helpers";

// Register necessary Chart.js components
Chart.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Tooltip,
  Legend,
  ChartDataLabels // Register the plugin here
);

const INFURA_URL =
  "https://sepolia.infura.io/v3/dee208015aa64ad7ac33bdc6c192bc4f";
const web3 = new Web3(INFURA_URL);
const reviewContractAddress = "0x4e9abec89a8b6a2453511d97e3d7a85d2a5193a7";
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

        const parsedReviewsData = reviewsData.map((review) => ({
          ...review,
          rating: parseInt(review.rating, 10),
        }));
        setReviews(parsedReviewsData);
        analyzeData(reviews);
        analyzeVocations(reviews);
      } catch (error) {
        console.error("Error fetching reviews:", error);
      }
    };
    fetchReviewsFromBlockchain();
  }, [productId, reviews]);

  const analyzeData = (reviews) => {
    const counts = [5, 4, 3, 2, 1].map(
      (rating) =>
        reviews.filter(
          (review) => review.rating === rating && review.productId === productId
        ).length
    );
    setRatingCounts(counts.reverse());
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
    labels: ["5 Stars", "4 Stars", "3 Stars", "2 Stars", "1 Star"],
    datasets: [
      {
        label: "Rating Distribution",
        data: ratingCounts.reverse(),
        backgroundColor: "rgba(255, 187, 112)", // Uniform color for all bars
        // [
        //   "rgba(255, 99, 132, 0.6)",
        //   "rgba(54, 162, 235, 0.6)",
        //   "rgba(255, 206, 86, 0.6)",
        //   "rgba(75, 192, 192, 0.6)",
        //   "rgba(153, 102, 255, 0.6)",
        // ],
        // borderColor: [
        //   "rgba(255, 99, 132, 1)",
        //   "rgba(54, 162, 235, 1)",
        //   "rgba(255, 206, 86, 1)",
        //   "rgba(75, 192, 192, 1)",
        //   "rgba(153, 102, 255, 1)",
        // ],
        borderColor: "rgba(255, 213, 150, 1)",
        borderWidth: 1,
      },
    ],
  };

  const optionsBar = {
    indexAxis: "y", // To make the bars horizontal
    scales: {
      x: {
        grid: {
          display: false, // This will remove the grid lines
        },
        border: {
          display: false, // This will remove the border
        },
        ticks: {
          display: false, // This will remove the x-axis labels
        },
      },
      y: {
        beginAtZero: true,
        grid: {
          display: false, // This will remove the grid lines
        },
        border: {
          display: false, // This will remove the border
        },
      },
    },
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false, // Set to false to hide the legend
      },
      tooltip: {
        enabled: true, // This will enable tooltips
      },
      datalabels: {
        display: true,
        color: "#000000",
        anchor: "end",
        align: "end",
        offset: 4, // Adjusts the distance between the label and the bar end
        padding: {
          // Add padding around the labels
          top: 10,
          right: 10,
        },
        font: {
          size: 12, // Adjust font size if necessary
        },
        formatter: (value, context) => {
          let sum = 0;
          let dataArr = context.chart.data.datasets[0].data;
          dataArr.map((data) => {
            sum += data;
          });
          let percentage = ((value * 100) / sum).toFixed(0) + "%";
          return percentage;
        },
      },
    },
  };

  return (
    <div className="chart-container">
      <div className="bar-container">
        <div className="bar-section">
          <div className="barName">Review Scores</div>
          <Bar
            data={data}
            options={optionsBar}
            style={{ maxWidth: "600px", maxHeight: "200px" }}
          />
        </div>
        <div className="bar-section">
          <div className="barName">Reviewer Sentiment</div>
          <Pie
            data={vocationData}
            options={{ responsive: true, maintainAspectRatio: false }}
            style={{ maxWidth: "300px", maxHeight: "200px" }}
          />
        </div>
      </div>
    </div>
  );
}

export default DataAnalysis;
