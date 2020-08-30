import React from 'react';

const AuthLinks = (props) => {
  const { signIn, signUp } = props;

  return (
    <ul className="flex justify-center border-b">
      <li className="-mb-px mr-1">
        <a
          href="/signin"
          className={`bg-white inline-block ${
            signIn
              ? 'menu-active cursor-default pointer-events-none'
              : 'text-blue-500 hover:text-blue-700'
          } rounded-t py-2 px-4 font-semibold`}
        >
          Sign In
        </a>
      </li>
      <li className="-mb-px mr-1">
        <a
          href="/signup"
          className={`bg-white inline-block ${
            signUp
              ? 'menu-active cursor-default pointer-events-none'
              : 'text-blue-500 hover:text-blue-700'
          } rounded-t py-2 px-4 font-semibold`}
        >
          Sign Up
        </a>
      </li>
    </ul>
  );
};

export default AuthLinks;
