
import React from 'react';
import { NavLink } from 'react-router-dom';
import { LogoIcon } from '../components/Icons';

const NotFoundPage: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center text-center py-20">
      <LogoIcon className="w-24 h-24 text-brand-red mb-4" />
      <h1 className="text-6xl font-extrabold text-white font-display">404</h1>
      <h2 className="text-3xl font-bold text-gray-300 mt-2">Page Not Found</h2>
      <p className="mt-4 text-lg text-gray-400 max-w-md">
        Sorry, the page you are looking for does not exist or has been moved.
      </p>
      <NavLink
        to="/"
        className="mt-8 bg-brand-red text-white font-bold py-3 px-8 rounded-full text-lg hover:bg-red-700 transition-transform transform hover:scale-105"
      >
        Go Back Home
      </NavLink>
    </div>
  );
};

export default NotFoundPage;