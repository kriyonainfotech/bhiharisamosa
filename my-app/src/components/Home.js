// src/Home.jsx
import React, { useState, useEffect } from "react";
import { Element, Link } from "react-scroll";

// Image imports (replace with your actual image paths)
import home1 from "../image/logo.png";   // Right banner image
import home2 from "../image/zomato.png";   // Zomato logo for social link
import home3 from "../image/swiggy.png";    // Swiggy logo for social link
import about from "../image/dada.png";      // About/Founder image
import bs from "../image/bs.png";           // Used for decorative image in social section
import CS from "../image/CS.png";
import SS from "../image/SS.png";
import MC from "../image/MC.png";
import TC from "../image/TC.png";
import GM from "../image/GM.png";
import Re from "../image/Re.png";
// Social icons
import fc from "../image/fc.png";    // JustDial logo image (replace with your JustDial logo)
import you from "../image/you.png";  // YouTube icon
import what from "../image/what.png"; // WhatsApp icon

const Home = ({ addItemToCart }) => {
  // Selected product for detail view (modal)
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    if (selectedProduct) {
      setQuantity(1);
    }
  }, [selectedProduct]);

  // Map location state for the map iframe
  const [selectedLocation, setSelectedLocation] = useState("nadiad");
  const mapURLs = {
    nadiad: "https://www.google.com/maps/embed?pb=YOUR_EMBED_CODE_FOR_NADIAD",
    ahmedabad: "https://www.google.com/maps/embed?pb=YOUR_EMBED_CODE_FOR_AHMEDABAD",
    vadodara: "https://www.google.com/maps/embed?pb=YOUR_EMBED_CODE_FOR_VADODARA",
  };

  // Menu items array
  const menuItems = [
    {
      name: "Bihari Samosa",
      price: 30,
      label: "₹30 / Per Piece",
      img: bs,
      description:
        "A samosa is a small pastry with spiced potatoes, onions, peas, etc.",
    },
    {
      name: "Cheese Bihari Samosa",
      price: 60,
      label: "₹60 / Per Piece",
      img: CS,
      description:
        "A fusion samosa with potatoes, peas, and melted cheese.",
    },
    {
      name: "Swaminarayan Samosa",
      price: 30,
      label: "₹30 / Per Piece",
      img: SS,
      description:
        "Prepared without onion or garlic; Swaminarayan-friendly.",
    },
    {
      name: "Meethi Chutney",
      price: 200,
      label: "₹200 / Per Kg",
      img: MC,
      description:
        "Sweet tamarind chutney made with jaggery and special spices.",
    },
    {
      name: "Tikhi Chutney",
      price: 150,
      label: "₹150 / Per Kg",
      img: TC,
      description:
        "Spicy chutney that pairs perfectly with samosas or snacks.",
    },
    {
      name: "Garam Masala",
      price: 60,
      label: "₹60 / Per 30gm",
      img: GM,
      description:
        "A homemade blend of aromatic spices for authentic flavor.",
    },
  ];

  // Detail view (modal) for a selected product
  if (selectedProduct) {
    const totalPrice = selectedProduct.price * quantity;

    const handleAddToCart = () => {
      const itemToAdd = { ...selectedProduct, quantity };
      addItemToCart(itemToAdd);
      alert(`Added ${selectedProduct.name} (x${quantity}) to cart!`);
      setSelectedProduct(null);
    };

    const handleCheckout = () => {
      handleAddToCart();
      // For example, navigate to Cart Information page
    };

    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40 p-4">
        <div className="bg-white rounded-md shadow-md p-6 w-full max-w-xl relative">
          <button
            onClick={() => setSelectedProduct(null)}
            className="absolute top-2 right-2 text-gray-500 hover:text-black"
          >
            ✕
          </button>
          <h1 className="text-xl font-bold mb-4">{selectedProduct.name}</h1>
          <img
            src={selectedProduct.img}
            alt={selectedProduct.name}
            className="w-32 h-32 object-cover mx-auto mb-4"
          />
          <p className="text-sm text-gray-600 mb-4">{selectedProduct.description}</p>
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="font-semibold">
                Price: ₹{selectedProduct.price} / Per Piece
              </p>
              <p className="text-sm text-gray-500">{selectedProduct.label}</p>
            </div>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setQuantity((q) => Math.max(q - 1, 1))}
                className="bg-gray-300 px-2 py-1 rounded"
              >
                -
              </button>
              <span>{quantity}</span>
              <button
                onClick={() => setQuantity((q) => q + 1)}
                className="bg-gray-300 px-2 py-1 rounded"
              >
                +
              </button>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <button
              onClick={handleAddToCart}
              className="bg-black text-white px-4 py-2 rounded-md hover:bg-gray-800 transition-all cursor-pointer"
            >
              Add to Cart
            </button>
            <button
              onClick={handleCheckout}
              className="bg-orange-400 text-white px-4 py-2 rounded-md hover:bg-orange-500 transition-all cursor-pointer"
            >
              Checkout ₹{totalPrice.toFixed(2)}
            </button>
          </div>
          <p className="text-sm text-center text-red-600 mt-2">
            *Free Home Delivery on orders above ₹299.00
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 font-sans relative">
      {/* HERO SECTION */}
      <Element name="home-section">
        <section className="bg-white py-8 lg:py-10 border-b-2 border-red-600">
          <div className="container mx-auto px-4 md:px-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 items-center gap-8">
              {/* Left Column: Business Info */}
              <div>
                <div className="flex flex-col lg:flex-row items-center lg:items-start space-x-0 lg:space-x-4">
                  <img
                    src={about}
                    alt="Dadaji"
                    className="w-20 h-20 lg:w-28 lg:h-28 rounded-full border border-gray-300 shadow-md mb-4 lg:mb-0"
                  />
                  <div>
                    <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 leading-tight">
                      <span className="text-black">Bihari</span>{" "}
                      <span className="text-red-600">Samosa</span>
                    </h1>
                    <h3 className="text-sm sm:text-base lg:text-xl text-gray-700 font-medium mt-1">
                      Ghantawala Since 1972
                    </h3>
                  </div>
                </div>
                <p className="text-gray-600 mt-4 max-w-md leading-relaxed text-sm sm:text-base lg:text-lg">
                  We are serving original taste and best quality samosas in Nadiad town and also provide home delivery services for bulk orders (100 pieces) to your home!
                </p>
                {/* Explore Menu Button */}
                <Link
                  to="menu-section"
                  smooth={true}
                  offset={-70}
                  duration={500}
                  className="inline-block"
                >
                  <button className="bg-[#621b1b] text-white text-sm sm:text-base lg:text-lg px-4 sm:px-6 py-2 sm:py-3 rounded-md mt-6 hover:bg-[#4e1515] transition-all font-medium cursor-pointer">
                    Explore Menu
                  </button>
                </Link>
                {/* "We are available on" Section with social links */}
                <div className="mt-6">
                  <p className="text-base sm:text-lg lg:text-xl font-semibold text-gray-900 mb-2">
                    We are available on
                  </p>
                  <div className="flex items-center space-x-4 sm:space-x-6">
                    <a
                      href="https://youtu.be/QuiY0RGjt1w?si=tL8LbBrzTgMog_hA"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <img
                        src={you}
                        alt="YouTube 1"
                        className="w-8 sm:w-12 lg:w-16 h-8 sm:h-12 lg:h-16 object-contain cursor-pointer transition-transform transform hover:scale-105"
                      />
                    </a>
                    <a
                      href="https://youtu.be/dIFh6FjG65Y?si=BYADVwr-ubOGghMl"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <img
                        src={you}
                        alt="YouTube 2"
                        className="w-8 sm:w-12 lg:w-16 h-8 sm:h-12 lg:h-16 object-contain cursor-pointer transition-transform transform hover:scale-105"
                      />
                    </a>
                    <a
                      href="https://wa.me/918320239958"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <img
                        src={what}
                        alt="WhatsApp"
                        className="w-8 sm:w-12 lg:w-16 h-8 sm:h-12 lg:h-16 object-contain cursor-pointer transition-transform transform hover:scale-105"
                      />
                    </a>
                    <a
                      href="https://www.justdial.com/Nadiad/Bihari-Samosa-Near-Krishna-Hospital-Dumral-Bazar/9999PX268-X268-170921121532-Y5F5_BZDET/amp"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <img
                        src={fc}
                        alt="JustDial"
                        className="w-8 sm:w-12 lg:w-16 h-8 sm:h-12 lg:h-16 object-contain cursor-pointer transition-transform transform hover:scale-105"
                      />
                    </a>
                    <a
                      href="https://www.zomato.com/nadiad/asli-bihari-samosa-center-ghantwala-nadiad-locality/order"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <img
                        src={home2}
                        alt="Zomato"
                        className="w-8 sm:w-12 lg:w-16 h-8 sm:h-12 lg:h-16 object-contain cursor-pointer transition-transform transform hover:scale-105"
                      />
                    </a>
                  </div>
                </div>
              </div>
              {/* Right Column: Banner */}
              <div className="w-full h-64 lg:h-72 flex justify-center lg:justify-end overflow-hidden">
                <img
                  src={home1}
                  alt="Bihari Samosa Banner"
                  className="w-full h-auto object-cover"
                />
              </div>
            </div>
          </div>
        </section>
      </Element>

      {/* MENU SECTION */}
      <Element name="menu-section">
        <section className="relative bg-gray-50 py-16">
          <div className="hidden md:flex absolute top-8 right-6 bg-red-600 text-white text-center text-xs sm:text-sm font-semibold w-32 h-32 items-center justify-center rounded-full shadow-lg z-10">
            <p className="px-2 leading-snug">We also parcel for overseas delivery</p>
          </div>
          <div className="hidden md:block absolute top-1/2 right-[-40px] -translate-y-1/2 rotate-90 z-0">
            <h1 className="text-gray-200 text-[70px] sm:text-[90px] lg:text-[110px] font-bold tracking-wide">
              Menu
            </h1>
          </div>
          <div className="text-center mb-8 relative z-10">
            <p className="text-red-600 text-sm sm:text-base font-semibold mb-1">
              Our Special
            </p>
            <h3 className="text-3xl sm:text-4xl font-bold text-gray-800">
              Dine In + Delivery
            </h3>
          </div>
          <div className="container mx-auto px-4 lg:px-28 relative z-10">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {menuItems.map((item, index) => (
                <div
                  key={index}
                  className="bg-white shadow-lg rounded-lg p-6 text-center hover:shadow-xl transition-shadow"
                >
                  <img
                    src={item.img}
                    alt={item.name}
                    className="w-28 h-28 mx-auto mb-4 object-cover rounded-lg"
                  />
                  <h4 className="text-lg font-bold text-gray-800">{item.name}</h4>
                  <p className="text-sm text-gray-500 mt-2">{item.label}</p>
                  <button
                    onClick={() => setSelectedProduct(item)}
                    className="mt-4 bg-black text-white px-6 py-2 rounded-full hover:bg-gray-800 transition-transform transform hover:scale-105 cursor-pointer"
                  >
                    ORDER NOW
                  </button>
                </div>
              ))}
            </div>
          </div>
        </section>
      </Element>

      {/* SOCIAL MEDIA SECTION */}
      <Element name="social-media-section">
        <section className="bg-gray-50 py-16">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-800">Follow us on Social Media</h2>
            <p className="text-gray-500 mt-2">
              For the latest news, updates, and inspirational recipes, follow us to flavour up your food!
            </p>
          </div>
          <div className="container mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 px-6">
            {[
              { icon: fc, platform: "JustDial", link: "https://www.justdial.com/Nadiad/Bihari-Samosa-Near-Krishna-Hospital-Dumral-Bazar/9999PX268-X268-170921121532-Y5F5_BZDET/amp" },
              { icon: home2, platform: "Zomato", link: "https://www.zomato.com/nadiad/asli-bihari-samosa-center-ghantwala-nadiad-locality/order" },
              { icon: you, platform: "YouTube", link: "https://youtu.be/QuiY0RGjt1w?si=tL8LbBrzTgMog_hA" },
              { icon: you, platform: "YouTube", link: "https://youtu.be/dIFh6FjG65Y?si=BYADVwr-ubOGghMl" },
              { icon: what, platform: "WhatsApp", link: "https://wa.me/918320239958" },
            ].map((social, idx) => (
              <a
                key={idx}
                href={social.link}
                target="_blank"
                rel="noopener noreferrer"
                className="relative bg-white shadow-lg rounded-lg p-6 flex items-center justify-center hover:shadow-xl transition-shadow"
              >
                <img
                  src={bs}
                  alt="Samosa"
                  className="w-40 h-40 object-cover rounded-md"
                />
                <div className="absolute bottom-4 left-4 bg-white rounded-full p-2 shadow-lg">
                  <img
                    src={social.icon}
                    alt={social.platform}
                    className="w-10 h-10 object-contain"
                  />
                </div>
              </a>
            ))}
          </div>
        </section>
      </Element>

      {/* CONTACT SECTION */}
      <Element name="contact-section">
        <section className="bg-gray-50 py-16">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-800">Contact Us</h2>
            <p className="text-gray-500 mt-2">
              Fill this form; we will get back to you as soon as possible.
            </p>
          </div>
          <div className="container mx-auto flex flex-col lg:flex-row items-start justify-between gap-8 px-6">
            {/* Addresses */}
            <div className="bg-white rounded-lg shadow-md p-6 w-full lg:w-1/3">
              <ul className="space-y-6">
                {[
                  {
                    location: "Nadiad",
                    details: "Manekchowk Santram Mandir Road, Opp. Krishna Hospital",
                  },
                  {
                    location: "Ahmedabad",
                    details: "Chandkheda New CG Road, Podar School",
                  },
                  {
                    location: "Vadodara",
                    details: "Karelibaug Ambalalal Park near Swaminarayan Mandir",
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

            {/* Map */}
            <div className="bg-white rounded-lg shadow-md p-6 w-full lg:w-1/3">
              <div className="relative">
                <select
                  className="w-full p-3 rounded-md border border-gray-300 mb-4"
                  value={selectedLocation}
                  onChange={(e) => setSelectedLocation(e.target.value)}
                >
                  <option value="nadiad">Nadiad</option>
                  <option value="ahmedabad">Ahmedabad</option>
                  <option value="vadodara">Vadodara</option>
                </select>
                <div className="relative w-full h-64">
                  <iframe
                    src={mapURLs[selectedLocation]}
                    className="w-full h-full rounded-md"
                    allowFullScreen=""
                    loading="lazy"
                    title={`Map of ${selectedLocation}`}
                  ></iframe>
                </div>
              </div>
            </div>

            {/* Contact Form */}
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

      {/* REVIEWS SECTION */}
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
                &quot;I've been using their samosa services for months, and I'm always
                impressed with the quality. Highly recommended!&quot;
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
