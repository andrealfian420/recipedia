import React, { useState } from 'react';
import { connect } from 'react-redux';
import UserProfileNavbarLinks from './UserProfileNavbarLinks';

const UserProfileNavbar = (props) => {
  const [showLinks, setShowLinks] = useState(false);
  const { profile } = props;

  const handleClick = () => {
    setShowLinks(!showLinks);
  };

  const handleClickOnBlur = () => {
    setShowLinks(false);
  };

  return (
    <div className="relative">
      {!profile.isEmpty ? (
        <div className="hidden md:flex flex-row md:justify-end items-center">
          <span className="mr-2 font-semibold text-lg">
            {`${profile.firstName} ${profile.lastName}`}
          </span>
          <img
            src={profile.profileImageUrl}
            alt="Timo Werner"
            className="w-12 h-12 object-cover rounded-full border-2 border-gray-300 focus:outline-none cursor-pointer shadow"
            onClick={handleClick}
          />
        </div>
      ) : (
        <p className="hidden md:flex flex-row md:justify-end items-center text-md">
          Loading...
        </p>
      )}
      <UserProfileNavbarLinks showLinks={showLinks} />
      {showLinks ? (
        <div
          className="fixed top-0 right-0 bottom-0 left-0"
          onClick={handleClickOnBlur}
        ></div>
      ) : null}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    profile: state.firebase.profile,
  };
};

export default connect(mapStateToProps)(UserProfileNavbar);
