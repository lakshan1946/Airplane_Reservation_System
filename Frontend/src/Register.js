import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Register = (props) => {
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
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [account, setAccount] = useState({
    passportID: "",
    username: "",
    password: "",
    confirmPassword: "",
  });
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [errors, setErrors] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();

    // Reset errors
    setErrors({});

    // Check for errors
    const newErrors = {};

    if (!name.firstName || !name.lastName) {
      newErrors.name = "Please provide both first and last names.";
    }

    if (!dateOfBirth) {
      newErrors.dateOfBirth = "Please provide your date of birth.";
    }

    if (!gender) {
      newErrors.gender = "Please select your gender.";
    }

    if (!address.country || !address.city) {
      newErrors.address = "Please provide both country and city.";
    }

    if (!email.email || !email.confirmEmail) {
      newErrors.email = "Please provide both email and confirm email.";
    } else if (email.email !== email.confirmEmail) {
      newErrors.email = "Email and confirm email must match.";
    }

    if (!phone) {
      newErrors.phone = "Please provide your phone number.";
    }

    if (!account.passportID) {
      newErrors.passportID = "Please provide your passport ID.";
    }

    if (!account.username) {
      newErrors.username = "Please provide a username.";
    }

    if (!account.password || !account.confirmPassword) {
      newErrors.password = "Please provide both password and confirm password.";
    } else if (account.password !== account.confirmPassword) {
      newErrors.password = "Password and confirm password must match.";
    }

    if (!acceptTerms) {
      newErrors.acceptTerms = "You must accept the terms and conditions.";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // If no errors, you can proceed to submit the form to your backend
  };

  const navigateToBooking = () => {
    // 👇️ navigate to /contacts
    navigate("/Booking");
  };

  return (
    <section id="regAll">
      <div>
        <h1>Your Information</h1>
        {props.isGuess ? (
          <p>Please fill the above information for continue</p>
        ) : (
          <p>
            Become a member and enjoy exclusive promotions and endless
            opportunities to earn miles both in flight and on the ground doing
            everyday things. You can use your miles for flights to nearly 1,000
            destinations worldwide, upgrades, vacations, car rentals, hotel
            stays and more.
          </p>
        )}
      </div>

      <div className="information">
        <form action="" onSubmit={handleSubmit}>
          <div className="subInfo">
            <h3>Your Name</h3>
            <div className="row g-3">
              <div className="col">
                <label className="nameInfo">First name</label>
                <input
                  type="text"
                  className="form-control"
                  name="fname"
                  value={name.firstName}
                  onChange={(e) =>
                    setName({ ...name, firstName: e.target.value })
                  }
                />
              </div>
              <div className="col">
                <label className="nameInfo">Last name</label>
                <input
                  type="text"
                  className="form-control"
                  name="lname"
                  value={name.lastName}
                  onChange={(e) =>
                    setName({ ...name, lastName: e.target.value })
                  }
                />
              </div>
            </div>
            <div className="row g-3">
              <div className="col">
                <label className="nameInfo">Date of birth</label>
                <input
                  type="date"
                  className="form-control"
                  required
                  name="Date"
                  value={dateOfBirth}
                  onChange={(e) => setDateOfBirth(e.target.value)}
                />
              </div>
              <div className="col">
                <label className="nameInfo">Gender</label>
                <label className="visually-hidden" htmlFor="specificSizeSelect">
                  Preference
                </label>
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
            <h3>Address</h3>
            <div className="row g-3">
              <div className="col">
                <label className="nameInfo">Country</label>
                <input
                  type="text"
                  className="form-control"
                  required
                  name="country"
                  value={address.country}
                  onChange={(e) =>
                    setAddress({ ...address, country: e.target.value })
                  }
                />
              </div>
              {props.isGuess ? null : (
                <div className="col">
                  <label className="nameInfo">City</label>
                  <input
                    type="text"
                    className="form-control"
                    required
                    name="city"
                    value={address.city}
                    onChange={(e) =>
                      setAddress({ ...address, city: e.target.value })
                    }
                  />
                </div>
              )}
            </div>

            <div className="row g-3">
              <div className="col">
                {props.isGuess ? (
                  <label className="nameInfo">address</label>
                ) : (
                  <label className="nameInfo">address line 1</label>
                )}

                <input
                  type="text"
                  className="form-control"
                  required
                  value={address.line1}
                  onChange={(e) =>
                    setAddress({ ...address, line1: e.target.value })
                  }
                />
              </div>
              {props.isGuess ? null : (
                <div className="col">
                  <label className="nameInfo">address line 2</label>
                  <input
                    type="text"
                    className="form-control"
                    value={address.line2}
                    onChange={(e) =>
                      setAddress({ ...address, line2: e.target.value })
                    }
                  />
                </div>
              )}
            </div>
          </div>

          <div className="subInfo">
            <h3>Email and Phone</h3>
            <div className="row g-3">
              <div className="col">
                <label className="nameInfo">Email</label>
                <input
                  type="email"
                  className="form-control"
                  required
                  value={email.email}
                  onChange={(e) =>
                    setEmail({ ...email, email: e.target.value })
                  }
                />
              </div>
              <div className="col">
                <label className="nameInfo">Confirm Email</label>
                <input
                  type="email"
                  className="form-control"
                  required
                  value={email.email}
                  onChange={(e) =>
                    setEmail({ ...email, email: e.target.value })
                  }
                />
              </div>
            </div>
            <div className="row g-3">
              <div className="col-6">
                <label className="nameInfo">Phone</label>
                <input
                  type="number"
                  className="form-control"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </div>
            </div>
          </div>

          <div className="subInfo">
            <h3>Your account</h3>
            {props.isGuess ? (
              <div className="row g-3">
                <div className="col-6">
                  <label className="nameInfo">Username</label>
                  <input
                    type="text"
                    className="form-control"
                    required
                    value={account.username}
                    onChange={(e) =>
                      setAccount({ ...account, username: e.target.value })
                    }
                  />
                </div>
              </div>
            ) : (
              <div>
                <div className="row g-3">
                  <div className="col">
                    <label className="nameInfo">Passport ID</label>
                    <input
                      type="text"
                      className="form-control"
                      required
                      value={account.passportID}
                      onChange={(e) =>
                        setAccount({ ...account, passportID: e.target.value })
                      }
                    />
                  </div>
                  <div className="col">
                    <label className="nameInfo">Username</label>
                    <input
                      type="text"
                      className="form-control"
                      required
                      value={account.username}
                      onChange={(e) =>
                        setAccount({ ...account, username: e.target.value })
                      }
                    />
                  </div>
                </div>
                <div className="row g-3">
                  <div className="col">
                    <label className="nameInfo">Password</label>
                    <input
                      type="password"
                      className="form-control"
                      required
                      value={account.password}
                      onChange={(e) =>
                        setAccount({ ...account, password: e.target.value })
                      }
                    />
                    {errors.password && (
                      <span className="text-danger">{errors.password}</span>
                    )}
                  </div>
                  <div className="col">
                    <label className="nameInfo">Confirm Password</label>
                    <input
                      type="password"
                      className="form-control"
                      required
                      value={account.confirmPassword}
                      onChange={(e) =>
                        setAccount({
                          ...account,
                          confirmPassword: e.target.value,
                        })
                      }
                    />
                    {errors.password && (
                      <span className="text-danger">{errors.password}</span>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="subInfo">
            <div className="row g-3">
              <div className="mb-3 form-check">
                <input
                  type="checkbox"
                  className="form-check-input"
                  id="exampleCheck1"
                  required
                  checked={acceptTerms}
                  onChange={(e) => setAcceptTerms(e.target.checked)}
                />
                <label className="form-check-label" htmlFor="exampleCheck1">
                  I have read and accepted B airline Terms and Conditions
                </label>
              </div>
              <div className="col">
                <button
                  onClick={navigateToBooking}
                  type="submit"
                  className="btn btn-dark btn-lg submitBtn"
                >
                  Submit
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </section>
  );
};

export default Register;
