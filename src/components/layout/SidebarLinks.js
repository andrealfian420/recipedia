import React from 'react';
import { Link } from 'react-router-dom';

const SidebarLinks = (props) => {
  const { showMobileLinks } = props;

  return (
    <ul
      className={`text-sm mt-6 ${
        !showMobileLinks ? 'hidden' : 'block'
      } md:block`}
    >
      <li className="text-gray-700 font-bold border-r-4 border-white py-2">
        <a
          href="!#"
          className="flex justify-center md:w-full md:justify-end px-4"
        >
          <span>Home</span>
          <svg
            viewBox="0 0 20 20"
            fill="currentColor"
            className="home w-6 h-6 ml-5 hidden md:block"
          >
            <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"></path>
          </svg>
        </a>
      </li>

      <li className="py-2 border-r-4 border-white">
        <a href="!#" className="flex px-4 justify-center md:justify-end">
          <span>About</span>
          <svg
            viewBox="0 0 20 20"
            fill="currentColor"
            className="question-mark-circle w-6 h-6 ml-3 hidden md:block"
          >
            <path
              fillRule="evenodd"
              d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z"
              clipRule="evenodd"
            ></path>
          </svg>
        </a>
      </li>

      <li className="py-2 border-r-4 border-white">
        <a href="!#" className="flex px-4 justify-center md:justify-end">
          <span>Contact</span>
          <svg
            viewBox="0 0 20 20"
            fill="currentColor"
            className="mail w-6 h-6 ml-3 hidden md:block"
          >
            <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"></path>
            <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"></path>
          </svg>
        </a>
      </li>

      <li className="py-2 md:hidden">
        <Link to="/signin" className="flex px-4 justify-center">
          <span>Sign In</span>
        </Link>
      </li>

      <li className="py-2 md:hidden">
        <Link to="/signup" className="flex px-4 justify-center">
          <span>Sign Up</span>
        </Link>
      </li>
    </ul>
  );
};

export default SidebarLinks;
