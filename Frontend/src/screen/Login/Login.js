import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import LoginValidation from "./LoginValidation";

const authenticateUser = (username, password) => {
  // Check if the provided username and password are '123' and '456' respectively
  return username === "123" && password === "456";
};
const adminUSer = (username, password) => {
  // Check if the provided username and password are '123' and '456' respectively
  return username === "Lakshan" && password === "123456";
};

function Login({ setUserIsGuess, userIsGuess }) {
  const [values, setValues] = useState({
    username: "",
    password: "",
  });

  const [errors, setErrors] = useState({});

  const navigate = useNavigate();
  const handleInput = (event) => {
    setValues((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    //setErrors(LoginValidation(values));
    const { username, password } = values;

    // Check if the provided username and password are correct
    if (authenticateUser(username, password)) {
      // If correct, navigate to the Booking page
      navigateToBooking();
    } else if (adminUSer(username, password)) {
      navigateToReport();
    } else {
      // If incorrect, set an error message
      setErrors(LoginValidation(values));
      //setErrors({ invalidCredentials: "Invalid username or password" });
    }
  };

  const navigateToBooking = () => {
    navigate("/Booking");
  };

  const navigateToReport = () => {
    navigate("/Report");
  };
  return (
    <div className="background d-flex justify-content-center align-items-center vh-100 rounded-2">
      <div className="signup p-3 rounded w-25">
        <h2>Sign-in</h2>
        <form action="post" onSubmit={handleSubmit}>
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
