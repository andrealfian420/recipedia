import React from 'react';
import { Link } from 'react-router-dom';

const AuthLinks = (props) => {
  const { signIn, signUp } = props;

  return (
    <ul className="flex justify-center border-b">
      <li className="-mb-px mr-1">
        <Link
          to="/signin"
          className={`bg-white inline-block ${
            signIn
              ? 'menu-active cursor-default pointer-events-none'
              : 'text-blue-500 hover:text-blue-700'
          } rounded-t py-2 px-4 font-semibold`}
        >
          Sign In
        </Link>
      </li>
      <li className="-mb-px mr-1">
        <Link
          to="/signup"
          className={`bg-white inline-block ${
            signUp
              ? 'menu-active cursor-default pointer-events-none'
              : 'text-blue-500 hover:text-blue-700'
          } rounded-t py-2 px-4 font-semibold`}
        >
          Sign Up
        </Link>
      </li>
    </ul>
  );
};

export default AuthLinks;
