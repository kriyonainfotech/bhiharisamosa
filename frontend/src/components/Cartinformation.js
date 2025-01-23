import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

const CartInformation = () => {
  const location = useLocation();
  const [formData, setFormData] = useState({
    email_address: "",
    phone_number: "",
    address: "",
    city: "",
    state: "",
    zip_code: "",
    shipping_address: "",
    shipping_city: "",
    shipping_state: "",
    shipping_zip: "",
  });

  const [cartData, setCartData] = useState({
    items: [],
    shipping: 40,
    total: 0,
  });

  const [loading, setLoading] = useState(false);

  // Load cart data from the location state
  useEffect(() => {
    if (location.state) {
      const { items, total } = location.state;
      setCartData({
        items,
        shipping: 40,
        total: total + 40, // Include shipping in total
      });
    }
  }, [location.state]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const payload = {
      ...formData,
      cartData,
      payment_method: "online", // Default to online payment
    };

    console.log("Payload being sent:", payload);

    try {
      const response = await fetch(
        "https://biharisamosa.in/api/cart/cart-information",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );

      if (response.ok) {
        alert("Your order has been saved successfully!");
        resetForm();
      } else {
        const error = await response.json();
        console.error("Error Response:", error);
        alert("Failed to save your order. Check your input.");
      }
    } catch (error) {
      console.error("Error communicating with the server:", error);
      alert("There was a problem communicating with the server.");
    } finally {
      setLoading(false);
    }
  };

  const handleConfirmAndPay = async () => {
    setLoading(true);

    const payload = {
      ...formData,
      cartData,
      payment_method: "cod", // Assume Cash on Delivery for this action
    };

    console.log("Payload being sent (Confirm & Pay):", payload);

    try {
      const response = await fetch(
        "https://biharisamosa.in/api/cart/cart-information",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );

      if (response.ok) {
        alert("Order confirmed and payment details saved successfully!");
        resetForm();
      } else {
        const error = await response.json();
        console.error("Error Response (Confirm & Pay):", error);
        alert("Failed to confirm and save payment details.");
      }
    } catch (error) {
      console.error("Error communicating with the server:", error);
      alert("There was a problem communicating with the server.");
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({
      email_address: "",
      phone_number: "",
      address: "",
      city: "",
      state: "",
      zip_code: "",
      shipping_address: "",
      shipping_city: "",
      shipping_state: "",
      shipping_zip: "",
    });
  };

  return (
    <div className="bg-gray-50 min-h-screen p-8">
      <div className="container mx-auto grid lg:grid-cols-3 gap-8">
        {/* Left Section */}
        <div className="lg:col-span-2 bg-white p-6 shadow-md rounded-md">
          <a
            href="/order-review"
            className="text-sm text-red-600 hover:underline"
          >
            BACK TO ORDER REVIEW
          </a>
          <h2 className="text-xl font-semibold text-gray-800 mt-4">
            My Information
          </h2>
          <hr className="my-4" />
          <form onSubmit={handleSubmit}>
            <div className="grid gap-4">
              <input
                type="email"
                name="email_address"
                placeholder="Email address"
                value={formData.email_address}
                onChange={handleChange}
                className="w-full p-3 border rounded-md"
                required
              />
              <input
                type="text"
                name="phone_number"
                placeholder="Phone Number"
                value={formData.phone_number}
                onChange={handleChange}
                className="w-full p-3 border rounded-md"
                required
              />
              <input
                type="text"
                name="address"
                placeholder="Address"
                value={formData.address}
                onChange={handleChange}
                className="w-full p-3 border rounded-md"
                required
              />
              <div className="grid grid-cols-3 gap-4">
                <input
                  type="text"
                  name="city"
                  placeholder="City"
                  value={formData.city}
                  onChange={handleChange}
                  className="w-full p-3 border rounded-md"
                  required
                />
                <input
                  type="text"
                  name="state"
                  placeholder="State"
                  value={formData.state}
                  onChange={handleChange}
                  className="w-full p-3 border rounded-md"
                  required
                />
                <input
                  type="text"
                  name="zip_code"
                  placeholder="ZIP Code"
                  value={formData.zip_code}
                  onChange={handleChange}
                  className="w-full p-3 border rounded-md"
                  required
                />
              </div>
            </div>
            <h3 className="text-lg font-semibold text-gray-800 mt-6">
              How would you like to pay for your order?
            </h3>
            <div className="flex items-center gap-4 mt-2">
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="payment_method"
                  value="online"
                  required
                />
                Online / Netbanking
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="payment_method"
                  value="cod"
                  required
                />
                Cash on delivery
              </label>
            </div>
            <h3 className="text-lg font-semibold text-gray-800 mt-6">
              Shipping Details
            </h3>
            <hr className="my-4" />
            <div className="grid gap-4">
              <input
                type="text"
                name="shipping_address"
                placeholder="Shipping address"
                value={formData.shipping_address}
                onChange={handleChange}
                className="w-full p-3 border rounded-md"
                required
              />
              <div className="grid grid-cols-3 gap-4">
                <input
                  type="text"
                  name="shipping_city"
                  placeholder="City"
                  value={formData.shipping_city}
                  onChange={handleChange}
                  className="w-full p-3 border rounded-md"
                  required
                />
                <input
                  type="text"
                  name="shipping_state"
                  placeholder="State"
                  value={formData.shipping_state}
                  onChange={handleChange}
                  className="w-full p-3 border rounded-md"
                  required
                />
                <input
                  type="text"
                  name="shipping_zip"
                  placeholder="ZIP Code"
                  value={formData.shipping_zip}
                  onChange={handleChange}
                  className="w-full p-3 border rounded-md"
                  required
                />
              </div>
            </div>
            <button
              type="submit"
              className={`w-full bg-red-600 text-white py-3 mt-6 rounded-md hover:bg-red-700 ${
                loading ? "opacity-50 cursor-not-allowed" : ""
              }`}
              disabled={loading}
            >
              {loading ? "Submitting..." : "Submit"}
            </button>
          </form>
        </div>

        {/* Right Section */}
        <div className="bg-white p-6 shadow-md rounded-md">
          <h2 className="text-xl font-semibold text-gray-800">Order Total</h2>
          <div className="mt-6">
            {cartData.items.map((item, index) => (
              <div
                key={index}
                className="flex justify-between items-center mt-2"
              >
                <p>{item.name}</p>
                <p>
                  ₹{item.price} x {item.quantity}
                </p>
              </div>
            ))}
            <div className="flex justify-between items-center mt-2">
              <p>Shipping</p>
              <p>₹{cartData.shipping}</p>
            </div>
            <hr className="my-4" />
            <div className="flex justify-between items-center text-lg font-bold">
              <p>Total</p>
              <p>₹{cartData.total}</p>
            </div>
          </div>
          <button
            className="w-full bg-black text-white py-3 mt-6 rounded-md hover:bg-gray-800"
            onClick={handleConfirmAndPay}
            disabled={loading}
          >
            {loading ? "Processing..." : "Confirm & Pay"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartInformation;
