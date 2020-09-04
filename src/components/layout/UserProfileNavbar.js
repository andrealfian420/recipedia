import React, { useState } from 'react';
import dummyPic from '../../images/profpic.jpg';
import UserProfileNavbarLinks from './UserProfileNavbarLinks';

const UserProfileNavbar = () => {
  const [showLinks, setShowLinks] = useState(false);

  const handleClick = () => {
    setShowLinks(!showLinks);
  };

  const handleClickOnBlur = () => {
    setShowLinks(false);
  };

  return (
    <div className="relative">
      <div className="hidden md:flex flex-row md:justify-end items-center">
        <span className="mr-2 font-semibold text-lg">Timo Werner</span>
        <img
          src={dummyPic}
          alt="Timo Werner"
          className="w-12 h-12 object-cover rounded-full border-2 border-gray-300 focus:outline-none cursor-pointer shadow"
          onClick={handleClick}
        />
      </div>
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

export default UserProfileNavbar;
