import React from 'react';
import { Link } from 'react-router-dom';

const SignOutLinks = () => {
  return (
    <div className="hidden md:flex md:justify-end">
      <Link
        to="/signin"
        className="btn border-primary md:border-2 text-primary hover:text-white hover:bg-primary transition duration-500 ease-in-out"
      >
        Sign In
      </Link>
      <Link
        to="/signup"
        className="btn ml-2 border-primary md:border-2 text-primary hover:text-white hover:bg-primary transition duration-500 ease-in-out"
      >
        Sign Up
      </Link>
    </div>
  );
};

export default SignOutLinks;
