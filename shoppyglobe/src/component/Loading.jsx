import React from 'react';

const Loading = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="flex flex-col items-center">
        <div className="w-16 h-16 border-4 border-blue-500 border-dashed rounded-full animate-spin"></div>
        <p className="text-lg text-blue-700 font-semibold mt-4">
          Loading, please wait...
        </p>
      </div>
    </div>
  );
};

export default Loading;
