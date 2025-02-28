// Header.jsx

import React, { useState, useCallback } from "react";
import { Link as ScrollLink } from "react-scroll";
import { Link, useNavigate } from "react-router-dom";
import samosaLogo from "../image/samosa.png"; // Example
// (You can remove bs.png if not needed)

const Header = ({ cart }) => {
  // For toggling the mobile menu
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navigate = useNavigate();

  // Toggle the mobile menu
  const toggleMenu = useCallback(() => {
    setIsMenuOpen((prev) => !prev);
  }, []);

  // Navigate home & scroll to a section
  const handleNavigateHome = (targetSection) => {
    navigate("/");
    setTimeout(() => {
      document.getElementById(targetSection)?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  // Instead of showing a side panel, go to /order-review
  const handleCartClick = () => {
    navigate("/order-review");
  };

  // total items
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="home-container">
      {/* NAVIGATION BAR */}
      <nav className="bg-white shadow-md">
        <div className="container mx-auto flex items-center justify-between py-4 px-6">
          {/* Logo + HOME */}
          <div className="flex items-center space-x-8">
            <div
              className="flex items-center space-x-2 cursor-pointer"
              onClick={() => handleNavigateHome("home-section")}
            >
              <img src={samosaLogo} alt="Samosa Logo" className="w-10 h-10" />
              <span className="text-sm font-bold uppercase text-red-600">
                HOME
              </span>
            </div>

            {/* Desktop Navigation */}
            <ul className="hidden md:flex space-x-6 items-center">
              <ScrollLink
                to="menu-section"
                smooth={true}
                duration={500}
                className="text-sm font-semibold uppercase text-gray-800 hover:text-red-600 cursor-pointer"
                onClick={() => handleNavigateHome("menu-section")}
              >
                MENU
              </ScrollLink>
              <ScrollLink
                to="contact-section"
                smooth={true}
                duration={500}
                className="text-sm font-semibold uppercase text-gray-800 hover:text-red-600 cursor-pointer"
                onClick={() => handleNavigateHome("contact-section")}
              >
                CONTACT
              </ScrollLink>
              <Link
                to="/about"
                className="text-sm font-semibold uppercase text-gray-800 hover:text-red-600"
              >
                ABOUT
              </Link>
              <ScrollLink
                to="reviews-section"
                smooth={true}
                duration={500}
                className="text-sm font-semibold uppercase text-gray-800 hover:text-red-600 cursor-pointer"
                onClick={() => handleNavigateHome("reviews-section")}
              >
                REVIEWS
              </ScrollLink>
            </ul>
          </div>

          {/* Cart Icon (desktop) */}
          <div className="hidden md:flex">
            <div
              className="relative w-8 h-8 rounded-full bg-black border border-black flex items-center justify-center text-white text-xs font-bold cursor-pointer"
              onClick={handleCartClick}
            >
              🛒
              {totalItems > 0 && (
                <span className="bg-red-600 text-white text-[10px] rounded-full w-4 h-4 flex items-center justify-center absolute -top-1 -right-1">
                  {totalItems}
                </span>
              )}
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button onClick={toggleMenu} className="block md:hidden text-gray-800">
            ☰
          </button>
        </div>
        <div className="border-b-4 border-red-600"></div>

        {/* MOBILE NAVIGATION */}
        {isMenuOpen && (
          <ul className="md:hidden bg-white shadow-md py-4 space-y-4 px-6">
            <ScrollLink
              to="home-section"
              smooth={true}
              duration={500}
              className="text-sm font-semibold uppercase text-gray-800 hover:text-red-600 block cursor-pointer"
              onClick={() => {
                toggleMenu();
                handleNavigateHome("home-section");
              }}
            >
              HOME
            </ScrollLink>
            <ScrollLink
              to="menu-section"
              smooth={true}
              duration={500}
              className="text-sm font-semibold uppercase text-gray-800 hover:text-red-600 block cursor-pointer"
              onClick={() => {
                toggleMenu();
                handleNavigateHome("menu-section");
              }}
            >
              MENU
            </ScrollLink>
            <ScrollLink
              to="contact-section"
              smooth={true}
              duration={500}
              className="text-sm font-semibold uppercase text-gray-800 hover:text-red-600 block cursor-pointer"
              onClick={() => {
                toggleMenu();
                handleNavigateHome("contact-section");
              }}
            >
              CONTACT
            </ScrollLink>
            <Link
              to="/about"
              className="text-sm font-semibold uppercase text-gray-800 hover:text-red-600 block"
              onClick={() => toggleMenu()}
            >
              ABOUT
            </Link>
            <ScrollLink
              to="reviews-section"
              smooth={true}
              duration={500}
              className="text-sm font-semibold uppercase text-gray-800 hover:text-red-600 block cursor-pointer"
              onClick={() => {
                toggleMenu();
                handleNavigateHome("reviews-section");
              }}
            >
              REVIEWS
            </ScrollLink>

            {/* Mobile Cart Icon */}
            <div className="mt-4 flex justify-end">
              <div
                className="relative w-8 h-8 rounded-full bg-black border border-black flex items-center justify-center text-white text-xs font-bold cursor-pointer"
                onClick={() => {
                  toggleMenu();
                  handleCartClick();
                }}
              >
                🛒
                {totalItems > 0 && (
                  <span className="bg-red-600 text-white text-[10px] rounded-full w-4 h-4 flex items-center justify-center absolute -top-1 -right-1">
                    {totalItems}
                  </span>
                )}
              </div>
            </div>
          </ul>
        )}
      </nav>
    </div>
  );
};

export default Header;
