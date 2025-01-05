import FeaturedProduct from "../component/FeaturedProduct";
import ProductCategory from "../component/ProductCategory";
import useFetchProducts from "../component/hooks/useFetchProducts";
import {Link} from 'react-router-dom'
import react from 'react'
import Loading from "../component/Loading";
const Home = () => {
  const {loading} = useFetchProducts()
  return (
    loading?<Loading/>:
    <div className=" text-gray-100">
      {/* Hero Section */}
      <section
        className="bg-cover bg-center h-96 flex items-center justify-center text-center"
        style={{
          backgroundImage:
            "url('https://manipaldigital.info/wp-content/uploads/2021/06/image-optimization-for-ecommerce-use-banner.jpg')",
        }}
      >
        <div className="bg-black bg-opacity-50 p-8 rounded-md">
          <h1 className="text-4xl font-bold text-white mb-4">
            Welcome to SHOPPYGLOBE
          </h1>
          <p className="text-lg text-gray-300 mb-6">
            Your one-stop destination for the best deals on top products
          </p>
          <Link to='/shop'>
          <button className="bg-red-500 text-white py-2 px-6 rounded-lg hover:bg-red-600 transition">
            Shop Now
          </button>
          </Link>
        </div>
      </section>
      <div>
      <ProductCategory/>
      <FeaturedProduct/>
      </div>
    </div>
  );
};

export default Home;
