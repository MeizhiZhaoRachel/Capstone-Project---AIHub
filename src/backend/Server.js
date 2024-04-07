// Server.js
import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import pg from 'pg';
import cors from 'cors';

const app = express();
// Define the port number for the server to listen on
const PORT = 3000;

// PostgreSQL client configuration for connection pooling
// const pool = new Pool({
//   user: 'postgres',
//   password: '123456',
//   database: 'AIHub',
//   host: '35.244.76.220',
//   port: 5432,
// });

import { pool, createUserTable } from './database.js';

async function createSignUp(){
  try {
    await createUserTable();
    console.log('Table users created successfully');
}
catch (error) {console.log("Error creating table:", error);
}
}

createSignUp();

// app.use(cors({
//   origin: 'http://localhost:3000', // Directly setting the CORS origin
//   credentials: true,
// }));
var corsOptions = {
  origin: 'http://localhost:3001',  // Allow only requests from this origin
  optionsSuccessStatus: 200 // For legacy browser support (IE11, various SmartTVs)
};

app.use(cors());
app.use(express.json());

// Sign Up Route
app.post('/api/signup', async (req, res) => {
  const origin= req.headers.origin
  res.header("Access-Control-Allow-Origin", origin); 
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  /* req.body should contain the following fields:
  "firstName": "John",
  "lastName": "Doe",
  "email": "john.doe@example.com",
  "password": "password123"
} */
  const { firstName, lastName, email, password, gender, vocation, otherVocation } = req.body;
  // Hash the password using bcrypt
  const hashedPassword = await bcrypt.hash(password, 10);
  // Determine the effective vocation: if vocation is 'other', use otherVocation value
  const effectiveVocation = vocation === 'other' ? otherVocation : vocation;

  // Insert the new user into the database
  try {
    const result = await pool.query(
      'INSERT INTO users (first_name, last_name, email, password, gender, vocation) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
      [firstName, lastName, email, hashedPassword, gender, effectiveVocation]
    );
    // Given that the INSERT operation is expected to insert a single row, 
    // result.rows will be an array with one element (the inserted row's data).
    const user = result.rows[0];
    console.log('User created:', user)
    // Removing the password before sending the user object back
    delete user.password;
    // Send the created user back with a 201 Created status
    res.status(201).json(user);
  } catch (error) {
    console.error('SignUp Error:', error);
    res.status(500).json({ error: 'Error creating user' });
  }
});

// Sign In Route
app.post('/api/signin', async (req, res) => {
  const { email, password } = req.body;

  try {
    // 'UPDATE users SET last_name = $2, password = $3 WHERE email = $1'
    // const values = ['john.doe@example.com', 'Doe', 'hashedpassword123'];
    // The email field in the WHERE clause will be replaced with 'john.doe@example.com' ($1),
    // The last_name field will be set to 'Doe' ($2),
    // The password field will be set to 'hashedpassword123' ($3).
    // Here, $1 would be replaced with the first value of email array
    const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
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
        const token = jwt.sign({ userId: user.id }, 'yourSecretKey', { expiresIn: '24h' }); // Directly using a secret key here
        res.json({ token });
      } else {
        res.status(400).json({ error: 'Invalid credentials' });
      }
    } else {
      res.status(404).json({ error: 'User not found' });
    }
  } catch (error) {
    console.error('SignIn Error:', error);
    res.status(500).json({ error: 'Error signing in' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
