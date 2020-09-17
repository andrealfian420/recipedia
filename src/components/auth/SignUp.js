import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import AuthLinks from './AuthLinks';

const SignUp = () => {
  useEffect(() => {
    document.title = 'Sign Up';
  });

  const [firstName, setFirstName] = useState(null);
  const [lastName, setLastName] = useState(null);
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [confirmPassword, setConfirmPassword] = useState(null);

  const handleFirstNameChange = (e) => {
    setFirstName(e.target.value);
  };

  const handleLastNameChange = (e) => {
    setLastName(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    const userData = {
      firstName,
      lastName,
      email,
      password,
    };

    if (userData.password !== confirmPassword) {
      return console.log('Password Beda');
    }

    console.log(userData);
  };

  return (
    <div className="rounded px-8 pt-6 my-5 md:my-12 w-full max-w-lg h-full bg-white shadow-lg">
      <AuthLinks signUp={true} />

      {/* Form */}
      <form className="flex flex-wrap mt-4" onSubmit={handleFormSubmit}>
        <div className="w-full md:w-1/2 mb-4 pr-2">
          <label
            htmlFor="firstName"
            className="text-gray-700 text-sm font-bold mb-2"
          >
            First Name
          </label>
          <input
            type="text"
            id="firstName"
            className="shadow appearance-none w-full py-2 px-3 text-gray-700 border rounded leading-tight focus:outline-none focus:shadow-outline"
            placeholder="First Name"
            onChange={handleFirstNameChange}
          />
        </div>

        <div className="w-full md:w-1/2 mb-4">
          <label
            htmlFor="lastName"
            className="text-gray-700 text-sm font-bold mb-2"
          >
            Last Name
          </label>
          <input
            type="text"
            id="lastName"
            className="shadow appearance-none w-full py-2 px-3 text-gray-700 border rounded leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Last Name"
            onChange={handleLastNameChange}
          />
        </div>

        <div className="w-full mb-4">
          <label
            htmlFor="email"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Email
          </label>
          <input
            type="email"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="email"
            placeholder="Email"
            onChange={handleEmailChange}
          />
        </div>

        <div className="w-full mb-6">
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

        <div className="w-full mb-6">
          <label
            htmlFor="password_confirm"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Confirm Password
          </label>
          <input
            type="password"
            id="password_confirm"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Confirm Password"
            onChange={handleConfirmPasswordChange}
          />
        </div>

        <div className="grid grid-rows-4 grid-flow-row min-w-full">
          <button
            type="submit"
            className="row-span-2 mx-auto bg-blue-500 hover:bg-blue-600 text-white font-bold rounded-md py-2 px-4 w-6/12 mt-5 transition duration-500 ease-in-out"
          >
            Sign Up
          </button>

          <div className="row-span-2 mx-auto mt-3 text-base font-bold">
            <span className="text-gray-800">Already have an account ? </span>
            <Link
              to="/signin"
              className="align-baseline text-blue-600 hover:text-blue-700 cursor-pointer"
            >
              Sign In
            </Link>
          </div>
        </div>
      </form>
      {/* End of Form */}
    </div>
  );
};

export default SignUp;
