import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeFromCart, updateQuantity } from "../redux/Slices/cartSlice";
import { Link } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from 'react-toastify';

const CartPage = () => {
  const cartItems = useSelector((state) => state.cart.cartItems);
  const dispatch = useDispatch();

  const handleRemoveFromCart = (item) => {
    dispatch(removeFromCart({ id: item.id }));
    toast.success(`${item.title} removed from cart!`); 
  };

  const handleUpdateQuantity = (id, quantity) => {
    dispatch(updateQuantity({ id, quantity: Number(quantity) || 1 }));
  };

  // Calculate total price
  const totalPrice = cartItems.reduce(
    (total, item) => total + item.price * (item.quantity || 1),
    0
  );

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100">
      <section className="p-4 md:p-6">
        <h2 className="text-2xl md:text-4xl font-bold text-center">Your Cart</h2>
        <div className="mt-6 md:mt-8">
          {cartItems.length === 0 ? (
            <>
              <p className="text-center text-gray-300">Your cart is empty.</p>
              <div className="flex justify-center py-6">
                <Link to="/shop">
                  <button className="bg-red-500 text-white py-2 px-6 rounded-lg hover:bg-red-600 transition">
                    Go Back
                  </button>
                </Link>
              </div>
            </>
          ) : (
            <div>
              <div className="space-y-4">
                {cartItems.map((item) => (
                  <div
                    key={item.id}
                    className="flex flex-col md:flex-row items-center justify-between bg-gray-800 p-4 rounded-lg"
                  >
                    <div className="flex items-center w-full md:w-auto">
                      <img
                        src={item.images}
                        alt={item.title}
                        className="w-16 h-16 object-cover rounded-md mr-4"
                      />
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-white">
                          {item.title}
                        </h3>
                        <p className="text-red-500">${item.price}</p>
                      </div>
                    </div>

                    <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-4 mt-4 md:mt-0">
                      <input
                        type="number"
                        min="1"
                        value={item.quantity || 1}
                        onChange={(e) =>
                          handleUpdateQuantity(item.id, e.target.value)
                        }
                        className="w-16 text-center py-1 px-2 border border-gray-700 bg-gray-800 text-gray-200"
                      />
                      <button
                        onClick={() => handleRemoveFromCart(item)} 
                        className="bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 transition"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Total Price Section */}
              <div className="mt-6 bg-gray-800 p-4 rounded-lg">
                <h3 className="text-xl md:text-2xl font-semibold text-center">
                  Total Price: <span className="text-red-500">${totalPrice.toFixed(2)}</span>
                </h3>
              </div>
            </div>
          )}
        </div>
        <ToastContainer />
      </section>
    </div>
  );
};

export default CartPage;
