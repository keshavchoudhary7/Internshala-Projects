import React, { useState, useEffect } from "react";
import useFetchProducts from "../component/hooks/useFetchProducts";
import { useSelector, useDispatch } from "react-redux";
import { addToCart } from "../redux/Slices/cartSlice"; 
import Loading from "../component/Loading";
import ProductItem from "../component/ProductItem"; 
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from 'react-toastify';

const ProductList = () => {
  const { products, loading, error } = useFetchProducts("https://dummyjson.com/products");
  //fetch category from api
  const categories = products.map((p) => p.category);
  //filter duplicate category using Set
  const uniqueCategories = ["All", ...new Set(categories)];

  const [selectedCategory, setSelectedCategory] = useState("All");
  const [heading, setHeading] = useState("ALL PRODUCTS");

  const searchQuery = useSelector((state) => state.search.query);
  const dispatch = useDispatch();

  //filtered product according to category
  const filteredProducts = products.filter((product) => {
    const matchesCategory =
      selectedCategory === "All" || product.category === selectedCategory;
    const matchesSearch =
      product?.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product?.brand?.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  //handle category
  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
    setHeading(category === "All" ? "ALL PRODUCTS" : ` ${category}`);
  };

  //handle add to cart
  const handleAddToCart = (product) => {
    dispatch(addToCart(product)); 
    toast.success(`${product.title} added to cart!`);
  };

  if (loading) return <Loading />;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100">
      {/* hero section  */}
      <section
        className="h-60 bg-cover bg-center flex items-center justify-center"
        style={{
          backgroundImage:
            "url('https://manipaldigital.info/wp-content/uploads/2021/06/image-optimization-for-ecommerce-use-banner.jpg')",
        }}
      >
        <div className="bg-black bg-opacity-50 py-4 px-8 rounded-md text-center">
          <h1 className="text-4xl font-bold text-white">Explore Products</h1>
          <p className="text-lg text-gray-300 mt-2">Find the best deals for you!</p>
        </div>
      </section>

      {/* category section  */}
      <div className="flex flex-col md:flex-row">
        <aside className="bg-gray-800 p-6 md:w-1/4">
          <h2 className="text-xl font-semibold mb-4">Categories</h2>
          <ul>
            {/* handling unique category */}
            {uniqueCategories.map((category, index) => (
              <li
                key={index}
                onClick={() => handleCategoryClick(category)}
                className={`py-2 px-4 mb-2 rounded-md cursor-pointer ${
                  selectedCategory === category
                    ? "bg-red-500 text-white"
                    : "bg-gray-700 hover:bg-gray-600 text-gray-300"
                }`}
              >
                {category}
              </li>
            ))}
          </ul>
        </aside>
        {/* product section  */}
        <main className="p-6 md:w-3/4">
          <h2 className="font-bold text-4xl text-center my-8">{heading}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <ProductItem
                key={product.id}
                product={product}
                handleAddToCart={handleAddToCart}
              />
            ))}
          </div>
        </main>
      </div>
      <ToastContainer />
    </div>
  );
};

export default ProductList;
