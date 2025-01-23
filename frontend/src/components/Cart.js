import React, { useState } from "react";
import {useNavigate} from 'react-router-dom';
import "../style/Cart.css";
import bs from"../image/bs.png";
import CS from "../image/CS.png";


const Cart = () => {
  const navigate = useNavigate();

  const handleCartinformationClick =() =>{
    navigate('/Cartinformation');
  }

  const [quantity, setQuantity] = useState(2);
  const pricePerItem = 30;
  const shipping = 40;
  const freeShippingThreshold = 120;
  const totalItemPrice = pricePerItem * quantity;

  const handleIncrement = () => setQuantity(quantity + 1);
  const handleDecrement = () => quantity > 1 && setQuantity(quantity - 1);

  return (
    <div className="cart-container">
      {/* Order Review Section */}
      <div className="order-review">
        <h2>Order Review</h2>
        <div className="cart-item">
          <img src={bs} alt="Bihari Samosa" className="cart-item-img" />
          <div className="cart-item-details">
            <h3>Bihari Samosa</h3>
            <p>₹{pricePerItem} / Per Plate</p>
          </div>
          <div className="cart-item-quantity">
            <button onClick={handleDecrement}>-</button>
            <span>{quantity}</span>
            <button onClick={handleIncrement}>+</button>
          </div>
        </div>
        <hr />
        <h3>Add more to your bag</h3>
        <div className="more-items">
          {Array(4)
            .fill(0)
            .map((_, index) => (
              <div key={index} className="item-card">
                <img src={CS} alt="Cheese Bihari Samosa" />
                <h4>Cheese Bihari Samosa</h4>
                <br></br>
                <p>₹70 / Per Plate</p>
                <br></br>
                <button>Order Now</button>
              </div>
            ))}
        </div>
      </div>

      {/* Order Total Section */}
      <div className="Order">
      <div className="order-total">
        <h2 class ="o1">Order Total</h2>
        <div className="total-details">
          <p>
            <span>Bihari Samosa</span>
            <span>₹{totalItemPrice}</span>
          </p>
          <p>
            <span>Shipping</span>
            <span>₹{shipping}</span>
          </p>
          <p className="free-delivery-hint">
            Add items worth ₹
            {Math.max(0, freeShippingThreshold - totalItemPrice)} more to unlock free delivery
          </p>
          <hr />
          <p className="total">
            <span>Total</span>
            <span>₹{totalItemPrice + shipping}</span>
          </p>
        </div>
        <button onClick={handleCartinformationClick} className="order-info-btn">Fill out order info</button>
      </div>
    </div>
    </div>
  );
};

export default Cart;
