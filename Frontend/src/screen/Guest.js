import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Guest() {
  const navigate = useNavigate();
  const [guestEnterSuccess, setGuestEnterSuccess] = useState(false);
  const [name, setName] = useState({ firstName: "", lastName: "" });
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [gender, setGender] = useState("");
  const [address, setAddress] = useState({
    country: "",
    line: "",
  });
  const [email, setEmail] = useState({ email: "", confirmEmail: "" });
  const [phone, setPhone] = useState("");
  const [account, setAccount] = useState({
    passportID: "",
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

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
    } else {
      setTimeout(() => {
        setGuestEnterSuccess(true);
      }, 1000);
    }

    // If no errors, you can proceed to submit the form to your backend
    //navigateToBooking();
  };

  const navigateToBooking = () => {
    navigate("/Booking");
  };

  var InputField = ({ label, placeholder, value, onChange, type = "text" }) => (
    <div className="col">
      <label className="nameInfo">{label}</label>
      <input
        placeholder={placeholder}
        type={type}
        required
        className="form-control"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );

  const CheckboxField = ({ label, checked, onChange }) => (
    <div className="mb-3 form-check">
      <input
        type="checkbox"
        required
        className="form-check-input"
        id="exampleCheck1"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
      />
      <label className="form-check-label" htmlFor="exampleCheck1">
        {label}
      </label>
    </div>
  );
  return (
    <div className="background d-flex justify-content-center align-items-center vh-200 rounded-2">
      <section id="regAll">
        <div>
          <h1 className="HeadReg">Your Information</h1>
          <p className="HeadReg">
            Please fill the above information to continue.
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
                    required
                    className="form-control"
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
                    required
                    className="form-control"
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
                  required
                  value={dateOfBirth}
                  onChange={(value) => setDateOfBirth(value)}
                />

                <div className="col">
                  <label className="nameInfo">Gender</label>
                  <select
                    className="form-select"
                    id="specificSizeSelect"
                    value={gender}
                    required
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
                    required
                    className="form-control"
                    value={name.country}
                    onChange={(value) => {
                      handleInputChange("address", {
                        country: value.target.value,
                      });
                    }}
                  />
                </div>

                <div className="col">
                  <label className="nameInfo">Address</label>
                  <input
                    placeholder="Enter Address"
                    type="text"
                    required
                    className="form-control"
                    value={address.line}
                    onChange={(value) => {
                      handleInputChange("address", {
                        line: value.target.value,
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
                    required
                    className="form-control"
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
                    required
                    className="form-control"
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
                    required
                    className="form-control"
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
              <div className="row g-3">
                <div className="col">
                  <label className="nameInfo">Passport ID</label>
                  <input
                    placeholder="Enter your passport ID"
                    type="text"
                    required
                    className="form-control"
                    value={account.passportID}
                    onChange={(value) => {
                      handleInputChange("account", {
                        passportID: value.target.value,
                      });
                    }}
                  />
                </div>
              </div>
            </div>

            <div className="subInfo">
              <CheckboxField
                label="I have read and accepted B airline Terms and Conditions"
                required
                checked={acceptTerms}
                onChange={(value) => setAcceptTerms(value)}
              />

              <div className="col submitBtn1">
                <button type="submit" className="btn btn-dark btn-lg ">
                  Submit
                </button>
              </div>
              <div className="col ">
                {guestEnterSuccess && (
                  <div className="successCont">
                    <div className="success-message">
                      <h3>Thanks you</h3>
                      <h1>click to continue</h1>
                    </div>
                    <div className="submitBtn1">
                      <button
                        className="btn btn-dark btn-lg "
                        onClick={navigateToBooking}
                      >
                        click here
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
  );
}

export default Guest;
