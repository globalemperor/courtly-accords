
import React from 'react';

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="text-center p-10 bg-white rounded-xl shadow-lg transform transition-all hover:scale-105 duration-300">
        <h1 className="text-5xl font-bold mb-6 text-indigo-600">Hello World</h1>
        <p className="text-xl text-gray-600 mb-4">Welcome to my awesome application</p>
        <div className="w-24 h-1 bg-indigo-400 mx-auto rounded-full mb-6"></div>
        <button className="px-6 py-2 bg-indigo-500 text-white rounded-full hover:bg-indigo-600 transition-colors duration-300">
          Get Started
        </button>
      </div>
    </div>
  );
};

export default Index;
