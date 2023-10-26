import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import validation from "./LoginValidation";
import axios from 'axios';

function Login({ setUserIsGuess, userIsGuess }) {
  const [values, setValues] = useState({
    username: "",
    password: "",
  });

  const navigate = useNavigate();
  const [errors, setErrors] = useState({});

  const handleInput = (event) => {
    setValues((prev) => ({
      ...prev,
      [event.target.name]: [event.target.value],
    }));
  };
  const handleSubmit = (event) => {
    event.preventDefault();
  
    axios
      .post('/login', { values })
      .then((response) => {
        console.log(response)
        console.log("aefffffffffff")
        navigate("/Booking");
      })
      .catch((error) => {
        console.error('Error:', error.message);
        window.alert("Authentication failed. Check username, password.");
        // Display the error message to the user
        setErrors('An error occurred. Please try again later.');
      });
  
    setErrors(validation(values));
  };

 

  return (
    <div className="background d-flex justify-content-center align-items-center vh-100 rounded-2">
      <div className="signup p-3 rounded w-25">
        <h2>Sign-in</h2>
        <form action="" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="username" className="form-label">
              <strong>username</strong>
            </label>
            <div className="input-group flex-nowrap">
              <span class="input-group-text" id="addon-wrapping">
                <i class="fa fa-user icon"></i>
              </span>
              <input
                type="text"
                placeholder="Enter username"
                name="username"
                onChange={handleInput}
                className="form-control rounded-0"
              ></input>
            </div>
            {errors.username && (
              <span className="text-danger">{errors.username}</span>
            )}
          </div>
          <div>
            <label htmlFor="password" className="form-label">
              <strong>password</strong>
            </label>
            <div className="input-group flex-nowrap">
              <span class="input-group-text" id="addon-wrapping">
                <i class="fa fa-lock"></i>
              </span>
              <input
                type="password"
                placeholder="Enter password"
                name="password"
                onChange={handleInput}
                className="form-control rounded-0"
              ></input>
            </div>
            {errors.password && (
              <span className="text-danger">{errors.password}</span>
            )}
          </div>
          <p></p>
          <button type="submit" className="btn btn-success w-100">
            Login
          </button>
          <p></p>
          <Link
            to="/register"
            className="btn btn-default border w-100 bg-light text-decoration-none"
          >
            Create Account
          </Link>
          <p></p>
          <p className="text-center">
            <strong>OR</strong>
          </p>
          <Link
            to="/Booking"
            className="btn btn-default border w-100 bg-light text-decoration-none"
            onClick={(e) => {
              e.preventDefault();
              navigate("/Booking");
              setUserIsGuess(true);
            }}
          >
            Visit as a guest
          </Link>
        </form>
      </div>
    </div>
  );
}

export default Login;

