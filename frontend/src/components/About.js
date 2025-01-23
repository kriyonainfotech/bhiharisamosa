import React, { useEffect } from "react";
import dada from "../image/dada.png"; // Replace with actual image path
import about from "../image/about.png"; // Replace with actual image path

const About = () => {
  // Ensure the page scrolls to the top on load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="bg-gray-100 font-sans">
      {/* Main Content Section */}
      <section className="bg-white py-10 px-6 flex flex-col lg:flex-row items-center">
        <div className="lg:w-1/2 text-center lg:text-left">
          <img
            src={dada}
            alt="Founder"
            className="w-40 h-40 mx-auto lg:mx-0 rounded-full mb-4"
          />
          <div className="text-sm">
            <p>ESTABLISHED: 05TH MAY, 1972</p>
            <p>
              LOCATION: MANEK CHAWK, OPP. SANTRAM MANDIR, NADIAD, DIST: KHEDA,
              GUJARAT, INDIA-387001.
            </p>
            <p>INDUSTRY: FOOD & BEVERAGE / FAST FOOD</p>
          </div>
        </div>
        <div className="lg:w-1/2 mt-6 lg:mt-0 text-center">
          <img src={about} alt="Logo" className="w-40 h-auto mx-auto" />
        </div>
      </section>

      {/* Main Content Section */}
      <section className="px-6 py-10 space-y-8">
        {/* Overview */}
        <div>
          <h2 className="text-xl font-semibold mb-2">Overview:</h2>
          <p>
            Bihari Samosa Center - Ghantawala, a beloved institution in Nadiad,
            has been serving authentic, mouth-watering samosas since its
            founding in 1972 by Kalishaprasad Kishanlal Shah. Known for its
            time-honored recipes and rich flavors, the center has earned a
            special place in the hearts of locals and expanded its presence
            across Gujarat.
          </p>
        </div>

        {/* Mission */}
        <div>
          <h2 className="text-xl font-semibold mb-2">Mission:</h2>
          <p>
            Our mission is to deliver high-quality samosas that capture the
            essence of Bihar's culinary heritage, paired with exceptional
            service and a welcoming atmosphere, ensuring every customer leaves
            satisfied.
          </p>
        </div>

        {/* Products */}
        <div>
          <h2 className="text-xl font-semibold mb-2">Products:</h2>
          <ul className="list-disc pl-6">
            <li>
              <strong>Samosas:</strong> We offer a wide variety of samosas with
              flavorful fillings like spiced potatoes, peas, and other regional
              specialties that reflect the richness of Bihari cuisine.
            </li>
            <li>
              <strong>Chutneys:</strong> Our homemade chutneys, crafted from the
              freshest ingredients, perfectly complement our samosas, enhancing
              the overall experience.
            </li>
          </ul>
        </div>

        {/* Expansion */}
        <div>
          <h2 className="text-xl font-semibold mb-2">Expansion:</h2>
          <ul className="list-disc pl-6">
            <li>
              <strong>Chandkheda Branch (2004):</strong> Our first expansion in
              Ahmedabad marked the beginning of our growth beyond Nadiad.
            </li>
            <li>
              <strong>Ankur Char Rasta Branch:</strong> A second branch in
              Ahmedabad ensures the legacy of quality and service continues.
            </li>
          </ul>
        </div>

        {/* Unique Selling Points */}
        <div>
          <h2 className="text-xl font-semibold mb-2">Unique Selling Points:</h2>
          <ul className="list-disc pl-6">
            <li>
              <strong>Heritage:</strong> With over 50 years of expertise, we
              pride ourselves on traditional recipes passed down through
              generations.
            </li>
            <li>
              <strong>Quality Ingredients:</strong> We are committed to using
              fresh, locally sourced ingredients in all our products.
            </li>
            <li>
              <strong>Local Favorite:</strong> Our loyal customer base trusts us
              for consistency and exceptional taste.
            </li>
          </ul>
        </div>

        {/* Customer Base */}
        <div>
          <h2 className="text-xl font-semibold mb-2">Customer Base:</h2>
          <p>
            Bihari Samosa Center serves a wide range of customers, including
            families, students, and professionals. Our reputation for delicious
            samosas attracts food lovers from all walks of life.
          </p>
        </div>

        {/* Community Engagement */}
        <div>
          <h2 className="text-xl font-semibold mb-2">Community Engagement:</h2>
          <p>
            We actively participate in local festivals and events to promote the
            rich flavors of Bihari cuisine. Additionally, we offer catering
            services for special occasions.
          </p>
        </div>

        {/* Future Plans */}
        <div>
          <h2 className="text-xl font-semibold mb-2">Future Plans:</h2>
          <p>
            Bihari Samosa Center plans to expand its branch network further and
            introduce new menu items inspired by regional flavors while staying
            true to our commitment to quality and tradition.
          </p>
        </div>
      </section>
    </div>
  );
};

export default About;
