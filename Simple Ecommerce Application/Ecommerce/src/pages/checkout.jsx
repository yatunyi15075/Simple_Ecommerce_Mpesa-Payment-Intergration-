import React, { useState } from "react";
import axios from "axios";
import "./Checkout.css"; // Import CSS file for Checkout component

const Checkout = ({ totalAmount }) => {
  const [phoneNumber, setPhoneNumber] = useState("");

  const handleCheckout = async () => {
    try {
      // Make a request to your backend to initiate the M-pesa transaction
      const response = await axios.post("/api/mpesa/checkout", {
        amount: totalAmount,
        phoneNumber: phoneNumber,
        // Add any other required parameters here
      });

      // Assuming your backend returns a URL to redirect the user for payment
      const paymentUrl = response.data.paymentUrl;

      // Redirect the user to the M-pesa payment page
      window.location.href = paymentUrl;
    } catch (error) {
      console.error("Error initiating M-pesa checkout:", error);
      // Handle error - display error message to user
    }
  };

  return (
    <div className="checkout-container">
      <h2 className="checkout-heading">Checkout</h2>
      <div className="form-group">
        <label htmlFor="phoneNumber" className="label">Phone Number:</label>
        <input
          type="text"
          id="phoneNumber"
          className="input"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
        />
      </div>
      <button className="checkout-button" onClick={handleCheckout}>Checkout with M-pesa</button>
    </div>
  );
};

export default Checkout;
