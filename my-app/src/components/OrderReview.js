import React from "react";
import { useNavigate } from "react-router-dom";

import bs from "../image/bs.png";  // Bihari Samosa
import CS from "../image/CS.png";  // Cheese Samosa

const OrderReview = ({
  cart,
  setCart,
  incrementItem,
  decrementItem,
  addItemToCart,
}) => {
  const navigate = useNavigate();

  // Calculate subtotal
  const subTotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shippingFee = 40;
  const shipping = subTotal >= 299 ? 0 : shippingFee;
  const total = subTotal + shipping;

  const moreItems = [
    {
      name: "Cheese Bihari Samosa",
      price: 60,
      label: "₹60 / Per Plate",
      img: CS,
      description: "Melted cheese samosa.",
    },
    {
      name: "Bihari Samosa",
      price: 30,
      label: "₹30 / Per Plate",
      img: bs,
      description: "Classic Bihari samosa.",
    },
  ];

  const handleFillOutOrderInfo = () => {
    // Pass cart data & totals to CartInformation via state
    navigate("/cartinformation", {
      state: {
        items: cart,
        total,
        shipping,
      },
    });
  };

  return (
    <div className="bg-gray-50 min-h-screen p-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">Order Review</h1>

        {cart.length > 0 ? (
          <div className="flex flex-col lg:flex-row gap-8">
            <div className="flex-1">
              {cart.map((item, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between border-b pb-4 mb-4"
                >
                  <div className="flex items-center space-x-4">
                    <img
                      src={item.img}
                      alt={item.name}
                      className="w-16 h-16 object-cover"
                    />
                    <div>
                      <h3 className="font-bold text-lg">{item.name}</h3>
                      <p className="text-sm text-gray-500">{item.label}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => {
                        if (item.quantity === 1) {
                          setCart((prev) =>
                            prev.filter((cartItem) => cartItem.name !== item.name)
                          );
                        } else {
                          decrementItem(item.name);
                        }
                      }}
                      className="bg-gray-200 px-2 py-1 text-sm"
                    >
                      -
                    </button>
                    <span>{item.quantity}</span>
                    <button
                      onClick={() => incrementItem(item.name)}
                      className="bg-gray-200 px-2 py-1 text-sm"
                    >
                      +
                    </button>
                  </div>
                </div>
              ))}

              <h3 className="text-xl font-semibold mb-3">Add more to your bag</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                {moreItems.map((mItem, idx) => (
                  <div key={idx} className="bg-white shadow-md p-4 text-center">
                    <img
                      src={mItem.img}
                      alt={mItem.name}
                      className="mx-auto w-16 h-16 object-cover"
                    />
                    <h4 className="font-bold mt-2 text-sm">{mItem.name}</h4>
                    <p className="text-xs text-gray-500">{mItem.label}</p>
                    <button
                      onClick={() => addItemToCart(mItem)}
                      className="mt-2 bg-black text-white px-4 py-1 rounded text-sm hover:bg-gray-800"
                    >
                      Order Now
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <div className="w-full lg:w-80 bg-white shadow-md p-6">
              <h2 className="text-xl font-semibold mb-4">Order Total</h2>
              <div className="space-y-2">
                {cart.map((item, idx) => (
                  <div key={idx} className="flex justify-between text-sm">
                    <span>{item.name}</span>
                    <span>₹{(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
                <div className="flex justify-between text-sm mt-2">
                  <span>Shipping</span>
                  <span>₹{shipping.toFixed(2)}</span>
                </div>
                {subTotal < 299 && (
                  <p className="text-xs text-gray-500 mt-1">
                    Add items worth ₹{299 - subTotal} more to unlock free delivery
                  </p>
                )}
                <hr className="my-3" />
                <div className="flex justify-between text-lg font-bold">
                  <span>Total</span>
                  <span>₹{total.toFixed(2)}</span>
                </div>
              </div>
              <button
                onClick={handleFillOutOrderInfo}
                className="w-full bg-black text-white py-2 mt-4 rounded hover:bg-gray-800"
              >
                Fill out order info
              </button>
            </div>
          </div>
        ) : (
          <p>Your cart is empty!</p>
        )}
      </div>
    </div>
  );
};

export default OrderReview;
