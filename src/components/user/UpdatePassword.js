import React, { useState } from 'react';
import { connect } from 'react-redux';
import { updatePassword } from '../../store/actions/authActions';

const UpdatePassword = (props) => {
  const {
    userEmail,
    updatePassword,
    passwordErrorMessage,
    passwordSuccessMessage,
  } = props;
  const [oldPassword, setOldPassword] = useState(null);
  const [newPassword, setNewPassword] = useState(null);
  const [confirmPassword, setConfirmPassword] = useState(null);

  const handleOldPaswordChange = (e) => {
    setOldPassword(e.target.value);
  };

  const handleNewPasswordChange = (e) => {
    setNewPassword(e.target.value);
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
  };

  const handleSubmitNewPassword = (e) => {
    e.preventDefault();

    const userData = { email: userEmail, oldPassword };
    const passwordData = { newPassword, confirmPassword };

    updatePassword(userData, passwordData);
  };

  return (
    <div className="w-full md:w-3/4 py-4 px-2 md:mx-auto bg-white shadow-md md:shadow-lg rounded mt-4 md:mt-8">
      <form className="p-2" onSubmit={handleSubmitNewPassword}>
        <div className="flex flex-col px-4 mt-6">
          <label
            htmlFor="oldPassword"
            className="inline-block mb-1 md:mb-0 text-center md:text-left text-xl font-semibold"
          >
            Old Password
          </label>
          <input
            type="password"
            id="oldPassword"
            className="shadow appearance-none border rounded w-full md:w-3/4 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Write your old password here..."
            onChange={handleOldPaswordChange}
            required
          />
        </div>
        <div className="flex flex-col px-4 mt-4">
          <label
            htmlFor="newPassword"
            className="inline-block mb-1 md:mb-0 text-center md:text-left text-xl font-semibold"
          >
            New Password
          </label>
          <input
            type="password"
            id="newPassword"
            className="shadow appearance-none border rounded w-full md:w-3/4 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Write your new password here..."
            onChange={handleNewPasswordChange}
            required
          />
        </div>

        <div className="flex flex-col px-4 mt-4">
          <label
            htmlFor="confirmPassword"
            className="inline-block mb-1 md:mb-0 text-center md:text-left text-xl font-semibold"
          >
            Confirm Password
          </label>
          <input
            type="password"
            id="confirmPassword"
            className="shadow appearance-none border rounded w-full md:w-3/4 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Write your confirmation password here..."
            onChange={handleConfirmPasswordChange}
            required
          />
        </div>

        <div className="flex flex-col justify-center items-center mt-4">
          {passwordErrorMessage ? (
            <span className="text-lg font-semibold my-2 text-red-700">
              {passwordErrorMessage} !
            </span>
          ) : null}

          {passwordSuccessMessage ? (
            <span className="text-lg font-semibold my-2 text-green-500">
              {passwordSuccessMessage} !
            </span>
          ) : null}

          <button
            type="submit"
            className="w-48 py-2 text-lg text-white rounded bg-blue-500 hover:bg-blue-700 transition duration-500 ease-out"
          >
            Update Password
          </button>
        </div>
      </form>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    userEmail: state.firebase.auth.email,
    passwordErrorMessage: state.auth.passwordErrorMessage,
    passwordSuccessMessage: state.auth.passwordSuccessMessage,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    updatePassword: (userData, passwordData) =>
      dispatch(updatePassword(userData, passwordData)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UpdatePassword);
