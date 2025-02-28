// src/admin/CartInformation.js
import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

const CartInformation = () => {
  const location = useLocation();
  const [formData, setFormData] = useState({
    customer_name: "",
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
    shipping: 0,
    total: 0,
  });

  const [loading, setLoading] = useState(false);

  // Load cart data from location state
  useEffect(() => {
    if (location.state) {
      const { items, shipping, total } = location.state;
      setCartData({
        items: items || [],
        shipping: shipping || 0,
        total: total || 0,
      });
    }
  }, [location.state]);

  // Utility to load Razorpay script
  const loadRazorpayScript = (src) => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = src;
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  // Open Razorpay Checkout (test mode)
  const openRazorpayCheckout = async () => {
    const res = await loadRazorpayScript(
      "https://checkout.razorpay.com/v1/checkout.js"
    );
    if (!res) {
      alert("Failed to load Razorpay SDK. Are you online?");
      return;
    }

    const options = {
      key: "rzp_test_1234567890abcdef", // Replace with your actual test key
      amount: cartData.total * 100, // Amount in paise
      currency: "INR",
      name: "Demo Samosa Store",
      description: "Test Transaction",
      handler: function (response) {
        console.log("Payment ID:", response.razorpay_payment_id);
        console.log("Order ID:", response.razorpay_order_id);
        console.log("Signature:", response.razorpay_signature);
        alert(
          "Payment successful! Payment ID: " + response.razorpay_payment_id
        );
      },
      prefill: {
        name: formData.customer_name || "",
        email: formData.email_address || "",
        contact: formData.phone_number || "",
      },
      notes: {
        address: "Test Transaction from Samosa Store",
      },
      theme: {
        color: "#F37254",
      },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Transform cart items to ensure each item has productName, quantity, price
  const transformCartItems = (items) => {
    return items.map((item) => ({
      productName: item.productName || item.name || "Unnamed Item",
      quantity: item.quantity || 1,
      price: item.price || 0,
    }));
  };

  // Submit order for Online / Netbanking
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const transformedItems = transformCartItems(cartData.items);
    const payload = {
      ...formData,
      cartData: { ...cartData, items: transformedItems },
      payment_method: "online",
    };

    console.log("Payload (Online):", payload);
    try {
      const response = await fetch(
        "https://biharisamosa.in/api/cart/cart-information",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        }
      );
      if (response.ok) {
        alert("Your order has been saved successfully (Online)!");
        resetForm();
      } else {
        const error = await response.json();
        console.error("Error Response:", error);
        alert("Failed to save your order. Check your input.");
      }
    } catch (error) {
      console.error("Server communication error:", error);
      alert("There was a problem communicating with the server.");
    } finally {
      setLoading(false);
    }
  };

  // Confirm order & Pay for COD
  const handleConfirmAndPay = async () => {
    setLoading(true);

    const transformedItems = transformCartItems(cartData.items);
    const payload = {
      ...formData,
      cartData: { ...cartData, items: transformedItems },
      payment_method: "cod",
    };

    console.log("Payload (COD):", payload);
    try {
      const response = await fetch(
        "https://biharisamosa.in/api/cart/cart-information",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        }
      );
      if (response.ok) {
        await openRazorpayCheckout();
        alert("Order confirmed and payment details saved successfully (COD)!");
        resetForm();
      } else {
        const error = await response.json();
        console.error("Error Response (Confirm & Pay):", error);
        alert("Failed to confirm and save payment details.");
      }
    } catch (error) {
      console.error("Server communication error:", error);
      alert("There was a problem communicating with the server.");
    } finally {
      setLoading(false);
    }
  };

  // Reset form fields
  const resetForm = () => {
    setFormData({
      customer_name: "",
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
        {/* Left Section: Customer Information Form */}
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
                type="text"
                name="customer_name"
                placeholder="Customer Name"
                value={formData.customer_name}
                onChange={handleChange}
                className="w-full p-3 border rounded-md"
                required
              />
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

        {/* Right Section: Order Summary */}
        <div className="bg-white p-6 shadow-md rounded-md">
          <h2 className="text-xl font-semibold text-gray-800">Order Total</h2>
          <div className="mt-6">
            {cartData.items.map((item, index) => (
              <div
                key={index}
                className="flex justify-between items-center mt-2"
              >
                <p>{item.name || item.productName || "Unnamed Item"}</p>
                <p>
                  ₹{item.price} x {item.quantity || 1}
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
