import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-6xl font-extrabold text-red-500">404</h1>
        <p className="text-2xl text-gray-300 mt-4">Oops! Page not found.</p>
        <p className="text-lg text-gray-400 mt-2">
          The page you're looking for might have been moved or deleted.
        </p>
        <Link
          to="/"
          className="mt-6 inline-block bg-red-500 text-white py-2 px-6 rounded-md hover:bg-red-600 transition duration-300"
        >
          Go Back to Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
