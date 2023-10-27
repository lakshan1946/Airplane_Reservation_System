import React, { useState } from "react";

function Payment() {
  const [paymentSuccess, setPaymentSuccess] = useState(false);

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

    // Limit input size of CVV to 4 digits
    if (name === "cvv" && value.length > 4) {
      return;
    }

    // Limit input size of card number to 16 digits
    if (name === "cardNumber" && value.length > 19) {
      return;
    }

    // Automatically insert space after every 4 digits in card number
    if (name === "cardNumber") {
      const formattedValue = value
        .replace(/\s/g, "")
        .replace(/(\d{4})/g, "$1 ")
        .trim();
      setFormData({
        ...formData,
        [name]: formattedValue,
      });
    } else if (name === "expiry") {
      // Format expiry date to MM/YY format
      const formattedExpiry = value
        .replace(/\s/g, "") // Remove spaces
        .replace(/[^0-9]/g, "") // Remove non-numeric characters
        .slice(0, 4); // Limit input to 4 digits (MMYY)

      if (formattedExpiry.length >= 2) {
        const formattedMMYY = `${formattedExpiry.slice(
          0,
          2
        )}/${formattedExpiry.slice(2)}`;
        setFormData({
          ...formData,
          [name]: formattedMMYY,
        });
      } else {
        setFormData({
          ...formData,
          [name]: formattedExpiry,
        });
      }
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let formErrors = {};

    // Validation logic

    if (!formData.name.trim()) {
      formErrors.name = "Name on card is required";
    }
    const cardNumberWithoutSpaces = formData.cardNumber.replace(/\s/g, ""); // Remove spaces
    if (!/^\d{16}$/.test(cardNumberWithoutSpaces)) {
      formErrors.cardNumber = "Invalid card number (16 digits required)";
    }

    if (!/^\d{3,4}$/.test(formData.cvv.trim())) {
      formErrors.cvv = "Invalid CVV (3 or 4 digits required)";
    }
    if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(formData.expiry.trim())) {
      formErrors.expiry = "Invalid expiry date (MM/YY format required)";
    }
    // If there are errors, set the state with error messages
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
    } else {
      // Simulate payment processing (replace this with your actual payment processing logic)
      setTimeout(() => {
        // Display payment success message
        setPaymentSuccess(true);

        // Reset form data and errors after successful payment
        setFormData({
          name: "",
          cardNumber: "",
          expiry: "",
          cvv: "",
        });
        setErrors({
          name: "",
          cardNumber: "",
          expiry: "",
          cvv: "",
        });
      }, 1000); // Simulating a delay of 1 second for payment processing (remove this line in real implementation)
    }
  };

  return (
    <div className="container background" id="scon">
      <div className="paymentText">
        <h2>Confirm Booking and pay</h2>
        <span>
          Congratulations! Your flight booking is confirmed. Please proceed to
          make the payment to enjoy all the features and benefits of your
          booking.
        </span>
      </div>

      <div class="container ">
        <div className="row">
          <div className="col-md-4">
            <div className="card card-blue p-3 text-black mb-3">
              <div className="card-header">
                <h3>Your flight details</h3>
              </div>
              <div className="card-body">
                <dl className="row">
                  <dt className="col-sm-6">Flight ID</dt>
                  <dd className="col-sm-5">1</dd>
                  <dt className="col-sm-6">Origin</dt>
                  <dd className="col-sm-5">CGK</dd>
                  <dt className="col-sm-6">Destination</dt>
                  <dd className="col-sm-5">BIA</dd>
                  <dt className="col-sm-6">Departure date and time</dt>
                  <dd className="col-sm-5">2023-10-15 08:00:00</dd>
                  <dt className="col-sm-6">Arrival date and time</dt>
                  <dd className="col-sm-5">2023-10-18 09:00:00</dd>
                </dl>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card card-blue p-3 text-black mb-3">
              <div className="card-header">
                <h3>Passenger Information</h3>
              </div>
              <div className="card-body">
                <dl className="row">
                  <dt className="col-sm-6">Name</dt>
                  <dd className="col-sm-5">kamal</dd>
                  <dt className="col-sm-6">No of passengers</dt>
                  <dd className="col-sm-5">3</dd>
                  <dt className="col-sm-6">Destination</dt>
                  <dd className="col-sm-5">BIA</dd>
                  <dt className="col-sm-6">Departure date and time</dt>
                  <dd className="col-sm-5">2023-10-15 08:00:00</dd>
                  <dt className="col-sm-6">Arrival date and time</dt>
                  <dd className="col-sm-5">2023-10-18 09:00:00</dd>
                </dl>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card card-blue p-3 text-black mb-3">
              <div className="card-header">
                <h3>Payment details</h3>
              </div>
              <div className="card-body">
                <dl className="row">
                  <dt className="col-sm-6">Total prize</dt>
                  <dd className="col-sm-5">kamal</dd>
                  <dt className="col-sm-6">Discount</dt>
                  <dd className="col-sm-5">456752</dd>
                  <dt className="col-sm-6">No of passengers</dt>
                  <dd className="col-sm-5">3</dd>
                  <dt className="col-sm-6">Membership status</dt>
                  <dd className="col-sm-5">Gold</dd>
                  <dt className="col-sm-6">Departure date and time</dt>
                  <dd className="col-sm-5">2023-10-15 08:00:00</dd>
                  <p></p>
                </dl>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div
            className="col-md-8"
            style={{ display: "flex", width: "100%", justifyContent: "center" }}
          >
            <div className="card p-3">
              <h6 className="text-uppercase">Payment details</h6>
              <form onSubmit={handleSubmit}>
                <div className="inputbox mt-3">
                  <input
                    type="text"
                    name="name"
                    placeholder="Name on card"
                    className="form-control"
                    value={formData.name}
                    onChange={handleInputChange}
                  />

                  <div className="text-danger">{errors.name}</div>
                </div>

                <div className="row">
                  <div className="col-md-6">
                    <div className="inputbox mt-3 mr-2">
                      <input
                        type="text"
                        name="cardNumber"
                        placeholder="Card number"
                        className="form-control"
                        value={formData.cardNumber}
                        onChange={handleInputChange}
                      />

                      <div className="text-danger">{errors.cardNumber}</div>
                    </div>
                  </div>

                  <div className="col-md-6">
                    <div className="d-flex flex-row">
                      <div className="inputbox mt-3 mr-2">
                        <input
                          type="text"
                          name="expiry"
                          placeholder="MM/YY"
                          className="form-control"
                          value={formData.expiry}
                          onChange={handleInputChange}
                        />

                        <div className="text-danger">{errors.expiry}</div>
                      </div>

                      <div className="inputbox mt-3 mr-2">
                        <input
                          type="number"
                          id="cvv"
                          name="cvv"
                          placeholder="CVV"
                          className="form-control"
                          value={formData.cvv}
                          onChange={handleInputChange}
                        />

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
          </div>
          <div className="col">
            {paymentSuccess && (
              <div className="success-message">
                Payment Successful! Thank you for your purchase.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Payment;
