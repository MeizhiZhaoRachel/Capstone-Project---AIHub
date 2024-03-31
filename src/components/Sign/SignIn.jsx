import React, { useState } from 'react';
import { useAuth } from './AuthContext'; // Adjust the import path as necessary
import { useHistory } from 'react-router-dom'; // If you're using react-router for navigation

function SignIn() {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const { signIn } = useAuth();
  const history = useHistory(); // For redirecting after sign-in

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await signIn(formData);
      history.push('/dashboard'); // Redirect to dashboard or another route
    } catch (error) {
      console.error('SignIn Error:', error);
      // Optionally, handle or display the error to the user
    }
  };

  return (
    <div>
      <h1>Sign In</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Sign In</button>
      </form>
    </div>
  );
  
}

export default SignIn;
