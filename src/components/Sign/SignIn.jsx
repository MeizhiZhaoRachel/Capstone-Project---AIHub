import React, { useState } from 'react';
import { useAuth } from './AuthContext'; 
import { useNavigate } from 'react-router-dom'; 
import '../../style/Sign/SignIn.css';

function SignIn() {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const { signIn } = useAuth();
  const navigate = useNavigate(); // For redirecting after sign-in

  const handleChange = (e) => {
    // It uses the spread operator ... to copy the existing formData object into a new object
    // then adds or updates a property in that object whose key is e.target.name and value is e.target.value.
    //  the value and name properties in the handleChange function are derived from the form elements 
    // such as <input value=? name=?>, <select>, <textarea>, or even a <button> 
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    // the form's data will not be sent automatically, and the page will not refresh.
    e.preventDefault();
    try {
      await signIn(formData);
      navigate(-1); // Redirect to dashboard or another route
    } catch (error) {
      console.error('SignIn Error:', error);
      // Handle error state as needed
    }
  };

  return (
    <div className='signin-wrapper'>
      <div className='signin-container'>
        <h1>Sign In to AIHub</h1>
        <form onSubmit={handleSubmit}>
          <div className='signin-email'>
            <label htmlFor="email" >Email:</label>
            {/* setFormData({ ...formData, [e.target.name]: e.target.value }); 
            [e.target.name] here could be "email" and e.target.value could be formData.email*/}
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className='signin-password'>
            <label htmlFor="password" >Password:</label>
            {/* setFormData({ ...formData, [e.target.name]: e.target.value }); 
            [e.target.name] here could be "password" and e.target.value could be formData.password */}
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          <div className='signin-button'>
            <button type="submit" >Sign In</button>
          </div>
        </form>
      </div>
    </div>
  );
  
}

export default SignIn;
