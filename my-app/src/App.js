// src/App.js
import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";

// Public components
import Header from "./components/Header";
import Home from "./components/Home";
import About from "./components/About";
import CartInformation from "./components/Cartinformation";
import OrderReview from "./components/OrderReview";
import Footer from "./components/Footer";

// Admin components
import AdminDashboard from "./admin/AdminDashboard";
import AdminLogin from "./admin/AdminLogin";
import PrivateRoute from "./admin/PrivateRoute";

function AppContent() {
  const location = useLocation();
  // Hide header/footer on admin routes
  const hideHeaderFooter = location.pathname.startsWith("/admin");

  // Cart state for public pages
  const [cart, setCart] = useState([]);

  // Add item to cart: if exists, increment; else add new item with quantity = 1
  const addItemToCart = (product) => {
    setCart((prevCart) => {
      const existing = prevCart.find((p) => p.name === product.name);
      if (existing) {
        return prevCart.map((item) =>
          item.name === product.name
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...prevCart, { ...product, quantity: 1 }];
      }
    });
  };

  // Increment quantity by 1
  const incrementItem = (productName) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.name === productName
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    );
  };

  // Decrement quantity by 1 (remove item if quantity becomes 0)
  const decrementItem = (productName) => {
    setCart((prevCart) =>
      prevCart
        .map((item) =>
          item.name === productName && item.quantity > 1
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  return (
    <>
      {!hideHeaderFooter && (
        <Header
          cart={cart}
          setCart={setCart}
          incrementItem={incrementItem}
          decrementItem={decrementItem}
        />
      )}

      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home addItemToCart={addItemToCart} />} />
        <Route path="/about" element={<About />} />
        <Route
          path="/order-review"
          element={
            <OrderReview
              cart={cart}
              setCart={setCart}
              addItemToCart={addItemToCart}
              incrementItem={incrementItem}
              decrementItem={decrementItem}
            />
          }
        />
        <Route path="/cartinformation" element={<CartInformation cart={cart} />} />

        {/* Admin Route: Single URL for admin */}
        <Route
          path="/admin"
          element={
            <PrivateRoute>
              <AdminDashboard />
            </PrivateRoute>
          }
        />
        {/* Also add a separate route for login */}
        <Route path="/admin/login" element={<AdminLogin />} />
      </Routes>

      {!hideHeaderFooter && <Footer />}
    </>
  );
}

export default function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}
