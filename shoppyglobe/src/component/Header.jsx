import React, { useState } from "react";
import { FaSearch, FaShoppingCart, FaUser, FaBars } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setSearchQuery } from "../redux/Slices/searchSlice";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const dispatch = useDispatch();

  // Access cart items from the Redux state
  const cartItems = useSelector((state) => state.cart.cartItems);

  const totalItems = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  // Dispatch the query
  const handleSearch = (e) => {
    e.preventDefault();
    dispatch(setSearchQuery(searchInput)); 
  };

  return (
    <nav className="bg-gray-900 text-gray-100 shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 md:px-16 lg:px-24 py-4 flex justify-between items-center">
        <div className="text-lg font-bold">
          <Link to="/" className="text-red-500">
            SHOPPYGLOBE
          </Link>
        </div>

        <div className="relative flex-1 mx-4 hidden md:block">
          <form onSubmit={handleSearch}>
            <input
              type="text"
              placeholder="Search Product"
              className="w-full border border-gray-700 bg-gray-800 text-gray-200 py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-red-500"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
            />
            <button type="submit">
              <FaSearch className="absolute top-3 right-3 text-red-500" />
            </button>
          </form>
        </div>

        <div className="flex items-center space-x-4">
          <Link to="/cart" className="relative hover:text-red-500">
          
          {/* displaying no, of prd. added to cart */}
            <FaShoppingCart className="text-lg" />
            {totalItems > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full">
                {totalItems}
              </span>
            )}
          </Link>
          <button className="hidden md:block hover:text-red-500">Login | Register</button>
          <button className="block md:hidden hover:text-red-500">
            {/* responsiveness */}
            <FaBars onClick={() => setIsMenuOpen(!isMenuOpen)} />
          </button>
        </div>
      </div>
      {/* for md & sm devices */}
      <div
        className={`${
          isMenuOpen ? "block" : "hidden"
        } md:flex md:items-center md:justify-center space-x-4 py-4 text-sm font-bold bg-gray-800 md:bg-transparent`}
      >
        <Link to="/" className="hover:text-red-500">
          HOME
        </Link>
        <Link to="/shop" className="hover:text-red-500">
          SHOP
        </Link>
        <Link to="/contact" className="hover:text-red-500">
          CONTACT
        </Link>
        <Link to="/about" className="hover:text-red-500">
          ABOUT
        </Link>
        <div className="relative mt-4 md:hidden">
          <form onSubmit={handleSearch}>
            <input
              type="text"
              placeholder="Search Product"
              className="w-full border border-gray-700 bg-gray-800 text-gray-200 py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-red-500"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
            />
            <button type="submit">
              <FaSearch className="absolute top-3 right-3 text-red-500" />
            </button>
          </form>
        </div>
      </div>
    </nav>
  );
};

export default Header;
