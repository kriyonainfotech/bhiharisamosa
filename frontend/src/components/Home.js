import React, { useState } from "react";
import { Element } from "react-scroll";
import home1 from "../image/logo.png";
import home2 from "../image/zomato.png";
import home3 from "../image/swiggy.png";
import parcel from "../image/parcel.png";
import Menu from "../image/Menu.png";
import location from "../image/location.png";
import Re from "../image/Re.png";
import bs from "../image/bs.png";
import CS from "../image/CS.png";
import GM from "../image/GM.png";
import MC from "../image/MC.png";
import SS from "../image/SS.png";
import TC from "../image/TC.png";
import fc from "../image/fc.png";
import ins from "../image/ins.png";
import you from "../image/you.png";
import what from "../image/what.png";
import about from "../image/dada.png";

// Accept `addItemToCart` so "ORDER NOW" updates the shared cart
const Home = ({ addItemToCart }) => {
  // State for dynamic map location
  const [selectedLocation, setSelectedLocation] = useState("nadiad");

  // Google Maps embed URLs for each location
  const mapURLs = {
    nadiad:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3672.450667479964!2d72.872764!3d22.6911989!2m3!1f0!2f0!3f0...",
    ahmedabad:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14676.95649629706!2d72.59838749011836!3d23.0365903!2m3!1f0!2f0...",
    vadodara:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14661.208627329605!2d73.16357941462318!3d22.3081374!2m3!1f0!2f0...",
  };

  // Menu items for "Dine In + Delivery"
  const menuItems = [
    { name: "Bihari Samosa", price: 30, label: "₹30 / Per Piece", img: bs },
    { name: "Cheese Bihari Samosa", price: 60, label: "₹60 / Per Piece", img: CS },
    { name: "Swaminarayan Samosa", price: 30, label: "₹30 / Per Piece", img: SS },
    { name: "Meethi Chutney", price: 200, label: "₹200 / Per Kg", img: MC },
    { name: "Tikhi Chutney", price: 150, label: "₹150 / Per Kg", img: TC },
    { name: "Garam Masala", price: 60, label: "₹60 / Per 30gm", img: GM },
  ];

  return (
    <div className="bg-gray-50 font-sans">
      {/* ============================== HEADER SECTION ============================== */}
      <Element name="home-section">
        <header className="bg-white py-10">
          <div className="container mx-auto flex flex-col lg:flex-row items-center justify-between px-6">
            {/* Left Section */}
            <div className="flex flex-col items-center lg:items-start text-center lg:text-left">
              <div className="flex items-center space-x-4">
                <img src={about} alt="logo" className="w-24 h-24 rounded-full" />
                <div>
                  <h1 className="text-3xl font-bold text-gray-800">
                    Bihari <span className="text-red-600">Samosa</span>
                  </h1>
                  <h3 className="text-lg text-gray-600">Ghantwala Since 1972</h3>
                </div>
              </div>
              <p className="text-gray-600 mt-4 max-w-md">
                We are serving original taste and best quality samosas in Nadiad town
                and also provide home delivery services on orders of maximum quantity
                (100 pieces) to your home!
              </p>
              <button className="bg-red-600 text-white px-6 py-2 rounded mt-6 hover:bg-red-700">
                Explore Menu
              </button>
            </div>

            {/* Right Section */}
            <div className="mt-8 lg:mt-0">
              <div className="bg-red-700 p-4 rounded-lg">
                <img
                  src={home1}
                  alt="Bihari Samosa Logo"
                  className="w-[720px] h-[274px] object-contain mx-auto"
                />
              </div>
            </div>
          </div>

          {/* Availability Section (Zomato + Swiggy) */}
          <div className="mt-10 text-center">
            <p className="text-lg font-semibold text-gray-700">We are available on</p>
            <div className="flex justify-center items-center space-x-6 mt-4">
              <img src={home2} alt="Zomato" className="w-16 h-16" />
              <img src={home3} alt="Swiggy" className="w-16 h-16" />
            </div>
          </div>
        </header>
      </Element>

      {/* ============================== MENU SECTION ============================== */}
      <Element name="menu-section">
        <section className="relative bg-gray-50 py-16">
          {/* "Menu" Vertical Text */}
          <div className="absolute top-1/2 right-[-100px] transform -translate-y-1/2 -rotate-90">
            <h1 className="text-gray-200 text-[120px] font-bold tracking-wide">Menu</h1>
          </div>

          {/* Circular Badge */}
          <div className="absolute top-[15%] right-[100px] bg-red-600 text-white text-center text-sm font-semibold w-36 h-36 flex items-center justify-center rounded-full shadow-lg">
            <p className="text-center px-2 leading-snug">
              We also parcel for overseas delivery
            </p>
          </div>

          {/* Section Title */}
          <div className="text-center mb-10">
            <h2 className="text-xl font-semibold text-red-600">our special</h2>
            <h3 className="text-4xl font-bold text-gray-800">Dine In + Delivery</h3>
          </div>

          {/* Cards Grid */}
          <div className="container mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 px-6 lg:px-28">
            {menuItems.map((item, index) => (
              <div
                key={index}
                className="bg-white shadow-lg rounded-lg p-6 text-center hover:shadow-xl transition-shadow"
              >
                <img src={item.img} alt={item.name} className="w-28 h-28 mx-auto mb-4" />
                <h4 className="text-lg font-bold text-gray-800">{item.name}</h4>
                <p className="text-sm text-gray-500 mt-2">{item.label}</p>
                {/* 
                  Calls the parent-provided `addItemToCart` so the cart updates
                */}
                <button
                  onClick={() => addItemToCart(item.price)}
                  className="mt-4 bg-black text-white px-6 py-2 rounded-full hover:bg-gray-800"
                >
                  ORDER NOW
                </button>
              </div>
            ))}
          </div>
        </section>
      </Element>

      {/* ============================== SOCIAL MEDIA SECTION ============================== */}
      <Element name="social-media-section">
        <section className="bg-gray-50 py-16">
          {/* Title */}
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-800">Follow us on Social Media</h2>
            <p className="text-gray-500 mt-2">
              For the latest news, updates, and inspirational recipes, follow us to flavour up your food!
            </p>
          </div>

          {/* Social Media Grid */}
          <div className="container mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 px-6">
            {[
              { icon: fc, platform: "Facebook" },
              { icon: ins, platform: "Instagram" },
              { icon: you, platform: "YouTube" },
              { icon: what, platform: "WhatsApp" },
            ].map((item, index) => (
              <div
                key={index}
                className="relative bg-white shadow-lg rounded-lg p-6 flex items-center justify-center hover:shadow-xl transition-shadow"
              >
                {/* Samosa Image */}
                <img
                  src={bs}
                  alt="Samosa"
                  className="w-40 h-40 object-cover rounded-md"
                />

                {/* Social Media Icon */}
                <div className="absolute bottom-4 left-4 bg-white rounded-full p-2 shadow-lg">
                  <img
                    src={item.icon}
                    alt={item.platform}
                    className="w-10 h-10 object-contain"
                  />
                </div>
              </div>
            ))}
          </div>
        </section>
      </Element>

      {/* ============================== CONTACT SECTION ============================== */}
      <Element name="contact-section">
        <section className="bg-gray-50 py-16">
          {/* Title */}
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-800">Contact Us</h2>
            <p className="text-gray-500 mt-2">
              Fill this form we will get back to you as soon as possible
            </p>
          </div>

          <div className="container mx-auto flex flex-col lg:flex-row items-start justify-between gap-8 px-6">
            {/* Left Section: Locations */}
            <div className="bg-white rounded-lg shadow-md p-6 w-full lg:w-1/3">
              <ul className="space-y-6">
                {[
                  {
                    location: "Nadiad",
                    details: "Manekchowk santram mandir road, Opp. Krishna hospital",
                  },
                  {
                    location: "Ahmedabad",
                    details: "Chandkheda new C G road, Podar school",
                  },
                  {
                    location: "Vadodara",
                    details: "Karelibaug ambalal park near swaminarayan mandir",
                  },
                ].map((item, index) => (
                  <li key={index} className="flex items-start gap-4">
                    <div className="text-pink-500 text-2xl">📍</div>
                    <div>
                      <h3 className="font-bold text-gray-800 text-lg">{item.location}</h3>
                      <p className="text-gray-600 text-sm">{item.details}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            {/* Center Section: Dynamic Map */}
            <div className="bg-white rounded-lg shadow-md p-6 w-full lg:w-1/3">
              <div className="relative">
                {/* Dropdown for selecting location */}
                <select
                  className="w-full p-3 rounded-md border border-gray-300 mb-4"
                  value={selectedLocation}
                  onChange={(e) => setSelectedLocation(e.target.value)}
                >
                  <option value="nadiad">Nadiad</option>
                  <option value="ahmedabad">Ahmedabad</option>
                  <option value="vadodara">Vadodara</option>
                </select>

                {/* Google Map (switches based on selectedLocation) */}
                <div className="relative w-full h-64">
                  <iframe
                    src={mapURLs[selectedLocation]}
                    className="w-full h-full rounded-md"
                    allowFullScreen=""
                    loading="lazy"
                    title="Bihari Samosa Map"
                  ></iframe>
                </div>
              </div>
            </div>

            {/* Right Section: Form */}
            <div className="bg-red-900 text-white rounded-lg shadow-md p-6 w-full lg:w-1/3">
              <form className="space-y-4">
                <div>
                  <label className="block text-sm mb-2" htmlFor="full-name">
                    Full Name
                  </label>
                  <input
                    type="text"
                    id="full-name"
                    placeholder="Enter your name"
                    className="w-full p-3 rounded-md text-gray-900"
                  />
                </div>
                <div>
                  <label className="block text-sm mb-2" htmlFor="mobile-number">
                    Mobile Number
                  </label>
                  <input
                    type="text"
                    id="mobile-number"
                    placeholder="+91 9000000000"
                    className="w-full p-3 rounded-md text-gray-900"
                  />
                </div>
                <div>
                  <label className="block text-sm mb-2" htmlFor="message">
                    Message
                  </label>
                  <textarea
                    id="message"
                    rows="4"
                    placeholder="Type your message here..."
                    className="w-full p-3 rounded-md text-gray-900"
                  ></textarea>
                </div>
                <button
                  type="submit"
                  className="w-full bg-gray-200 text-red-900 font-semibold py-3 rounded-md hover:bg-gray-300"
                >
                  Save
                </button>
              </form>
            </div>
          </div>
        </section>
      </Element>

      {/* ============================== REVIEWS SECTION ============================== */}
      <Element name="reviews-section">
        <section className="py-10 bg-gray-100">
          <h2 className="text-center text-3xl font-bold text-gray-800 mb-4">
            Reviews
          </h2>
          <div className="flex justify-center items-center">
            <div className="bg-white shadow-lg rounded-lg p-4 max-w-lg">
              <img
                src={Re}
                alt="Review"
                className="w-16 h-16 mx-auto rounded-full"
              />
              <p className="text-gray-600 mt-4">
                "I've been using their samosa services for months, and I'm
                always impressed with the quality. Highly recommended!"
              </p>
              <p className="text-sm font-semibold text-gray-800 mt-2 text-right">
                - John Doe
              </p>
            </div>
          </div>
        </section>
      </Element>
    </div>
  );
};

export default Home;
