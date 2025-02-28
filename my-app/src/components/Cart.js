// src/admin/Cart.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../style/Cart.css";

// Sample images – replace with your actual images
import bs from "../image/bs.png";
import CS from "../image/CS.png";

const Cart = () => {
  const navigate = useNavigate();

  // Navigate to the Cart Information page and pass cart data in state
  const handleCartInformationClick = () => {
    navigate("/Cartinformation", {
      state: {
        items: cartItems,
        shipping,
        total: finalTotal,
      },
    });
  };

  // Initial cart state with one product already added
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      productName: "Bihari Samosa",
      price: 30,
      quantity: 2,
      img: bs,
    },
  ]);

  // Function to update cart: add product or increment quantity if exists
  const addToCart = (product) => {
    setCartItems((prevCart) => {
      const existingIndex = prevCart.findIndex(
        (item) => item.id === product.id
      );
      if (existingIndex !== -1) {
        const updatedCart = [...prevCart];
        updatedCart[existingIndex].quantity += 1;
        return updatedCart;
      } else {
        return [...prevCart, { ...product, quantity: 1 }];
      }
    });
    alert(`Added ${product.productName} to cart!`);
  };

  // Handlers to update quantity for a given cart item
  const handleIncrement = (index) => {
    setCartItems((prevCart) => {
      const updated = [...prevCart];
      updated[index].quantity += 1;
      return updated;
    });
  };

  const handleDecrement = (index) => {
    setCartItems((prevCart) => {
      const updated = [...prevCart];
      if (updated[index].quantity > 1) {
        updated[index].quantity -= 1;
      } else {
        // Remove item if quantity becomes 0
        updated.splice(index, 1);
      }
      return updated;
    });
  };

  // Calculate total price for items
  const totalItemPrice = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  // Shipping: free if total meets threshold; otherwise ₹40
  const freeShippingThreshold = 120;
  const shipping = totalItemPrice >= freeShippingThreshold ? 0 : 40;
  const finalTotal = totalItemPrice + shipping;

  return (
    <div className="cart-container">
      {/* Order Review Section */}
      <div className="order-review">
        <h2>Order Review</h2>
        {cartItems.map((item, index) => (
          <div key={item.id} className="cart-item">
            <img src={item.img} alt={item.productName} className="cart-item-img" />
            <div className="cart-item-details">
              <h3>{item.productName}</h3>
              <p>₹{item.price} / Per Plate</p>
            </div>
            <div className="cart-item-quantity">
              <button onClick={() => handleDecrement(index)}>-</button>
              <span>{item.quantity}</span>
              <button onClick={() => handleIncrement(index)}>+</button>
            </div>
          </div>
        ))}
        <hr />
        <h3>Add more to your bag</h3>
        <div className="more-items">
          {[
            {
              id: 2,
              productName: "Cheese Bihari Samosa",
              price: 70,
              img: CS,
            },
          ].map((product) => (
            <div key={product.id} className="item-card">
              <img src={product.img} alt={product.productName} />
              <h4>{product.productName}</h4>
              <br />
              <p>₹{product.price} / Per Plate</p>
              <br />
              <button onClick={() => addToCart(product)}>Order Now</button>
            </div>
          ))}
        </div>
      </div>

      {/* Order Total Section */}
      <div className="Order">
        <div className="order-total">
          <h2 className="o1">Order Total</h2>
          <div className="total-details">
            {cartItems.map((item) => (
              <p key={item.id}>
                <span>{item.productName}</span>
                <span>₹{(item.price * item.quantity).toFixed(2)}</span>
              </p>
            ))}
            <p>
              <span>Shipping</span>
              <span>₹{shipping}</span>
            </p>
            <p className="free-delivery-hint">
              {totalItemPrice < freeShippingThreshold
                ? `Add items worth ₹${freeShippingThreshold - totalItemPrice} more to unlock free delivery`
                : "You have unlocked free delivery!"}
            </p>
            <hr />
            <p className="total">
              <span>Total</span>
              <span>₹{finalTotal}</span>
            </p>
          </div>
          <button
            onClick={handleCartInformationClick}
            className="order-info-btn"
          >
            Fill out order info
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
