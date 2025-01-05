import React from 'react'
import useFetchProducts from './hooks/useFetchProducts';
import {Link} from 'react-router-dom'
import Loading from './Loading';
const ProductCategory = ({category}) => {
    const {products,loading} = useFetchProducts("https://dummyjson.com/products");
    const categories = products.map((c) => c.category);
    const uniqueCategories = [...new Set(categories)];

    return loading ? (
        <Loading/>
      ) : (
        <>
          {/* Categories */}
          <section className="py-16 px-4 text-center">
            <h2 className="text-3xl font-bold mb-12 text-white">
              Browse by Category
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {uniqueCategories.map((c, index) => {
                return (
                  <div
                    key={index}
                    className="bg-gray-800 p-6 rounded-lg text-center"
                  >
                    <img
                      src="https://via.placeholder.com/200"
                      className="w-full h-48 object-cover rounded-md"
                    />
                    <Link to={`/shop?category=${c}`}>
                    <button className="bg-red-500 text-white py-2 px-4 rounded-lg mt-4 hover:bg-red-600">
                      {c}
                    </button>
                    </Link>
                  </div>
                );
              })}
            </div>
          </section>
        </>
      );
}

export default ProductCategory