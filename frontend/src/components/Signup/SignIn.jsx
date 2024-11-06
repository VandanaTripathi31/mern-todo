import React, { useState } from "react";
import "./Signup.css";
import HeadingComp from "./HeadingComp";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const SignIn = () => {
  const navigate = useNavigate();
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputs({ ...inputs, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:1000/api/v1/signin", inputs);

      if (response.status === 200 && response.data && response.data.others) {
        const userId = response.data.others._id;
        sessionStorage.setItem("userId", userId);
        navigate("/todo"); // Redirect to the todo page after successful login
      } else {
        alert(response.data.message || "Login failed. Please check your credentials.");
      }
    } catch (error) {
      if (error.response) {
        alert(error.response.data.message || "An error occurred. Please try again.");
      } else {
        alert("Unable to connect to the server. Please try again later.");
      }
    }
  };

  return (
    <div className="signup">
      <div className="container">
        <div className="row">
          <div className="col-lg-4 column col-left d-flex justify-content-center align-items-center">
            <HeadingComp first="Sign" second="In" />
          </div>
          <div className="col-lg-8 column d-flex justify-content-center align-items-center">
            <div className="d-flex flex-column w-100 p-5">
              <input
                className="p-2 my-3 input-signup"
                type="email"
                name="email"
                placeholder="Enter Your Email"
                onChange={handleChange}
                value={inputs.email}
              />
              <input
                className="p-2 my-3 input-signup"
                type="password"
                name="password"
                placeholder="Enter Your Password"
                onChange={handleChange}
                value={inputs.password}
              />
              <button className="btn-signup p-2" onClick={handleSubmit}>
                Sign In
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
