import React, { useState } from 'react';
import { useAuth } from './AuthContext'; // Adjust the import path as necessary
import { useHistory } from 'react-router-dom'; // If using react-router

function SignUp() {
  const [formData, setFormData] = useState({
    // Adjust according to your form fields
    email: '', password: '', firstName: '', lastName: '',
  });
  const { signUp } = useAuth();
  const history = useHistory(); // For navigation after sign-up

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await signUp(formData);
      history.push('/signin'); // Redirect to sign-in or another route as needed
    } catch (error) {
      console.error('SignUp Error:', error);
      // Optionally, handle or display the error to the user
    }
  };

  return (
    <div>
      <h1>Sign Up</h1>
      <form onSubmit={handleSubmit}>
        {/* Form fields for firstName, lastName, email, password */}
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
}

export default SignUp;
