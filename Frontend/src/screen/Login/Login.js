import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import LoginValidation from "./LoginValidation";
import axios from "axios";
import Navbar from "../../component/Navbar";
import Typewriter from "typewriter-effect";

const adminUSer = (username, password) => {
  // Check if the provided username and password are '123' and '456' respectively
  return username === "Lakshan" && password === "123456";
};

function Login() {
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
  const [state] = useState({
    title: "Welcome to B Airways",
    titleTwo: "Where flying is not just a journey",
    titleThree: "It's an experience that soars above the ordinary",
  });
  const handleSubmit = (event) => {
    event.preventDefault();
    //setErrors(LoginValidation(values));
    const { username, password } = values;

    // Check if the provided username and password are correct
    if (adminUSer(username, password)) {
      navigateToReport();
    } else {
      axios
        .post("/login", { values })
        .then((response) => {
          navigateToRegUserProfile(username);
        })
        .catch((error) => {
          setErrors(LoginValidation(values));
        });

      setErrors(LoginValidation(values));
    }
  };

  const navigateToRegUserProfile = (username) => {
    navigate(`/RegUserProfile/${username}`);
  };

  const navigateToReport = () => {
    navigate("/Report");
  };
  const navigateToRegister = () => {
    navigate("/Register");
  };
  const navigateToGuest = () => {
    navigate("/Guest");
  };
  return (
    <div className="background">
      <div>
        <Navbar />
      </div>
      <div className="home">
        <div className="home-intro">
          <h1>
            <div className="title">{state.title}</div>
          </h1>
          <h2>
            <div className="titleTwo">{state.titleTwo}</div>
            <div className="titleThree">{state.titleThree}</div>
          </h2>
          <div className="text">
            <Typewriter
              options={{
                autoStart: true,
                loop: true,
                delay: 40,
                strings: ["I'm lakshn", "I.m scdsf", "sdfvsfvsf"],
              }}
            />
          </div>
        </div>
      </div>
      <div className="d-flex justify-content-center align-items-center rounded-2 logincomp">
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
            <div className="Loginbtn">
              <div className="loginregbtn">
                <button
                  type="button"
                  className="btn btn-dark  "
                  onClick={navigateToRegister}
                >
                  Register
                </button>
              </div>
              <div>
                <button
                  type="button"
                  className="btn btn-outline-dark  loginguestbtn"
                  onClick={navigateToGuest}
                >
                  Visit as a guest
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
