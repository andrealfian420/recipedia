import React, { useState, useEffect, useRef } from 'react';
import UserProfileNavbar from '../layout/UserProfileNavbar';
import dummyPic from '../../images/profpic.jpg';

const ProfileInfo = () => {
  useEffect(() => {
    document.title = 'Edit Profile Info';
  });

  const [imageTempURL, setImageTempURL] = useState(null);
  const [firstName, setFirstName] = useState(null);
  const [lastName, setLastName] = useState(null);
  const [oldPassword, setOldPassword] = useState(null);
  const [newPassword, setNewPassword] = useState(null);
  const [confirmPassword, setConfirmPassword] = useState(null);
  const imageInput = useRef();

  // Dummy data, will be removed later on
  const dummyFirstName = 'Timo';
  const dummyLastName = 'Werner';
  const dummyEmail = 'timo@werner.com';

  const handleInputClick = () => {
    return imageInput.current.click();
  };

  const handleImageInput = (e) => {
    const inputtedImage = e.target.files[0];
    setImageTempURL(URL.createObjectURL(inputtedImage));
    /*
    dispatch upload image action from here
    example : dispatch(props.updateImage(inputtedImage, userId))
    */
  };

  const handleFirstNameChange = (e) => {
    setFirstName(e.target.value);
  };

  const handleLastNameChange = (e) => {
    setLastName(e.target.value);
  };

  const handleOldPasswordChange = (e) => {
    setOldPassword(e.target.value);
  };

  const handleNewPasswordChange = (e) => {
    setNewPassword(e.target.value);
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const data = {
      firstName,
      lastName,
      oldPassword,
      newPassword,
      confirmPassword,
    };

    return console.log(data);
  };

  return (
    <main className="px-16 py-6 bg-gray-100 md:col-span-10">
      <UserProfileNavbar />

      <div className="w-full md:w-3/4 py-4 px-2 md:mx-auto bg-white shadow-md md:shadow-lg rounded mt-4 md:mt-8">
        <form className="p-2" onSubmit={handleFormSubmit}>
          <div className="relative flex justify-center">
            <img
              src={imageTempURL ?? dummyPic}
              alt="Profile"
              className="object-cover w-64 h-64 rounded-md border-2 border-white"
            />
            <span
              className="absolute w-64 h-12 py-3 rounded-sm text-center bg-black text-white opacity-50 hover:opacity-75 cursor-pointer"
              style={{ top: '80%' }}
              onClick={handleInputClick}
            >
              Change Photo
            </span>
            <input
              type="file"
              ref={imageInput}
              className="hidden"
              accept="image/png,image/jpg,image/jpeg"
              onChange={handleImageInput}
            />
          </div>
          <div className="flex flex-col px-4 mt-6">
            <label
              htmlFor="email"
              className="inline-block mb-1 md:mb-0 text-center md:text-left text-xl font-semibold"
            >
              Email Address
            </label>
            <input
              type="text"
              id="email"
              className="shadow bg-gray-300 opacity-75 appearance-none border rounded w-full md:w-3/4 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Write your first name here..."
              value={dummyEmail}
              disabled
            />
          </div>
          <div className="flex flex-col px-4 mt-4">
            <label
              htmlFor="firstName"
              className="inline-block mb-1 md:mb-0 text-center md:text-left text-xl font-semibold"
            >
              First Name
            </label>
            <input
              type="text"
              id="firstName"
              className="shadow appearance-none border rounded w-full md:w-3/4 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Write your first name here..."
              defaultValue={firstName ?? dummyFirstName}
              onChange={handleFirstNameChange}
            />
          </div>
          <div className="flex flex-col px-4 mt-4">
            <label
              htmlFor="lastName"
              className="inline-block mb-1 md:mb-0 text-center md:text-left text-xl font-semibold"
            >
              Last Name
            </label>
            <input
              type="text"
              id="lastName"
              className="shadow appearance-none border rounded w-full md:w-3/4 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Write your last name here..."
              defaultValue={lastName ?? dummyLastName}
              onChange={handleLastNameChange}
            />
          </div>
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
              onChange={handleOldPasswordChange}
            />
          </div>
          <div className="flex flex-col px-4 mt-3">
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
            />
          </div>
          <div className="flex flex-col px-4 mt-3">
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
              placeholder="Write your confirm password here..."
              onChange={handleConfirmPasswordChange}
            />
          </div>

          <div className="flex justify-center items-center mt-8">
            <button
              type="submit"
              className="w-48 py-2 text-lg text-white rounded bg-blue-500 hover:bg-blue-700 transition duration-500 ease-out"
            >
              Update Profile
            </button>
          </div>
        </form>
      </div>
    </main>
  );
};

export default ProfileInfo;
