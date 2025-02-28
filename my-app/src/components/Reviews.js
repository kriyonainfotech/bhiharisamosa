import React, { useState } from "react";
import "../style/Reviews.css";
import axios from "axios";

function Review() {
  const [formData, setFormData] = useState({
    email_address: "",
    phone_number: "",
    address: "",
    city: "",
    state: "",
    zip_code: "",
  });

  const [payment, setPayment] = useState("online"); // To handle payment method (Online or COD)
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handlePaymentChange = (e) => {
    setPayment(e.target.value); // Update selected payment method
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "https://biharisamosa.in/user", // Backend URL
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      setMessage("User details submitted successfully!");
      console.log(response.data);
    } catch (error) {
      console.error("Error submitting user details:", error.message);
      setMessage("Failed to submit user details. Please try again.");
    }
  };

  return (
    <div className="review-container">
      <div className="left-section">
        <p className="back-link">BACK TO ORDER REVIEW</p>

        <h2>My Information</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            name="email_address"
            placeholder="Email address"
            value={formData.email_address}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="phone_number"
            placeholder="Phone Number"
            value={formData.phone_number}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="address"
            placeholder="Address"
            value={formData.address}
            onChange={handleChange}
            required
          />
          <div className="row">
            <input
              type="text"
              name="city"
              placeholder="City"
              value={formData.city}
              onChange={handleChange}
              required
            />
            <input
              type="text"
              name="state"
              placeholder="State"
              value={formData.state}
              onChange={handleChange}
              required
            />
            <input
              type="text"
              name="zip_code"
              placeholder="ZIP Code"
              value={formData.zip_code}
              onChange={handleChange}
              required
            />
          </div>

          <h2>How would you like Payment for your order?</h2>
          <div className="payment-options">
            <label>
              <input
                type="radio"
                name="payment"
                value="online"
                checked={payment === "online"} // Check if this is the selected option
                onChange={handlePaymentChange} // Update the selected payment method
              />
              Online / Netbanking
            </label>
            <label>
              <input
                type="radio"
                name="payment"
                value="cod"
                checked={payment === "cod"} // Check if this is the selected option
                onChange={handlePaymentChange} // Update the selected payment method
              />
              Cash on delivery
            </label>
          </div>

          <h2>Shipping Details</h2>
          <input type="text" placeholder="Shipping address" required />
          <div className="row">
            <input type="text" placeholder="City" required />
            <input type="text" placeholder="State" required />
            <input type="text" placeholder="ZIP Code" required />
          </div>

          <button type="submit" className="confirm-button">
            Confirm & Pay
          </button>
        </form>

        {message && <p className="message">{message}</p>}
      </div>

      <div className="right-section">
        <div className="order-total-card">
          <div className="text">
            <h3>Order Total</h3>
            <div className="order-item">
              <span>Bihari Samosa</span>
              <br />
              <br />
              <span>₹60.00</span>
            </div>
            <div className="order-item">
              <span>Shipping</span>
              <span>₹40.00</span>
            </div>
            <p className="free-delivery-note">
              Add items worth ₹250.00 more to unlock free delivery.
            </p>
            <hr />
            <div className="order-total">
              <span>Total</span>
              <span>₹100.00</span>
            </div>
          </div>
          <br />
        </div>
      </div>
    </div>
  );
}

export default Review;
