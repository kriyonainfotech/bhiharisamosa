import React from "react";
import "../style/contact.css";
import location from "../image/location.png";

const Contact = () => {
    return (
      <>
 <div className="home-container1">
      * Contact Us Section *
      <div className="contact-section">
        <h1>Contact Us</h1>
        <p>Fill this form we will get back to you as soon as possible</p>
        <div className="contact-content">
          <div className="locations">
            <div className="location">
              <span>📍 Nadiad</span>
              <p>Manekchowk santram mandir road, Opp. krishna hospital</p>
            </div>
            <div className="location">
              <span>📍 Ahmedabad</span>
              <p>Chandkheda new C G road, Podar school</p>
            </div>
            <div className="location">
              <span>📍 Vadodara</span>
              <p>Karelibaug ambalal park near swaminarayan mandir</p>
            </div>
          </div>
          <div>
          <img src={location} alt="Location" className="platform-icon" />
          </div>
          <div className="form-section">
            <form>
              <input type="text" placeholder="Full Name" />
              <input type="text" placeholder="Mobile Number" />
              <textarea placeholder="Message"></textarea>
              <button type="submit">Save</button>
            </form>
          </div>
        </div>
      </div>   
     </div>   
     </>
    );
}; 

export default Contact;     