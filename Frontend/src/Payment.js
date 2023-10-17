import React, { useState } from "react";

function Payment() {
  const [formData, setFormData] = useState({
    name: "",
    cardNumber: "",
    expiry: "",
    cvv: "",
  });
  const [errors, setErrors] = useState({
    name: "",
    cardNumber: "",
    expiry: "",
    cvv: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let formErrors = {};

    // Validation logic
    if (!formData.name.trim()) {
      formErrors.name = "Name on card is required";
    }
    if (!formData.cardNumber.trim()) {
      formErrors.cardNumber = "Card number is required";
    }
    if (!formData.expiry.trim()) {
      formErrors.expiry = "Expiry date is required";
    }
    if (!formData.cvv.trim()) {
      formErrors.cvv = "CVV is required";
    }

    // If there are errors, set the state with error messages
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
    } else {
      // If no errors, proceed with payment processing logic
      // For example, you can make an API call to process the payment
      // Replace YOUR_API_ENDPOINT with the actual endpoint for payment processing
      fetch("YOUR_API_ENDPOINT", {
        method: "POST",
        body: JSON.stringify(formData),
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((response) => response.json())
        .then((data) => {
          // Handle the response from the payment processing API
          console.log("Payment successful!", data);
        })
        .catch((error) => {
          console.error("Error occurred while processing payment:", error);
        });
    }
  };

  return (
    <div className="container mt-5 px-5">
      <div className="mb-4">
        <h2>Confirm order and pay</h2>
        <span>
          Please make the payment, after that you can enjoy all the features and
          benefits.
        </span>
      </div>

      <div className="row">
        <div className="col-md-8">
          <div className="card p-3">
            <h6 className="text-uppercase">Payment details</h6>
            <form onSubmit={handleSubmit}>
              <div className="inputbox mt-3">
                <input
                  type="text"
                  name="name"
                  className="form-control"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                />
                <span>Name on card</span>
                <div className="text-danger">{errors.name}</div>
              </div>

              <div className="row">
                <div className="col-md-6">
                  <div className="inputbox mt-3 mr-2">
                    <input
                      type="text"
                      name="cardNumber"
                      className="form-control"
                      value={formData.cardNumber}
                      onChange={handleInputChange}
                      required
                    />
                    <span>Card Number</span>
                    <div className="text-danger">{errors.cardNumber}</div>
                  </div>
                </div>

                <div className="col-md-6">
                  <div className="d-flex flex-row">
                    <div className="inputbox mt-3 mr-2">
                      <input
                        type="text"
                        name="expiry"
                        className="form-control"
                        value={formData.expiry}
                        onChange={handleInputChange}
                        required
                      />
                      <span>Expiry</span>
                      <div className="text-danger">{errors.expiry}</div>
                    </div>

                    <div className="inputbox mt-3 mr-2">
                      <input
                        type="text"
                        name="cvv"
                        className="form-control"
                        value={formData.cvv}
                        onChange={handleInputChange}
                        required
                      />
                      <span>CVV</span>
                      <div className="text-danger">{errors.cvv}</div>
                    </div>
                  </div>
                </div>
              </div>

              <button className="btn btn-success px-3" type="submit">
                Pay now
              </button>
            </form>
          </div>

          <div className="mt-4 mb-4 d-flex justify-content-between">
            <span>
              <button>Previous step</button>
            </span>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card card-blue p-3 text-white mb-3">
            <span>You have to pay</span>
            <div className="d-flex flex-row align-items-end mb-3">
              <h1 className="mb-0 yellow">$549</h1>
              <span>.99</span>
            </div>

            <span>
              Enjoy all the features and perks after you complete the payment
            </span>
            <a href="#" className="yellow decoration">
              Know all the features
            </a>

            <div className="hightlight">
              <span>
                100% Guaranteed support and update for the next 5 years.
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Payment;
