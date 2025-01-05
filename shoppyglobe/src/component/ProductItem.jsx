import React from 'react';
import { Link } from 'react-router-dom';

const ProductItem = ({ product, handleAddToCart }) => {
  return (
    <div className="bg-gray-800 p-4 rounded-lg text-center hover:shadow-lg">
      <Link to={`/product/${product.id}`}>
        <img
          src={product.images[0]}
          alt={product.title}
          className="w-full h-48 object-cover rounded-md mb-4"
        />
      </Link>
      <h3 className="text-lg font-semibold text-white">{product.title}</h3>
      <h3 className="text-lg text-red-700 mt-4">{product.brand}</h3>
      <p> Rating: {product.rating}</p>
      <p className="text-lg text-green-500 font-medium mt-2">
        <span className="mx-2 text-red-500">
          Price: <strike>${Math.round(product.price + 5)}</strike>
        </span>
        ${product.price}
      </p>
      <button
        className="bg-red-500 text-white py-2 px-4 rounded-md mt-4 hover:bg-red-600"
        onClick={() => handleAddToCart(product)} 
      >
        Add to Cart
      </button>
    </div>
  );
};

export default ProductItem;
