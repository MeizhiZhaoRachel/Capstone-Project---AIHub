import Web3 from "web3";
import reviewContractABI from "../components/ProductList/reviewContractABI.json" assert { type: "json" };

const INFURA_URL =
    "https://sepolia.infura.io/v3/dee208015aa64ad7ac33bdc6c192bc4f";
// Smart contract address on the blockchain.
const contractAddress = "0x296ffee7e9be5f2b57cc1ce417f1ac6030fbb45b";
const web3 = new Web3(INFURA_URL);

// Creates an instance of the smart contract.
const reviewContract = new web3.eth.Contract(
    reviewContractABI,
    contractAddress
);

async function postReviews() {
    try{
    const Reviews = await reviewContract.methods.writeReview("1", 'xx', 2, 'gt@mail', 'teacher').call();;
    console.log(Reviews);

    console.log("Review posted:", response);
} catch (error) {
  console.error("Failed to post review:", error);
}
}
// Function to get the total number of reviews.
// async function getTotalReviews() {
// 	  const totalReviews = await reviewContract.methods.getReviewsByProductId('2').call();
// 	  console.log(totalReviews);
// }

postReviews();