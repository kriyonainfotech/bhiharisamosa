// src/admin/AdminDashboard.js
import React, { useState, useEffect } from "react";

const BASE_URL = "https://biharisamosa.in"; // Your backend server URL

// Map UI statuses to DB statuses
const statusMapping = {
  PENDING: "Pending",
  COMPLETED: "Completed",
  CANCELLED: "Cancelled",
};

const AdminDashboard = () => {
  // State for authentication
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  // Dashboard state variables
  const [activeTab, setActiveTab] = useState("PENDING");
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);

  // Check for token on mount or when activeTab changes
  useEffect(() => {
    const token = localStorage.getItem("adminToken");
    if (token) {
      setIsAuthenticated(true);
      fetchOrders(); // load orders if already logged in
    }
    // eslint-disable-next-line
  }, [activeTab]);

  // Dummy login handler (replace with actual authentication)
  const handleLoginSubmit = (e) => {
    e.preventDefault();
    // For example, require email "admin@example.com" and password "password"
    if (loginEmail === "admin@example.com" && loginPassword === "password") {
      localStorage.setItem("adminToken", "dummyToken");
      setIsAuthenticated(true);
      fetchOrders();
    } else {
      alert("Invalid credentials. Please try again.");
    }
  };

  // Logout for testing (remove token)
  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    setIsAuthenticated(false);
  };

  // Fetch orders from the API based on activeTab
  const fetchOrders = async () => {
    setLoading(true);
    try {
      // For product management tab, no orders are fetched
      if (activeTab === "MANAGE PRODUCT") {
        setOrders([]);
        return;
      }
      const mappedStatus = statusMapping[activeTab] || "Pending";
      console.log("Fetching orders with status:", mappedStatus);
      const response = await fetch(
        `${BASE_URL}/api/cart/all-orders?status=${mappedStatus}`
      );
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      console.log("Fetched orders:", data);
      setOrders(data);
    } catch (error) {
      console.error("Failed to fetch orders:", error);
    } finally {
      setLoading(false);
    }
  };

  // Update order status: Accept or Cancel
  const updateOrderStatus = async (orderId, newStatus) => {
    setLoading(true);
    try {
      let endpoint = "";
      if (newStatus === "COMPLETED") {
        endpoint = `${BASE_URL}/api/cart/all-orders/${orderId}/accept`;
      } else if (newStatus === "CANCELLED") {
        endpoint = `${BASE_URL}/api/cart/all-orders/${orderId}/cancel`;
      }
      const res = await fetch(endpoint, { method: "POST" });
      if (!res.ok) {
        const errorData = await res.json();
        console.error("Update error:", errorData);
      }
      await fetchOrders();
    } catch (error) {
      console.error("Error updating order:", error);
    } finally {
      setLoading(false);
    }
  };

  // Update order details (for COMPLETED orders)
  const handleUpdateOrder = async (orderId) => {
    const newCustomerName = prompt("Enter new customer name:");
    if (!newCustomerName) return;
    setLoading(true);
    try {
      const res = await fetch(`${BASE_URL}/api/cart/all-orders/${orderId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ customerName: newCustomerName }),
      });
      if (!res.ok) {
        const errorData = await res.json();
        console.error("Update error:", errorData);
      }
      await fetchOrders();
    } catch (error) {
      console.error("Error updating order:", error);
    } finally {
      setLoading(false);
    }
  };

  // Delete order (for COMPLETED or CANCELLED orders)
  const handleDeleteOrder = async (orderId) => {
    if (!window.confirm("Are you sure you want to delete this order?")) return;
    setLoading(true);
    try {
      const res = await fetch(`${BASE_URL}/api/cart/all-orders/${orderId}`, {
        method: "DELETE",
      });
      if (!res.ok) {
        const errorData = await res.json();
        console.error("Delete error:", errorData);
      }
      await fetchOrders();
    } catch (error) {
      console.error("Error deleting order:", error);
    } finally {
      setLoading(false);
    }
  };

  // If not authenticated, show the login form
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
        <div className="bg-white p-6 rounded shadow-md w-full max-w-md">
          <h2 className="text-2xl font-bold mb-4 text-center">Admin Login</h2>
          <form onSubmit={handleLoginSubmit} className="space-y-4">
            <div>
              <label
                className="block text-sm font-semibold mb-1"
                htmlFor="login-email"
              >
                Email
              </label>
              <input
                type="email"
                id="login-email"
                value={loginEmail}
                onChange={(e) => setLoginEmail(e.target.value)}
                className="w-full p-2 border rounded"
                required
              />
            </div>
            <div>
              <label
                className="block text-sm font-semibold mb-1"
                htmlFor="login-password"
              >
                Password
              </label>
              <input
                type="password"
                id="login-password"
                value={loginPassword}
                onChange={(e) => setLoginPassword(e.target.value)}
                className="w-full p-2 border rounded"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition-colors"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    );
  }

  // If authenticated, display the dashboard
  return (
    <div className="min-h-screen bg-[#f4f4f4]">
      {/* Logout Button */}
      <div className="p-4 text-right">
        <button
          onClick={handleLogout}
          className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
        >
          Logout
        </button>
      </div>
      {/* Top Navigation Bar */}
      <nav className="bg-[#f37021] px-6 py-3">
        <ul className="flex gap-8 uppercase text-sm font-semibold">
          {["PENDING", "COMPLETED", "CANCELLED", "MANAGE PRODUCT"].map(
            (tab) => (
              <li
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`cursor-pointer ${
                  activeTab === tab
                    ? "text-black border-b-2 border-black"
                    : "text-black/70 hover:text-black"
                }`}
              >
                {tab}
              </li>
            )
          )}
        </ul>
      </nav>

      <div className="p-6">
        {activeTab === "MANAGE PRODUCT" ? (
          <div className="text-center mt-12">
            <h2 className="text-xl font-bold text-gray-700 mb-4">
              Manage Products
            </h2>
            <p className="text-gray-500">
              This is a placeholder. Implement product management here.
            </p>
          </div>
        ) : loading ? (
          <p className="text-center text-gray-600">Loading orders...</p>
        ) : orders.length === 0 ? (
          <p className="text-center text-gray-600 mt-4">
            No orders found for {activeTab}.
          </p>
        ) : (
          orders.map((order) => {
            // Parse orderDetails if stored as string
            let details = [];
            if (typeof order.orderDetails === "string") {
              try {
                details = JSON.parse(order.orderDetails);
              } catch (err) {
                console.error("Error parsing orderDetails", err);
                details = [];
              }
            } else if (Array.isArray(order.orderDetails)) {
              details = order.orderDetails;
            }

            // Calculate subtotal for items and total order value
            const itemTotal = details.reduce(
              (sum, item) => sum + (item.price || 0) * (item.quantity || 1),
              0
            );
            const shipping = order.shippingCharge || 0;
            const total = itemTotal + shipping;

            return (
              <div
                key={order.id}
                className="bg-white rounded-lg shadow-md p-6 mb-6"
              >
                {/* Order Header: Customer Details */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4">
                  <div>
                    <h2 className="text-lg font-bold mb-1">
                      {order.customerName}
                    </h2>
                    <p className="text-sm text-gray-600">
                      {order.address}, {order.city}, {order.state} -{" "}
                      {order.zipCode}
                    </p>
                    <p className="text-sm text-gray-600">
                      +91 {order.phoneNumber}
                    </p>
                  </div>
                  <div className="mt-4 md:mt-0 text-right">
                    <p className="text-sm text-gray-500">BILL NUMBER</p>
                    <p className="text-lg font-bold text-[#f37021]">
                      #{order.id}
                    </p>
                  </div>
                </div>

                {/* Order Items Table */}
                <div className="border-t border-gray-200 pt-4">
                  <table className="w-full text-left text-sm">
                    <thead className="border-b border-gray-300">
                      <tr>
                        <th className="py-2">Product</th>
                        <th className="py-2">Qty</th>
                        <th className="py-2">Price</th>
                        <th className="py-2">Subtotal</th>
                      </tr>
                    </thead>
                    <tbody>
                      {details.map((item, idx) => {
                        const itemName =
                          item.productName || item.name || "Unnamed Item";
                        const itemQuantity = item.quantity || 1;
                        const itemPrice = item.price || 0;
                        const subtotal = itemPrice * itemQuantity;
                        return (
                          <tr key={idx} className="border-b border-gray-200">
                            <td className="py-2 font-medium">{itemName}</td>
                            <td className="py-2">{itemQuantity}</td>
                            <td className="py-2">₹{itemPrice.toFixed(2)}</td>
                            <td className="py-2">₹{subtotal.toFixed(2)}</td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>

                {/* Shipping & Total */}
                <div className="flex justify-between items-center mt-4">
                  <p className="text-gray-700">Shipping</p>
                  <p className="font-medium">₹{shipping.toFixed(2)}</p>
                </div>
                <hr className="my-4" />
                <div className="flex justify-between items-center mb-4">
                  <p className="text-base font-bold">Total</p>
                  <p className="text-base font-bold">₹{total.toFixed(2)}</p>
                </div>

                {/* Action Buttons */}
                {activeTab === "PENDING" && order.status === "Pending" && (
                  <div className="flex gap-4">
                    <button
                      onClick={() => updateOrderStatus(order.id, "COMPLETED")}
                      className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                    >
                      Accept Order
                    </button>
                    <button
                      onClick={() => updateOrderStatus(order.id, "CANCELLED")}
                      className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
                    >
                      Cancel Order
                    </button>
                  </div>
                )}
                {activeTab === "COMPLETED" && order.status === "Completed" && (
                  <div className="flex gap-4">
                    <button
                      onClick={() => handleUpdateOrder(order.id)}
                      className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                    >
                      Update Order
                    </button>
                    <button
                      onClick={() => handleDeleteOrder(order.id)}
                      className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
                    >
                      Delete Order
                    </button>
                  </div>
                )}
                {activeTab === "CANCELLED" && order.status === "Cancelled" && (
                  <div className="flex gap-4">
                    <button
                      onClick={() => handleDeleteOrder(order.id)}
                      className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
                    >
                      Delete Order
                    </button>
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
