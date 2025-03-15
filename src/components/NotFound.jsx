import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
      <div className="text-center px-4 py-10 max-w-md">
        <div className="mb-6">
          <svg 
            className="mx-auto h-24 w-24 text-gray-400" 
            xmlns="http://www.w3.org/2000/svg" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" 
            />
          </svg>
        </div>
        
        <h1 className="text-5xl font-bold text-gray-800 mb-4">404</h1>
        <h2 className="text-2xl font-semibold text-gray-700 mb-3">Page Not Found</h2>
        <p className="text-gray-600 mb-8">
          We couldn't find the page you're looking for. It might have been removed, renamed, 
          or it never existed.
        </p>
        
        <div className="space-y-4">
          <Link to="/" className="block w-full cursor-pointer bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-md transition duration-300">
            Return to Home
          </Link>
          <button 
            onClick={() => window.history.back()} 
            className="block w-full cursor-pointer bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 font-medium py-3 px-4 rounded-md transition duration-300"
          >
            Go Back
          </button>
        </div>
      </div>
      
      <div className="mt-8 text-center">
        <p className="text-sm text-gray-500">
          Need help finding something? Contact our support team.
        </p>
      </div>
    </div>
  );
};

export default NotFound;