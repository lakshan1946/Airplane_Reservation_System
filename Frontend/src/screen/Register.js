import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../component/Navbar";
import axios from "axios";

function Register() {
  const [registerSuccess, setRegisterSuccess] = useState(false);
  const navigate = useNavigate();

  const [name, setName] = useState({ firstName: "", lastName: "" });
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [gender, setGender] = useState("");
  const [address, setAddress] = useState({
    country: "",
    city: "",
    line1: "",
    line2: "",
  });
  const [email, setEmail] = useState({ email: "", confirmEmail: "" });
  const [phone, setPhone] = useState("");
  const [account, setAccount] = useState({
    passportID: "",
    username: "",
    password: "",
    confirmPassword: "",
  });
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [errors, setErrors] = useState({});

  const handleInputChange = (key, value) => {
    setErrors({ ...errors, [key]: "" });
    switch (key) {
      case "name":
        setName({ ...name, ...value });
        break;
      case "address":
        setAddress({ ...address, ...value });
        break;
      case "email":
        setEmail({ ...email, ...value });
        break;
      case "account":
        setAccount({ ...account, ...value });
        break;
      case "confirmEmail":
        setEmail({ ...email, ...value });
        break;
      case "phone":
        setPhone(value);
        break;
      default:
        break;
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Reset errors
    setErrors({});

    // Check for errors
    const newErrors = {};

    // validation logic

    if (email.email !== email.confirmEmail) {
      newErrors.confirmEmail = "Email addresses do not match.";
    }

    if (account.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters long.";
    }

    if (account.password !== account.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match.";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
    } else {
      const userData = {
        firstName: name.firstName,
        lastName: name.lastName,
        dateOfBirth,
        gender,
        country: address.country,
        city: address.city,
        line1: address.line1,
        line2: address.line2,
        email: email.email,
        phone,
        passportID: account.passportID,
        username: account.username,
        password: account.password,
      };

      // Send a POST request to your backend API for user registration
      axios
        .post("/register", userData)
        .then((response) => {
          setTimeout(() => {
            setRegisterSuccess(true);
          }, 1000);
        })
        .catch((error) => {
          console.error(error);
          // Handle registration error here
        });
    }

    // If no errors, you can proceed to submit the form to your backend
    //navigateToBooking();
  };

  const navigateToLogin = () => {
    navigate("/");
  };

  var InputField = ({ label, placeholder, value, onChange, type = "text" }) => (
    <div className="col">
      <label className="nameInfo">{label}</label>
      <input
        placeholder={placeholder}
        type={type}
        className="form-control"
        required
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );

  const CheckboxField = ({ label, checked, onChange }) => (
    <div className="mb-3 form-check">
      <input
        type="checkbox"
        className="form-check-input"
        id="exampleCheck1"
        required
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
      />
      <label className="form-check-label" htmlFor="exampleCheck1">
        {label}
      </label>
    </div>
  );

  return (
    <div className="backgroundRu">
      <Navbar />
      <div className=" d-flex justify-content-center align-items-center vh-150 rounded-2">
        <section id="regAll">
          <div>
            <h1 className="HeadReg">Fill in your information</h1>

            <p className="HeadReg">
              Become a member and enjoy exclusive promotions and endless
              opportunities to earn miles both in flight and on the ground doing
              everyday things. You can use your miles for flights to nearly
              1,000 destinations worldwide, upgrades, vacations, car rentals,
              hotel stays, and more.
            </p>
          </div>

          <div className="information p-5">
            <form action="" onSubmit={handleSubmit}>
              <div className="subInfo">
                <h4 className="regHeading">Your Name</h4>
                <div className="row g-3">
                  <div className="col">
                    <label className="nameInfo">First name</label>
                    <input
                      placeholder="Enter your first name"
                      type="text"
                      className="form-control"
                      required
                      value={name.firstName}
                      onChange={(value) => {
                        handleInputChange("name", {
                          firstName: value.target.value,
                        });
                      }}
                    />
                  </div>

                  <div className="col">
                    <label className="nameInfo">Last name</label>
                    <input
                      placeholder="Enter your last name"
                      type="text"
                      className="form-control"
                      required
                      value={name.lastName}
                      onChange={(value) => {
                        handleInputChange("name", {
                          lastName: value.target.value,
                        });
                      }}
                    />
                  </div>
                </div>
                <div className="row g-3">
                  <InputField
                    label="Date of birth"
                    type="date"
                    value={dateOfBirth}
                    onChange={(value) => setDateOfBirth(value)}
                  />
                  <div className="col">
                    <label className="nameInfo">Gender</label>
                    <select
                      className="form-select"
                      id="specificSizeSelect"
                      required
                      value={gender}
                      onChange={(e) => setGender(e.target.value)}
                    >
                      <option value="">Select Your gender</option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="subInfo">
                <h4 className="regHeading">Address</h4>
                <div className="row g-3">
                  <div className="col">
                    <label className="nameInfo">Country</label>
                    <input
                      placeholder="Enter your country"
                      type="text"
                      className="form-control"
                      required
                      value={name.country}
                      onChange={(value) => {
                        handleInputChange("address", {
                          country: value.target.value,
                        });
                      }}
                    />
                  </div>

                  <div className="col">
                    <label className="nameInfo">City</label>
                    <input
                      placeholder="Enter your city"
                      type="text"
                      className="form-control"
                      required
                      value={name.city}
                      onChange={(value) => {
                        handleInputChange("address", {
                          city: value.target.value,
                        });
                      }}
                    />
                  </div>
                </div>

                <div className="row g-3">
                  <div className="col">
                    <label className="nameInfo">Address line 1</label>
                    <input
                      placeholder="Enter Address line 1"
                      type="text"
                      className="form-control"
                      required
                      value={address.line1}
                      onChange={(value) => {
                        handleInputChange("address", {
                          line1: value.target.value,
                        });
                      }}
                    />
                  </div>

                  <div className="col">
                    <label className="nameInfo">Address line 2</label>
                    <input
                      placeholder="Enter your address line 2"
                      type="text"
                      className="form-control"
                      value={address.line2}
                      onChange={(value) => {
                        handleInputChange("address", {
                          line2: value.target.value,
                        });
                      }}
                    />
                  </div>
                </div>
              </div>

              <div className="subInfo">
                <h4 className="regHeading">Email and Phone</h4>
                <div className="row g-3">
                  <div className="col">
                    <label className="nameInfo">Email</label>
                    <input
                      placeholder="Enter your email"
                      type="email"
                      className="form-control"
                      required
                      value={email.email}
                      onChange={(value) => {
                        handleInputChange("email", {
                          email: value.target.value,
                        });
                      }}
                    />
                  </div>

                  <div className="col">
                    <label className="nameInfo">Confirm Email</label>
                    <input
                      placeholder="Re-enter your email"
                      type="email"
                      className="form-control"
                      required
                      value={email.confirmEmail}
                      onChange={(value) => {
                        handleInputChange("email", {
                          confirmEmail: value.target.value,
                        });
                      }}
                    />
                    {errors.confirmEmail && (
                      <span className="text-danger">{errors.confirmEmail}</span>
                    )}
                  </div>
                </div>
                <div className="row g-3">
                  <div className="col">
                    <label className="nameInfo">Phone</label>
                    <input
                      placeholder="Enter your mobile number"
                      type="number"
                      className="form-control"
                      required
                      value={phone}
                      onChange={(value) =>
                        handleInputChange("phone", value.target.value)
                      }
                    />
                  </div>
                </div>
              </div>

              <div className="subInfo">
                <h4 className="regHeading">Your account</h4>
                <div>
                  <div className="row g-3">
                    <div className="col">
                      <label className="nameInfo">Passport ID</label>
                      <input
                        placeholder="Enter your passport ID"
                        type="text"
                        className="form-control"
                        required
                        value={account.passportID}
                        onChange={(value) => {
                          handleInputChange("account", {
                            passportID: value.target.value,
                          });
                        }}
                      />
                    </div>
                    <div className="col">
                      <label className="nameInfo">Username</label>
                      <input
                        placeholder="Enter your username"
                        type="text"
                        className="form-control"
                        required
                        value={account.username}
                        onChange={(value) => {
                          handleInputChange("account", {
                            username: value.target.value,
                          });
                        }}
                      />
                    </div>
                  </div>
                  <div className="row g-3">
                    <div className="col">
                      <label className="nameInfo">Password</label>
                      <input
                        placeholder="Enter strong password"
                        type="password"
                        className="form-control"
                        required
                        value={account.password}
                        onChange={(value) => {
                          handleInputChange("account", {
                            password: value.target.value,
                          });
                        }}
                      />
                    </div>
                    {errors.password && (
                      <span className="text-danger">{errors.password}</span>
                    )}

                    <div className="col">
                      <label className="nameInfo">Confirm Password</label>
                      <input
                        placeholder="Re-enter password"
                        type="password"
                        className="form-control"
                        required
                        value={account.confirmPassword}
                        onChange={(value) => {
                          handleInputChange("account", {
                            confirmPassword: value.target.value,
                          });
                        }}
                      />
                    </div>
                    {errors.confirmPassword && (
                      <span className="text-danger">
                        {errors.confirmPassword}
                      </span>
                    )}
                  </div>
                </div>
              </div>

              <div className="subInfo">
                <CheckboxField
                  label="I have read and accepted B airline Terms and Conditions"
                  checked={acceptTerms}
                  onChange={(value) => setAcceptTerms(value)}
                />

                <div className="col submitBtn1">
                  <button type="submit" className="btn btn-dark btn-lg ">
                    Submit
                  </button>
                </div>
                <div className="col">
                  {registerSuccess && (
                    <div className="successCont">
                      <div className="success-message">
                        <h1>Your registration was successful!</h1>
                        <h3 id="pl">Please login to continue.</h3>
                      </div>
                      <div className="submitBtn1">
                        <button
                          className="btn btn-dark btn-lg "
                          onClick={navigateToLogin}
                        >
                          Login
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </form>
          </div>
        </section>
      </div>
    </div>
  );
}

export default Register;
