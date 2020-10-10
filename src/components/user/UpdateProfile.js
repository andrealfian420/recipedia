import React, { useState, useRef } from 'react';
import { connect } from 'react-redux';
import { updateProfile } from '../../store/actions/authActions';

const UpdateProfile = (props) => {
  const { profile, userId, updateProfile, successUpdateProfile } = props;
  const [imageTempURL, setImageTempURL] = useState(null);
  const [firstName, setFirstName] = useState(null);
  const [lastName, setLastName] = useState(null);
  const [newProfileImage, setNewProfileImage] = useState(null);
  const imageInput = useRef();

  const handleInputClick = () => {
    return imageInput.current.click();
  };

  const handleImageInput = (e) => {
    const inputtedImage = e.target.files[0];
    const timeStamp = new Date().getTime();
    const fileName = `${userId}${timeStamp}`;
    setImageTempURL(URL.createObjectURL(inputtedImage));

    const image = {
      fileName,
      image: inputtedImage,
    };

    return setNewProfileImage(image);
  };

  const handleFirstNameChange = (e) => {
    setFirstName(e.target.value);
  };

  const handleLastNameChange = (e) => {
    setLastName(e.target.value);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const newData = {
      newProfileImage: newProfileImage,
      firstName: firstName ?? profile.firstName,
      lastName: lastName ?? profile.lastName,
    };

    return updateProfile(userId, newData);
  };

  return (
    <div className="w-full md:w-3/4 py-4 px-2 md:mx-auto bg-white shadow-md md:shadow-lg rounded mt-4 md:mt-8">
      <form className="p-2" onSubmit={handleFormSubmit}>
        <div className="relative rounded-full w-64 h-64 mx-auto overflow-hidden">
          <img
            src={imageTempURL ?? profile.profileImageUrl}
            alt="Profile"
            className="object-cover w-full h-full"
          />
          <span
            className="absolute w-full  py-3 rounded-sm text-center bg-black text-white opacity-50 hover:opacity-75 cursor-pointer"
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
            defaultValue={profile.email}
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
            defaultValue={firstName ?? profile.firstName}
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
            defaultValue={lastName ?? profile.lastName}
            onChange={handleLastNameChange}
          />
        </div>

        <div className="flex flex-col justify-center items-center mt-4">
          {successUpdateProfile ? (
            <span className="text-lg font-semibold my-2 text-green-500">
              Your profile has been updated !
            </span>
          ) : null}
          <button
            type="submit"
            className="w-48 py-2 text-lg text-white rounded bg-blue-500 hover:bg-blue-700 transition duration-500 ease-out"
          >
            Update Profile
          </button>
        </div>
      </form>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    profile: state.firebase.profile,
    userId: state.firebase.auth.uid,
    successUpdateProfile: state.auth.successUpdateProfile,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    updateProfile: (userId, newData) =>
      dispatch(updateProfile(userId, newData)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UpdateProfile);
