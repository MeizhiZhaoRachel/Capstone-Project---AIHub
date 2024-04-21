// Server.js
import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import pg from "pg";
import cors from "cors";
import Web3 from "web3";
import { pool, createUserTable, setupProductsTable } from "./database.js";
import reviewContractABI from "../components/ProductList/reviewContractABI.json" assert { type: "json" };

const app = express();
// Define the port number for the server to listen on
const PORT = 3000;

// Define the URL for the Infura provider
const INFURA_URL =
  "https://sepolia.infura.io/v3/dee208015aa64ad7ac33bdc6c192bc4f";
const contractAddress = "0x4e9abec89a8b6a2453511d97e3d7a85d2a5193a7";
const web3 = new Web3(INFURA_URL);
const reviewContract = new web3.eth.Contract(
  reviewContractABI,
  contractAddress
);
// Web3 setup
// URL for the Ganache HTTP provider
// const ganacheUrl = "http://localhost:7545";
// const web3 = new Web3(new Web3.providers.HttpProvider(ganacheUrl));

async function createProducts() {
  try {
    await setupProductsTable();
    console.log("Table products created successfully");
  } catch (error) {
    console.log("Error creating table:", error);
  }
}

createProducts();

async function createSignUp() {
  try {
    await createUserTable();
    console.log("Table users created successfully");
  } catch (error) {
    console.log("Error creating table:", error);
  }
}

createSignUp();

var corsOptions = {
  origin: ["http://localhost:3000", "http://localhost:3001"], // This should match the origin of your frontend application
  credentials: true, // If your frontend needs to send cookies or authorization headers
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  allowedHeaders: "Content-Type,Authorization",
};

app.use(cors(corsOptions));
app.use(express.json());

app.post("/api/reviews", async (req, res) => {
  const { productId, content, rating, userIdOrEmail, vocation } = req.body;
  const parsedRating = parseInt(rating, 10);
if (isNaN(parsedRating)) {
  errors.push("Rating must be a valid number.");
}
  let errors = [];

  // Validate data here
  // if (!productId || !content || rating == null || !userIdOrEmail) {
  //   return res.status(400).json({ error: "Missing required fields" });
  // }

   // Check for missing or invalid rating
   if (rating == null) {
    errors.push("Rating is required and must be a number.");
  }

  // Check for missing user identifier
  if (!userIdOrEmail) {
    errors.push("User identifier is required.");
  }

  // Check for missing content
  if (!content) {
    errors.push("Content is required.");
  }

  // Check for missing product ID
  if (!productId) {
    errors.push("Product ID is required.");
  }

  // If there are any errors, return them all in the response
  if (errors.length > 0) {
    console.log("Sending errors:", errors); // Log the errors to check
    return res.status(400).json({ errors: errors });
  }

  try {
    // Encode the function call to the smart contract
    const data = reviewContract.methods
      .writeReview(productId.toString(), content, parsedRating, userIdOrEmail, vocation)
      .encodeABI();
    res.json({
      message: "Transaction data prepared",
      transactionData: data,
      contractAddress: contractAddress,
      productId:productId.toString(),
      content:content,
      rating:parsedRating,
      userIdOrEmail:userIdOrEmail,
      vocation:vocation
    });
  } catch (error) {
    console.error("Error preparing transaction:", error);
    res.status(500).json({ error: "Error preparing transaction" });
  }
});

// Set up review contract route
app.get("/api/reviews", async (req, res) => {
  // const origin = req.headers.origin;
  // res.header("Access-Control-Allow-Origin", origin);
  // res.header(
  //   "Access-Control-Allow-Headers",
  //   "Origin, X-Requested-With, Content-Type, Accept"
  // );
  try {
    const events = await reviewContract.getPastEvents("ReviewAdded", {
      fromBlock: 0,
      toBlock: "latest",
    });
    if (events.length === 0) {
      // Return a successful empty response when no reviews are found
      return res.status(200).json({ message: "No reviews found", reviews: [] });
    }
    res.json(events.map((event) => event.returnValues));
  } catch (error) {
    console.error("Error retrieving reviews from blockchain:", error);
    res.status(502).send("Error retrieving reviews from the blockchain");
  }
});

