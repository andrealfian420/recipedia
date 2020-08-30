import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import AuthLinks from './AuthLinks';

const SignIn = () => {
  useEffect(() => {
    document.title = 'Sign In';
  });

  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);

  const handleEmailChange = (e) => {
    return setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    return setPassword(e.target.value);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    const userData = {
      email,
      password,
    };

    console.log(userData);
  };

  return (
    <div className="rounded px-8 pt-6 my-12 pb-5 w-full max-w-lg bg-white shadow-lg">
      <AuthLinks signIn={true} />

      {/* Form */}
      <form className="mt-4" onSubmit={handleFormSubmit}>
        <div className="mb-4">
          <label
            htmlFor="email"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Email"
            onChange={handleEmailChange}
          />
        </div>
        <div className="mb-6">
          <label
            htmlFor="password"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Password
          </label>
          <input
            type="password"
            id="password"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Password"
            onChange={handlePasswordChange}
          />
        </div>

        <div className="grid grid-rows-4 grid-flow-row min-w-full">
          <button
            type="submit"
            className="row-span-2 mx-auto text-center bg-blue-500 hover:bg-blue-600 text-white font-bold rounded-md py-2 px-4 w-6/12 mt-5 transition duration-500 ease-in-out"
          >
            Sign In
          </button>
          <Link
            to="/resetpassword"
            className="row-span-2 align-baseline mx-auto mt-3 font-bold text-blue-600 hover:text-blue-700 cursor-pointer text-base"
          >
            Forgot Password ?
          </Link>
        </div>
      </form>
      {/* End of Form */}
    </div>
  );
};

export default SignIn;
