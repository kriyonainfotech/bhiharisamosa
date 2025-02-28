// src/admin/About.jsx
import React, { useEffect } from "react";
import dada from "../image/dada.png";    // Founder image
import about from "../image/about.png";  // Logo image

const About = () => {
  useEffect(() => {
    // Scroll to top when page loads
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="bg-gray-100 font-sans text-base md:text-lg lg:text-xl">
      {/* Top thin orange bar */}
      <div className="bg-orange-500 h-1 w-full"></div>

      {/* Top Section */}
      <section className="bg-white px-4 py-4 md:px-6 md:py-6">
        <div className="flex flex-col md:flex-row items-center md:items-start space-y-4 md:space-y-0 md:space-x-6">
          {/* Founder Image */}
          <img
            src={dada}
            alt="Founder"
            className="w-32 h-32 md:w-40 md:h-40 object-cover rounded-full"
          />
          {/* Logo + Text */}
          <div className="flex flex-col">
            <img
              src={about}
              alt="Logo"
              className="w-28 md:w-36 h-auto object-contain"
            />
            <div className="mt-2 space-y-1 text-sm md:text-base">
              <p className="font-semibold">ESTABLISHED: 05TH MAY, 1972.</p>
              <p>
                LOCATION: MANEK CHAWK, OPP. SANTRAM MANDIR, NADIAD, DIST: KHEDA,
                GUJARAT, INDIA-387001.
              </p>
              <p>INDUSTRY: FOOD &amp; BEVERAGE / FAST FOOD</p>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Section */}
      <section className="bg-white px-4 py-4 md:px-6 md:py-6 space-y-6">
        {/* Overview */}
        <div>
          <h2 className="text-lg font-semibold mb-1">Overview:</h2>
          <p className="leading-relaxed">
            Bihari Samosa Center - Ghantawala, a beloved institution in Nadiad, has
            been serving authentic, mouth-watering samosas since its founding in
            1972 by Kalishaprasad Kishanlal Shah. Known for its time-honored recipes
            and rich flavors, the center has earned a special place in the hearts of
            locals and expanded its presence across Gujarat.
          </p>
        </div>

        {/* Mission */}
        <div>
          <h2 className="text-lg font-semibold mb-1">Mission:</h2>
          <p className="leading-relaxed">
            Our mission is to deliver high-quality samosas that capture the essence
            of Bihar's culinary heritage, paired with exceptional service and a
            welcoming atmosphere, ensuring every customer leaves satisfied.
          </p>
        </div>

        {/* Products */}
        <div>
          <h2 className="text-lg font-semibold mb-1">Products:</h2>
          <ul className="list-disc pl-5 space-y-1 leading-relaxed">
            <li>
              <strong>Samosas:</strong> A wide variety of samosas with flavorful
              fillings like spiced potatoes, peas, and regional specialties.
            </li>
            <li>
              <strong>Chutneys:</strong> Homemade chutneys crafted from the freshest
              ingredients to perfectly complement our samosas.
            </li>
          </ul>
        </div>

        {/* Expansion */}
        <div>
          <h2 className="text-lg font-semibold mb-1">Expansion:</h2>
          <ul className="list-disc pl-5 space-y-1 leading-relaxed">
            <li>
              <strong>Chandkheda Branch (2004):</strong> Our first expansion in
              Ahmedabad.
            </li>
            <li>
              <strong>Ankur Char Rasta Branch:</strong> A second branch in
              Ahmedabad.
            </li>
          </ul>
        </div>

        {/* Unique Selling Points */}
        <div>
          <h2 className="text-lg font-semibold mb-1">Unique Selling Points:</h2>
          <ul className="list-disc pl-5 space-y-1 leading-relaxed">
            <li>
              <strong>Heritage:</strong> Over 50 years of expertise with traditional
              recipes passed down through generations.
            </li>
            <li>
              <strong>Quality Ingredients:</strong> We use fresh, locally sourced
              ingredients in all our products.
            </li>
            <li>
              <strong>Local Favorite:</strong> A loyal customer base that trusts our
              consistency and exceptional taste.
            </li>
          </ul>
        </div>

        {/* Customer Base */}
        <div>
          <h2 className="text-lg font-semibold mb-1">Customer Base:</h2>
          <p className="leading-relaxed">
            We serve a wide range of customers—from families to professionals—attracting
            food lovers from all walks of life.
          </p>
        </div>

        {/* Community Engagement */}
        <div>
          <h2 className="text-lg font-semibold mb-1">Community Engagement:</h2>
          <p className="leading-relaxed">
            We actively participate in local festivals and events to promote the rich
            flavors of Bihari cuisine, and we offer catering services for special occasions.
          </p>
        </div>

        {/* Future Plans */}
        <div>
          <h2 className="text-lg font-semibold mb-1">Future Plans:</h2>
          <p className="leading-relaxed">
            Our plans include expanding our branch network and introducing new menu items
            inspired by regional flavors, all while maintaining our commitment to quality
            and tradition.
          </p>
        </div>
      </section>
    </div>
  );
};

export default About;
