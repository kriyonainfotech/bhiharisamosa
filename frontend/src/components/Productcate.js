  import React, { useState } from "react";
  import "../style/productcate.css";
  import bs from "../image/bs.png";

  const ProductCard = () => {
    const [quantity1, setQuantity1] = useState(0);
    const [quantity2, setQuantity2] = useState(0);
    const [quantity3, setQuantity3] = useState(0);

    const handleIncrement1 = () => setQuantity1(quantity1 + 1);
    const handleDecrement1 = () => quantity1 > 0 && setQuantity1(quantity1 - 1);

    const handleIncrement2 = () => setQuantity2(quantity2 + 1);
    const handleDecrement2 = () => quantity2 > 0 && setQuantity2(quantity2 - 1);

    const handleIncrement3 = () => setQuantity3(quantity3 + 1);
    const handleDecrement3 = () => quantity3 > 0 && setQuantity3(quantity3 - 1);

    const totalAmount = quantity1 * 30 + quantity2 * 50 + quantity3 * 90;

    return (
      <div className="product-card">
        <div className="product-header">
          <img src={bs} alt="Bihari Samosa" className="product-image" />
          <h2>Bihari Samosa</h2>
          <p className="product-description">
            A samosa is a small, triangular pastry with a savory filling that is
            often made with spiced potatoes, onions, peas, and lentils. The
            pastry is flaky and crisp, and samosas are often served with chutney.
          </p>
        </div>

        <div className="product-variants">
          <div className="variant">
            <span>₹30 / 1 Piece</span>
            <div className="quantity-controls">
              <button onClick={handleDecrement1}>-</button>
              <span>{quantity1}</span>
              <button onClick={handleIncrement1}>+</button>
            </div>
          </div>
          <div className="variant">
            <span>₹50 / 2 Pieces</span>
            <div className="quantity-controls">
              <button onClick={handleDecrement2}>-</button>
              <span>{quantity2}</span>
              <button onClick={handleIncrement2}>+</button>
            </div>
          </div>
          <div className="variant">
            <span>₹90 / 2 Plates</span>
            <div className="quantity-controls">
              <button onClick={handleDecrement3}>-</button>
              <span>{quantity3}</span>
              <button onClick={handleIncrement3}>+</button>
            </div>
          </div>
        </div>

        <div className="product-actions">
          <button className="add-to-cart">Add to Cart</button>
          <button className="checkout">Checkout ₹{totalAmount}</button>
        </div>

        <p className="free-delivery-note">
          *Free Home Delivery on order above ₹299.00
        </p>
      </div>
    );
  };

  export default ProductCard;
