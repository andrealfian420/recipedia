import React, { useState, useEffect } from 'react';

const ForgotPassword = () => {
  useEffect(() => {
    document.title = 'Forgot Password';
  });

  const [email, setEmail] = useState(null);

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    console.log(email ?? 'Email Kosong');
  };

  return (
    <div className="rounded bg-white w-full max-w-lg shadow-lg mt-12 pb-5 px-8">
      <div className="text-center p-2 border-b-2 border-gray-200">
        <h1 className="text-2xl text-gray-700 font-semibold">
          Forgot Password
        </h1>
      </div>

      {/* Form */}
      <div className="mt-4" onSubmit={handleFormSubmit}>
        <form>
          <div className="mb-2">
            <label
              htmlFor="email"
              className="block mb-1 text-gray-700 font-bold"
            >
              Email Address
            </label>
            <input
              type="email"
              id="email"
              className="appearance-none shadow focus:outline-none focus:shadow-outline border rounded w-full leading-tight py-2 px-3 mb-1"
              placeholder="Email Address"
              onChange={handleEmailChange}
            />
          </div>

          <div className="my-6 text-center">
            <button
              type="submit"
              className="rounded p-2 bg-blue-500 hover:bg-blue-700 text-white font-semibold transition duration-500 ease-out"
            >
              Reset Password
            </button>
          </div>
        </form>
      </div>
      {/* End of Form */}
    </div>
  );
};

export default ForgotPassword;
