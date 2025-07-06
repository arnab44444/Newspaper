import React from 'react';
import { FaArrowLeft } from 'react-icons/fa';
import { Link } from 'react-router';

const ErrorPage = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-base-200 text-center px-4">
      <h1 className="text-7xl font-extrabold text-red-600 mb-4">404</h1>
      <h2 className="text-3xl font-bold mb-2">Page Not Found</h2>
      <p className="mb-6 text-gray-600">
        Sorry, the page you are looking for doesn't exist or has been moved.
      </p>

      <Link to="/" className="btn btn-primary flex items-center gap-2">
        <FaArrowLeft /> Go Back Home
      </Link>

      <img
        src="https://cdn.dribbble.com/users/285475/screenshots/2083086/dribbble_1.gif"
        alt="Error illustration"
        className="w-80 mt-10 rounded-xl shadow-lg"
      />
    </div>
  );
};

export default ErrorPage;