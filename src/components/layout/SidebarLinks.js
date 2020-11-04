import React from 'react';
import { connect } from 'react-redux';
import { signOut } from '../../store/actions/authActions';
import { NavLink, Link } from 'react-router-dom';

const SidebarLinks = ({ showMobileLinks, auth, signOut }) => {
  const handleSignOut = () => {
    signOut();
  };

  return (
    <div
      className={`text-sm mt-6 ${
        !showMobileLinks ? 'hidden' : 'block'
      } md:block`}
    >
      <NavLink
        exact
        to="/"
        className="flex justify-center md:w-full md:justify-end md:items-center text-gray-700 font-bold border-r-4 border-white py-2 px-4"
      >
        <span>Home</span>
        <svg
          viewBox="0 0 20 20"
          fill="currentColor"
          className="home w-6 h-6 ml-3 hidden md:block"
        >
          <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"></path>
        </svg>
      </NavLink>

      <NavLink
        to="/about"
        className="flex px-4 justify-center md:justify-end md:items-center py-2 border-r-4 border-white"
      >
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
      </NavLink>

      <NavLink
        to="!#"
        className="px-4 py-2 flex justify-center md:justify-end md:items-center border-r-4 border-white"
      >
        <span>Contact</span>
        <svg
          viewBox="0 0 20 20"
          fill="currentColor"
          className="mail w-6 h-6 ml-3 hidden md:block"
        >
          <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"></path>
          <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"></path>
        </svg>
      </NavLink>

      {auth ? (
        <>
          <Link
            to="/myprofile"
            className="flex justify-center px-4 py-2 md:hidden"
          >
            <span>Profile</span>
          </Link>

          <Link
            to="/createrecipe"
            className="flex justify-center px-4 py-2 md:hidden"
          >
            <span>Make a recipe</span>
          </Link>

          <span
            className="block text-center px-2 py-1 text-gray-600 cursor-pointer md:hidden"
            onClick={handleSignOut}
          >
            Logout
          </span>
        </>
      ) : (
        <>
          <Link
            to="/signin"
            className="flex justify-center px-4 py-2 md:hidden"
          >
            <span>Sign In</span>
          </Link>

          <Link
            to="/signup"
            className="flex justify-center md:hidden px-4 py-2"
          >
            <span>Sign Up</span>
          </Link>
        </>
      )}
    </div>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    signOut: () => dispatch(signOut()),
  };
};

export default connect(null, mapDispatchToProps)(SidebarLinks);
