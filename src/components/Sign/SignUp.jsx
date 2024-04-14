import React, { useState } from "react";
import { useAuth } from "./AuthContext";
import { useNavigate } from "react-router-dom";

function SignUp() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    firstName: "",
    lastName: "",
    gender: "",
    vocation: "",
    otherVocation: "",
  });

  const { signUp} = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    // "..." creates a new object with the same key-value pairs as formData
    // This part dynamically updates the key in the new object that corresponds to the changed input field with its new value.
    // For example, if the email field is updated, this effectively becomes { email: 'new email value' }.
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await signUp(formData);
      navigate(-1);
    } catch (error) {
      console.error("SignUp Error:", error);
    }
  };

  return (
    <div>
      
      <h1>Sign Up</h1>
      <form onSubmit={handleSubmit}>
        {/* Personal information inputs */}
        <div>
          <label htmlFor="firstName">First Name:</label>
          {/* [e.target.name]: e.target.value 
          [e.target.name] here could be frist name and e.target.value could be formData.firstname
          */}
          <input
            type="text"
            id="firstName"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="lastName">Last Name:</label>
          {/* [e.target.name]: e.target.value 
          [e.target.name] here could be last name and e.target.value could be formData.lastname
          */}
          <input
            type="text"
            id="lastName"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="email">Email:</label>
          {/* [e.target.name]: e.target.value 
          [e.target.name] here could be email and e.target.value could be formData.email
          */}
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
          {/* [e.target.name]: e.target.value 
          [e.target.name] here could be password and e.target.value could be formData.password
          */}
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>

        {/* Gender input */}
        <div>
          <label htmlFor="gender">Gender:</label>
          {/* [e.target.name]: e.target.value 
          [e.target.name] here could gender and e.target.value could be formData.gender
          */}
          <select
            id="gender"
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            required
          >
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="nonbinary">Non-binary</option>
            <option value="other">Other</option>
          </select>
        </div>

        {/* Vocation input */}
        <div>
          <label htmlFor="vocation">Vocation:</label>
          {/* [e.target.name]: e.target.value 
          [e.target.name] here could vocation and e.target.value could be formData.vocation
          */}
          <select
            id="vocation"
            name="vocation"
            value={formData.vocation}
            onChange={handleChange}
            required
          >
            <option value="">Select Vocation</option>
            <option value="teacher">Teacher</option>
            <option value="softwareDeveloper">Software Developer</option>
            <option value="doctor">Doctor</option>
            <option value="nurse">Nurse</option>
            <option value="engineer">Engineer</option>
            <option value="scientist">Scientist</option>
            <option value="artist">Artist</option>
            <option value="musician">Musician</option>
            <option value="writer">Writer</option>
            <option value="chef">Chef</option>
            <option value="lawyer">Lawyer</option>
            <option value="accountant">Accountant</option>
            <option value="businessOwner">Business Owner</option>
            <option value="salesPerson">Sales Person</option>
            <option value="marketingSpecialist">Marketing Specialist</option>
            <option value="humanResources">Human Resources</option>
            <option value="consultant">Consultant</option>
            <option value="dentist">Dentist</option>
            <option value="pharmacist">Pharmacist</option>
            <option value="veterinarian">Veterinarian</option>
            <option value="teacherAssistant">Teacher Assistant</option>
            <option value="other">Other</option>
          </select>
        </div>
        {formData.vocation === "other" && (
          <div>
            <label htmlFor="otherVocation">If Other, please specify:</label>
            <input
              id="otherVocation"
              type="text"
              name="otherVocation"
              value={formData.otherVocation}
              onChange={handleChange}
            />
          </div>
        )}

        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
}
export default SignUp;
