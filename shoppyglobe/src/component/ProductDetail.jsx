import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useFetchProducts from "../component/hooks/useFetchProducts";
import { useDispatch } from "react-redux";
import { addToCart } from '../redux/Slices/cartSlice';
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from 'react-toastify';
import Loading from "./Loading";

const ProductDetail = () => {
  // Get product ID 
  const { id } = useParams(); 
  const { products, loading } = useFetchProducts("https://dummyjson.com/products");
  const [productDetail, setProductDetail] = useState(null);
  const dispatch = useDispatch();
  
  // Add to Cart Handler
  const addToCartHandler = (product) => {
    dispatch(addToCart(product));
    toast.success(`${product.title} added to cart!`);
  };

  useEffect(() => {
    if (products) {
      const selectedProduct = products.find(product => product.id === parseInt(id));
      setProductDetail(selectedProduct);
    }
  }, [id, products]);

  if (loading) return <Loading/>;
  if (!productDetail) return <div>Product not found</div>;

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100">
      {/* Hero Banner */}
      <section
        className="h-60 bg-cover bg-center flex items-center justify-center"
        style={{
          backgroundImage:
            "url('https://manipaldigital.info/wp-content/uploads/2021/06/image-optimization-for-ecommerce-use-banner.jpg')",
        }}
      >
        <div className="bg-black bg-opacity-50 py-4 px-8 rounded-md text-center">
          <h1 className="text-4xl font-bold text-white">Product Details</h1>
        </div>
      </section>

      {/* Product Details */}
      <div className="flex flex-col md:flex-row p-6">
        <div className="md:w-1/2 mb-6 md:mb-0">
          <img
            src={productDetail.thumbnail}
            alt={productDetail.title}
            className="w-96 h-auto mx-auto object-cover rounded-md"
          />
        </div>
        {/* displayed fetched data  */}
        <div className="md:w-1/2 md:pl-6">
          <h2 className="text-3xl font-semibold text-white">{productDetail.title}</h2>
          <p className="text-xl font-semibold text-white"><span className="text-slate-400">Brand: </span>{productDetail.brand}</p>
          <p className="text-xl font-semibold text-white"><span className="text-slate-400">Category: </span>{productDetail.category}</p>
          <p className="text-xl font-semibold text-white"><span className="text-slate-400">Warranty: </span>{productDetail.warrantyInformation || "No warranty details available"}</p>
          <p className="text-xl font-semibold text-white"><span className="text-slate-400">Shipping Info: </span>{productDetail.shippingInformation || "N/A"}</p>
          <p className="text-xl font-semibold text-white"><span className="text-slate-400">Status: </span>{productDetail.availabilityStatus || "Available"}</p>
          <p className="text-xl font-semibold text-white"><span className="text-slate-400">Discount: </span>{productDetail.discountPercentage}%</p>
          <p className="text-xl font-semibold text-white"><span className="text-slate-400">Return Policy: </span>{productDetail.returnPolicy || "No return policy"}</p>
          <p className="text-xl font-semibold text-white"><span className="text-slate-400">Rating: </span>{productDetail.rating} ★</p>
          <p className="text-lg text-red-500 font-medium mt-2">
            <span className="mx-2">Best Price: <strike>${Math.round(productDetail.price + 5)}</strike></span>${productDetail.price}
          </p>
          <p className="text-gray-300 mt-4">{productDetail.description}</p>

          {/* Add to Cart Button */}
          <button 
            onClick={() => addToCartHandler(productDetail)}
            className="bg-red-500 text-white py-2 px-4 rounded-md mt-6 hover:bg-red-600"
          >
            Add to Cart
          </button>
        </div>
      </div>

      {/* Reviews Section */}
      <section className="p-6 mt-6 bg-gray-800 rounded-md">
        <h2 className="text-2xl font-semibold text-white">Customer Reviews</h2>
        <div className="mt-4">
          {productDetail.reviews && productDetail.reviews.length > 0 ? (
            productDetail.reviews.map((review, index) => (
              <div key={index} className="border-b border-gray-700 py-4">
                <h5 className="text-white text-xl font-medium">{review.reviewerName} ★</h5>
                <p className="text-white font-medium">{review.reviewerEmail}</p>
                <p className="text-white font-medium">Rating: {review.rating} ★</p>
                <p className="text-gray-400">{review.comment}</p>
                <p className="text-sm text-gray-500">{new Date(review.date).toLocaleDateString()}</p>
              </div>
            ))
          ) : (
            <p className="text-gray-400">No reviews yet.</p>
          )}
        </div>
      </section>

      <ToastContainer />
    </div>
  );
};

export default ProductDetail;
