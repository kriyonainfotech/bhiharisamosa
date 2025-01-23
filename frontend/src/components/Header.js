import React, { useState } from "react";
import { Link as ScrollLink } from "react-scroll";
import { Link, useNavigate } from "react-router-dom";
import samosaLogo from "../image/samosa.png";
import bs from "../image/bs.png"; // Just an icon or product image

const Header = ({
  quantity30,
  quantity50,
  quantity90,
  setQuantity30,
  setQuantity50,
  setQuantity90,
}) => {
  // Pop-up & mobile menu
  const [showPopup, setShowPopup] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  // -------------------------------------------
  // Functions to decrement the shared states
  // -------------------------------------------
  const decrement30 = () => setQuantity30((prev) => (prev > 0 ? prev - 1 : 0));
  const decrement50 = () => setQuantity50((prev) => (prev > 0 ? prev - 1 : 0));
  const decrement90 = () => setQuantity90((prev) => (prev > 0 ? prev - 1 : 0));

  // Sum everything for cart icon
  const totalItems = quantity30 + quantity50 + quantity90;

  // Calculate total cost as per your "30, 50, 90" scheme
  const calculateTotal = () => {
    return quantity30 * 30 + quantity50 * 50 + quantity90 * 90;
  };

  // Show the popup
  const handleCartClick = () => {
    setShowPopup(true);
  };

  // Navigation back to home + scrolling
  const handleNavigateHome = (targetSection) => {
    navigate("/");
    setTimeout(() => {
      document
        .getElementById(targetSection)
        ?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  // Proceed to checkout
  const handleCheckout = () => {
    setShowPopup(false);
    navigate("/cartinformation", {
      state: {
        items: [
          { name: "₹30 / 1 Piece", quantity: quantity30, price: 30 },
          { name: "₹50 / 2 Pieces", quantity: quantity50, price: 50 },
          { name: "₹90 / 2 Plates", quantity: quantity90, price: 90 },
        ],
        total: calculateTotal(),
      },
    });
  };

  return (
    <div className="home-container">
      {/* Navigation Bar */}
      <nav className="bg-white shadow-md">
        <div className="container mx-auto flex justify-between items-center py-4 px-6">
          {/* Logo */}
          <div
            className="flex items-center space-x-2 cursor-pointer"
            onClick={() => handleNavigateHome("home-section")}
          >
            <img src={samosaLogo} alt="Samosa Logo" className="w-10 h-10" />
            <span className="text-sm font-bold uppercase text-red-600">
              Home
            </span>
          </div>

          {/* Desktop Navigation */}
          <ul className="hidden md:flex space-x-6 items-center">
            <ScrollLink
              to="home-section"
              smooth={true}
              duration={500}
              className="text-sm font-semibold text-gray-800 hover:text-red-600 cursor-pointer"
              onClick={() => handleNavigateHome("home-section")}
            >
              Home
            </ScrollLink>
            <ScrollLink
              to="menu-section"
              smooth={true}
              duration={500}
              className="text-sm font-semibold text-gray-800 hover:text-red-600 cursor-pointer"
              onClick={() => handleNavigateHome("menu-section")}
            >
              Menu
            </ScrollLink>
            <ScrollLink
              to="contact-section"
              smooth={true}
              duration={500}
              className="text-sm font-semibold text-gray-800 hover:text-red-600 cursor-pointer"
              onClick={() => handleNavigateHome("contact-section")}
            >
              Contact
            </ScrollLink>
            <ScrollLink
              to="reviews-section"
              smooth={true}
              duration={500}
              className="text-sm font-semibold text-gray-800 hover:text-red-600 cursor-pointer"
              onClick={() => handleNavigateHome("reviews-section")}
            >
              Reviews
            </ScrollLink>
            <Link
              to="/about"
              className="text-sm font-semibold text-gray-800 hover:text-red-600"
            >
              About
            </Link>
          </ul>

          {/* Cart and Phone */}
          <div className="hidden md:flex items-center space-x-6">
            <div className="text-sm font-semibold text-gray-700">
              +91 83202 39959
            </div>
            <button
              onClick={handleCartClick}
              className="relative text-sm text-gray-800 hover:text-red-600"
            >
              {/* Cart Icon or label */}
              <span className="bg-red-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center absolute top-[-8px] right-[-8px]">
                {totalItems}
              </span>
              🛒
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="block md:hidden text-gray-800"
          >
            ☰
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <ul className="md:hidden bg-white shadow-md py-4 space-y-4 px-6">
            <ScrollLink
              to="home-section"
              smooth={true}
              duration={500}
              className="text-sm font-semibold text-gray-800 hover:text-red-600 block cursor-pointer"
              onClick={() => {
                setIsMenuOpen(false);
                handleNavigateHome("home-section");
              }}
            >
              Home
            </ScrollLink>
            <ScrollLink
              to="menu-section"
              smooth={true}
              duration={500}
              className="text-sm font-semibold text-gray-800 hover:text-red-600 block cursor-pointer"
              onClick={() => {
                setIsMenuOpen(false);
                handleNavigateHome("menu-section");
              }}
            >
              Menu
            </ScrollLink>
            <ScrollLink
              to="contact-section"
              smooth={true}
              duration={500}
              className="text-sm font-semibold text-gray-800 hover:text-red-600 block cursor-pointer"
              onClick={() => {
                setIsMenuOpen(false);
                handleNavigateHome("contact-section");
              }}
            >
              Contact
            </ScrollLink>
            <ScrollLink
              to="reviews-section"
              smooth={true}
              duration={500}
              className="text-sm font-semibold text-gray-800 hover:text-red-600 block cursor-pointer"
              onClick={() => {
                setIsMenuOpen(false);
                handleNavigateHome("reviews-section");
              }}
            >
              Reviews
            </ScrollLink>
            <Link
              to="/about"
              className="text-sm font-semibold text-gray-800 hover:text-red-600 block"
              onClick={() => setIsMenuOpen(false)}
            >
              About
            </Link>
            <div className="text-sm font-semibold text-gray-700 mt-4">
              +91 83202 39959
            </div>
          </ul>
        )}

        <div className="border-b-4 border-red-600"></div>
      </nav>

      {/* Popup Section */}
      {showPopup && (
        <div className="popup-overlay fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
          <div className="popup-content bg-white rounded-lg p-6 shadow-lg w-96">
            <div className="product-card">
              <div className="product-header text-center mb-4">
                <img
                  src={bs}
                  alt="Bihari Samosa"
                  className="product-image w-20 h-20 mx-auto mb-2"
                />
                <h2 className="text-lg font-bold">Bihari Samosa</h2>
                <p className="text-sm text-gray-600">
                  A samosa is a triangular pastry with spiced fillings.
                </p>
              </div>

              {/* 
                Show your 3 quantity counters 
                for 30, 50, 90 exactly as you had them 
              */}
              <div className="product-variants space-y-2">
                {/* ₹30 / 1 Piece */}
                <div className="variant flex justify-between items-center">
                  <span>₹30 / 1 Piece</span>
                  <div className="quantity-controls flex items-center">
                    <button
                      onClick={decrement30}
                      className="bg-gray-300 text-gray-700 px-2 py-1 rounded hover:bg-gray-400"
                    >
                      -
                    </button>
                    <span className="px-4">{quantity30}</span>
                    <button
                      onClick={() => setQuantity30(quantity30 + 1)}
                      className="bg-gray-300 text-gray-700 px-2 py-1 rounded hover:bg-gray-400"
                    >
                      +
                    </button>
                  </div>
                </div>

                {/* ₹50 / 2 Pieces => or 60 if you prefer */}
                <div className="variant flex justify-between items-center">
                  <span>₹50 / 2 Pieces</span>
                  <div className="quantity-controls flex items-center">
                    <button
                      onClick={decrement50}
                      className="bg-gray-300 text-gray-700 px-2 py-1 rounded hover:bg-gray-400"
                    >
                      -
                    </button>
                    <span className="px-4">{quantity50}</span>
                    <button
                      onClick={() => setQuantity50(quantity50 + 1)}
                      className="bg-gray-300 text-gray-700 px-2 py-1 rounded hover:bg-gray-400"
                    >
                      +
                    </button>
                  </div>
                </div>

                {/* ₹90 / 2 Plates */}
                <div className="variant flex justify-between items-center">
                  <span>₹90 / 2 Plates</span>
                  <div className="quantity-controls flex items-center">
                    <button
                      onClick={decrement90}
                      className="bg-gray-300 text-gray-700 px-2 py-1 rounded hover:bg-gray-400"
                    >
                      -
                    </button>
                    <span className="px-4">{quantity90}</span>
                    <button
                      onClick={() => setQuantity90(quantity90 + 1)}
                      className="bg-gray-300 text-gray-700 px-2 py-1 rounded hover:bg-gray-400"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>

              {/* Checkout actions */}
              <div className="product-actions mt-4 space-x-2 flex justify-between">
                <button
                  onClick={handleCheckout}
                  className="checkout bg-blue-600 text-white px-4 py-1 rounded hover:bg-blue-700"
                >
                  Checkout ₹{calculateTotal()}
                </button>
                <button
                  onClick={() => setShowPopup(false)}
                  className="close-popup mt-4 text-red-600 hover:underline"
                >
                  Close
                </button>
              </div>
              <p className="free-delivery-note text-sm text-center text-gray-600 mt-2">
                *Free Home Delivery on orders above ₹299.00
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Header;
