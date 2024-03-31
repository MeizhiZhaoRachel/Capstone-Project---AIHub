const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { Pool } = require('pg');
const cors = require('cors');

const app = express();
const PORT = 3000; // Directly setting the port number

// PostgreSQL client configuration
const pool = new Pool({
  user: 'postgres', 
  password: '123456', 
  database: 'x', 
  host: '35.244.76.220', 
  port: 5432, 
});

app.use(cors({
  origin: 'http://localhost:3000', // Directly setting the CORS origin
  credentials: true,
}));

app.use(express.json());

// Sign Up Route
app.post('/api/signup', async (req, res) => {
  const { firstName, lastName, email, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    const result = await pool.query(
      'INSERT INTO users (first_name, last_name, email, password) VALUES ($1, $2, $3, $4) RETURNING *',
      [firstName, lastName, email, hashedPassword]
    );
    const user = result.rows[0];
    delete user.password; // Removing the password before sending the user object back
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
    const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    if (result.rows.length > 0) {
      const user = result.rows[0];
      const isMatch = await bcrypt.compare(password, user.password);
      if (isMatch) {
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
