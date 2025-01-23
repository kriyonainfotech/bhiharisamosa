import React from "react";
import "../style/menu.css";

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
import parcel from "../image/parcel.png";

const Menu = () => {
    return (
        <>
{/* Menu Section */}
      <div className="menu-section">
        <h2 className="menu-title">Our Special</h2>
        <h3 className="menu-subtitle">Dine In + Delivery</h3>
        <div className="menu-grid">
          {[
            { name: "Bihari Samosa", price: "₹30 / Per Piece", img: bs },
            { name: "Cheese Bihari Samosa", price: "₹60 / Per Piece", img: CS },
            { name: "Swaminarayan Samosa", price: "₹30 / Per Piece", img: SS },
            { name: "Meethi Chutney", price: "₹200 / Per Kg", img: MC },
            { name: "Tikhi Chutney", price: "₹150 / Per Kg", img: TC },
            { name: "Garam Masala", price: "₹60 / Per 30gm", img: GM },
          ].map((item, index) => (
            <div key={index} className="menu-item">
              <img src={item.img} alt={item.name} />
              <h4>{item.name}</h4>
              <p>{item.price}</p>
              <button>ORDER NOW</button>
            </div>
          ))}
        </div>
        <div className="delivery-note">
        <img src={parcel} alt="parcel" className="platform-icon" />
          
        </div>
      </div>
    

    <div className="social-media-section">
      <h1>Follow us on Social Media</h1>
      <p>For the latest news, updates and inspirational recipes, follow us to flavour up your food!</p>
      <div className="social-icons">
        <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
          <img src={fc} alt="Facebook" />
        </a>
        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
          <img src={ins} alt="Instagram" />
        </a>
        <a href="https://youtube.com" target="_blank" rel="noopener noreferrer">
          <img src={you} alt="YouTube" />
        </a>
        <a href="https://whatsapp.com" target="_blank" rel="noopener noreferrer">
          <img src={what} alt="WhatsApp" />
        </a>
      </div>
    </div>
    </>
    );
};   

export default Menu;    