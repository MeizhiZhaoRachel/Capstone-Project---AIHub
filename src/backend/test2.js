import Web3 from 'web3';
import reviewContractABI from "../components/ProductList/reviewContractABI.json" assert { type: "json" };
const INFURA_URL =
    "https://sepolia.infura.io/v3/dee208015aa64ad7ac33bdc6c192bc4f";

const web3 = new Web3(new Web3.providers.HttpProvider(INFURA_URL));
const account = web3.eth.accounts.privateKeyToAccount("0xe18ed698b73ae21cffe602bdb633bb447b74e88e9e3c816e556ef191368f8571");

web3.eth.accounts.wallet.add(account);
web3.eth.defaultAccount = account.address;
// Smart contract address on the blockchain.
const contractAddress = "0x4e9abec89a8b6a2453511d97e3d7a85d2a5193a7";


// Creates an instance of the smart contract.
const reviewContract = new web3.eth.Contract(
    reviewContractABI,
    contractAddress
);
// Now you can send transactions
async function postReview(productId, content, rating, userIdOrEmail, vocation) {
    const receipt = await reviewContract.methods.writeReview(productId, content, rating, userIdOrEmail, vocation).send({
        from: account.address,
        gas: '4700000' // Set appropriate gas limit
    });
    return receipt;
}

postReview('1','xx', 5, 'gt@mail', 'teacher').then(receipt => {
    console.log("Review posted:", receipt);
}).catch(error => {
    console.error("Failed to post review:", error);
});