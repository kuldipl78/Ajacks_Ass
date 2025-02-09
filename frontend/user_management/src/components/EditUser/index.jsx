import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./index.css"

function EditUser() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [user, setUser] = useState({ First_Name : "", Last_Name: "", Email : "", Department: "" });

    // Fetch user data when component mounts
    useEffect(() => {
        fetch(`http://localhost:2000/getuser/${id}`)
            .then((res) => res.json())
            .then((data) => {
                if (data) {
                    setUser(data);
                } else {
                    console.log("User Not Found");
                }
            })
            .catch((err) => console.log("Error:", err));
    }, [id]);


    const handleSubmit = (e) => {
        e.preventDefault();
        fetch(`http://localhost:2000/edituser/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(user),
        })
        .then((res) => res.json())
        .then((data) => {
            console.log(data);
        })
        .catch((err) => console.log("Error:", err));
        navigate("/")
    };
    

    const handleChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });
    };

    return (
        <div className="main-container">
            <h1 className="maim-heading">Edit User</h1>
            <form className="form-container" onSubmit={handleSubmit}>
                <input className="input-element" type="text" name="First_Name" value={(user.First_Name)} onChange={handleChange} />
                <input className="input-element" type="text" name="Last_Name"  value={(user.Last_Name)} onChange={handleChange} />
                <input className="input-element"type="email" name="Email"  value={(user.Email)} onChange={handleChange} />
                <input className="input-element" type="text" name="Department"  value={(user.Department)} onChange={handleChange} />
                <button  className="onsubmit" type="submit">Update</button>
            </form>
        </div>
    );
}

export default EditUser;
