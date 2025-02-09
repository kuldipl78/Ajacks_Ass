import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import "./index.css";

function AddUser() {
  const navigate = useNavigate();
  const [user, setUser] = useState({ First_Name: "", Last_Name: "", Email: "", Department: "" }); // Consistent names

  const handleSubmit = (event) => {
    event.preventDefault();

    fetch("http://localhost:2000/addUser", { // Make sure the path is EXACTLY correct
      method: "POST",
      headers: {
        "Content-Type": "application/json" // Correct header
      },
      body: JSON.stringify(user)
    })
      .then(res => {
        if (!res.ok) { // Check for HTTP errors (like 404, 500, etc.)
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        return res.json(); // Only parse as JSON if the response is OK
      })
      .then(data => {
        console.log("Response:", data);
        navigate("/"); // Now navigate should work
      })
      .catch(err => {
        console.error("Error:", err);
      });
  };

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };
  return (
    <div className='main-container'>
        <h1>Add New User</h1>
        <div className="form-container">
            <form onSubmit={handleSubmit}>
                <input className="input-element" type="text" name="First_Name" placeholder="First Name" required onChange={handleChange} />
                <input className="input-element" type="text" name="Last_Name" placeholder="Last Name" required onChange={handleChange} />
                <input className="input-element"type="email" name="Email" placeholder="Enter Email" required onChange={handleChange} />
                <input className="input-element" type="text" name="Department" placeholder="Department" required onChange={handleChange} />
                <button className="onsubmit" >Submit</button>
            </form>
       </div>
    </div>
  );
}

export default AddUser;