// // Get all products route
app.get("/api/products", async (req, res) => {
  const origin = req.headers.origin;
  res.header("Access-Control-Allow-Origin", origin);
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  try {
    const result = await pool.query("SELECT * FROM products");
    res.json(result.rows);
  } catch (error) {
    console.error("Error getting products:", error);
    res.status(500).json({ error: "Error getting products" });
  }
});

// Sign Up Route
app.post("/api/signup", async (req, res) => {
  const origin = req.headers.origin;

  res.header("Access-Control-Allow-Origin", origin);
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  /* req.body should contain the following fields:
  "firstName": "John",
  "lastName": "Doe",
  "email": "john.doe@example.com",
  "password": "password123"
} */
  const {
    firstName,
    lastName,
    email,
    password,
    gender,
    vocation,
    otherVocation,
  } = req.body;
  // Hash the password using bcrypt
  const hashedPassword = await bcrypt.hash(password, 10);
  // Determine the effective vocation: if vocation is 'other', use otherVocation value
  const effectiveVocation = vocation === "other" ? otherVocation : vocation;
  try {
    // Check if the user already exists in the database
    const result = await pool.query(`SELECT * FROM users WHERE email=$1`, [
      email,
    ]);
    if (result.rows.length > 0) {
      // If the user already exists, send a 409 Conflict status
      return res.status(409).json({ error: "User already exists" });
    }
  } catch (error) {
    console.error("SignUp Error:", error);
    return res.status(500).json({ error: "Error checking for existing user" });
  }
  // Insert the new user into the database
  try {
    const result = await pool.query(
      "INSERT INTO users (first_name, last_name, email, password, gender, vocation) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *",
      [firstName, lastName, email, hashedPassword, gender, effectiveVocation]
    );
    // Given that the INSERT operation is expected to insert a single row,
    // result.rows will be an array with one element (the inserted row's data).
    const user = result.rows[0];
    console.log("User created:", user);
    // Removing the password before sending the user object back
    delete user.password;
    // Send the created user back with a 201 Created status
    res.status(201).json(user);
  } catch (error) {
    console.error("SignUp Error:", error);
    res.status(500).json({ error: "Error creating user" });
  }
});

// Sign In Route
app.post("/api/signin", async (req, res) => {
  const origin = req.headers.origin;
  res.header("Access-Control-Allow-Origin", origin);
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  const { email, password } = req.body;
  console.log(email, password);
  try {
    // 'UPDATE users SET last_name = $2, password = $3 WHERE email = $1'
    // const values = ['john.doe@example.com', 'Doe', 'hashedpassword123'];
    // The email field in the WHERE clause will be replaced with 'john.doe@example.com' ($1),
    // The last_name field will be set to 'Doe' ($2),
    // The password field will be set to 'hashedpassword123' ($3).
    // Here, $1 would be replaced with the first value of email array
    const result = await pool.query("SELECT * FROM users WHERE email = $1", [
      email,
    ]);
    if (result.rows.length > 0) {
      const user = result.rows[0];
      // The bcrypt.compare function is a method provided by the bcrypt library
      // to securely check if a plaintext password matches a hashed password
      const isMatch = await bcrypt.compare(password, user.password);
      if (isMatch) {
        // jwt.sign(payload, secretOrPrivateKey, options) is the method used to create the token.
        // payload: The first argument is the payload, which is an object containing the claims of the token. Here, { userId: user.id } is the payload,
        // where user.id is presumably the unique identifier for the user in the database
        // secretOrPrivateKey: The second argument is the secret key used to sign the token.
        // 'yourSecretKey' should be a strong, unguessable string that only the server knows.
        const token = jwt.sign(
          { userId: user.id },
          "12e0a976c664d02f47dd021f1229497a05f2503dffda7e9c3740b3de2ff1dd5b",
          { expiresIn: "24h" }
        ); // Directly using a secret key here
        res.json({ user, token });
      } else {
        res.status(400).json({ error: "Invalid credentials" });
      }
    } else {
      res.status(404).json({ error: "User not found" });
    }
  } catch (error) {
    console.error("SignIn Error:", error);
    res.status(500).json({ error: "Error signing in" });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
