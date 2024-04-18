import Web3 from 'web3';
import reviewContractABI from "../components/ProductList/reviewContractABI.json" assert { type: "json" };
const INFURA_URL =
    "https://sepolia.infura.io/v3/dee208015aa64ad7ac33bdc6c192bc4f";
    const contractAddress = "0x296ffee7e9be5f2b57cc1ce417f1ac6030fbb45b";
       
if (window.ethereum) {console.log('MetaMask is installed!');} else {console.log('MetaMask not installed');}
    // Use MetaMask's provider.
    const web3 = new Web3(window.ethereum);
    const reviewContract = new web3.eth.Contract(reviewContractABI, contractAddress);

    async function postReview(productId, content, rating, userIdOrEmail, vocation) {
        try {
            // Request account access if needed
            await window.ethereum.request({ method: 'eth_requestAccounts' });
            
            // Get list of accounts
            const accounts = await web3.eth.getAccounts();

            // Send transaction
            const receipt = await reviewContract.methods.writeReview(productId, content, rating, userIdOrEmail, vocation).send({
                from: accounts[0], // Use the first account as the sender
                gas: '4700000'     // Set appropriate gas limit
            });

            console.log("Review posted:", receipt);
            return receipt;
        } catch (error) {
            console.error("Failed to post review:", error);
            throw error; // Rethrow after logging
        }
    }

postReview('1','xx', 2, 'gt@mail', 'teacher')