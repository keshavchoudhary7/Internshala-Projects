import React from 'react';
import useFetchProducts from './hooks/useFetchProducts';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addToCart } from '../redux/Slices/cartSlice'; 
import Loading from './Loading';
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from 'react-toastify';
const FeaturedProduct = () => {
  const { products, loading } = useFetchProducts('https://dummyjson.com/products');
  const dispatch = useDispatch();

  // Dispatch action to add product to the cart
  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
    toast.success(`${product.title} added to cart!`);
  };

  return loading ? (
    <Loading/>
  ) : (

    // Render the featured products
    <section className="py-16 px-4">
      <h2 className="text-3xl font-bold mb-12 text-center text-white">
        Featured Products
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">

        {/* Display the first 4 featured products */}
        {products.slice(0, 4).map((p, index) => (
          <div
            key={index}
            className="bg-white hover:scroll-smooth p-6 rounded-lg text-center"
          >
            <Link to={`/product/${p.id}`}>
              <img
                src={p.images}
                alt={p.title}
                className="w-full h-48 object-cover rounded-md"
              />
            </Link>
            <h3 className="text-xl text-gray-600 mt-4">Title: {p.title}</h3>
            <h3 className="text-xl text-gray-900 mt-4">Brand: {p.brand}</h3>
            <p className="text-lg text-yellow-600 mt-2">
              Desc: {`${p.description.split(' ').slice(0, 3).join(' ')}...`}
            </p>
            <p className="text-lg text-green-500 font-medium mt-2">
              <span className="mx-2 text-red-500">
                Price: <strike>${Math.round(p.price + 5)}
                  </strike></span>${p.price}</p>
            <button
              
              //  Add product to cart
              onClick={() => handleAddToCart(p)} 
              className="bg-red-500 text-white py-2 px-4 rounded-lg mt-4 hover:bg-red-600"
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>
      <ToastContainer />
    </section>
  );
};

export default FeaturedProduct;
