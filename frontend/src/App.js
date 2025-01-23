import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Home from "./components/Home";
import About from "./components/About";
import CartInformation from "./components/Cartinformation";
import Footer from "./components/Footer";

const App = () => {
  // -- A) Define the cart states here so both Home & Header can use them
  const [quantity30, setQuantity30] = useState(0);
  const [quantity50, setQuantity50] = useState(0);
  const [quantity90, setQuantity90] = useState(0);

  // -- B) Provide a function so Home can add items to the same cart
  const addItemToCart = (price) => {
    // Adjust this logic if needed for your pricing
    if (price === 30) {
      setQuantity30((q) => q + 1);
    } else if (price === 50 || price === 60) {
      setQuantity50((q) => q + 1);
    } else {
      // Any other price (e.g. 150, 200) increments quantity90
      setQuantity90((q) => q + 1);
    }
  };

  return (
    <div>
      <Router>
        {/* -- C) Pass cart states & their setters to Header.js */}
        <Header
          quantity30={quantity30}
          setQuantity30={setQuantity30}
          quantity50={quantity50}
          setQuantity50={setQuantity50}
          quantity90={quantity90}
          setQuantity90={setQuantity90}
        />

        <Routes>
          {/* -- D) Pass addItemToCart to Home.js so "ORDER NOW" calls it */}
          <Route path="/" element={<Home addItemToCart={addItemToCart} />} />
          <Route path="/about" element={<About />} />
          <Route path="/cartinformation" element={<CartInformation />} />
        </Routes>

        <Footer />
      </Router>
    </div>
  );
};

export default App;
