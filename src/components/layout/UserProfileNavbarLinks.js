import React from 'react';
import { Link } from 'react-router-dom';

const UserProfileNavbarLinks = (props) => {
  const { showLinks } = props;
  return (
    <div className="absolute right-0 z-10 hidden mt-2 md:flex flex-row md:justify-end items-center">
      <div
        className={`${
          !showLinks ? 'hidden' : ''
        } rounded-lg bg-white py-2 w-40 shadow-xl`}
      >
        <Link
          to="/profile"
          className="block text-center border-b-2 border-gray-300 px-2 py-1 text-gray-600 hover:text-white hover:bg-primary"
        >
          Profile
        </Link>
        <Link
          to="/createrecipe"
          className="block text-center border-b-2 border-gray-300 px-2 py-1 text-gray-600 hover:text-white hover:bg-primary"
        >
          Make a Recipe
        </Link>
        <a
          href="!#"
          className="block text-center px-2 py-1 text-gray-600 hover:text-white hover:bg-primary"
        >
          Logout
        </a>
      </div>
    </div>
  );
};

export default UserProfileNavbarLinks;
