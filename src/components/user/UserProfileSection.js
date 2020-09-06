import React from 'react';
import { Link } from 'react-router-dom';
import dummyImg from '../../images/profpic.jpg';

const UserNameSection = () => {
  return (
    <div className="flex flex-col md:flex-row justify-center items-center mt-4 pb-4 md:justify-start border-b-4 border-gray-300">
      <img
        src={dummyImg}
        alt=""
        className="w-48 h-48 rounded-full object-cover object-center border-4 border-white"
      />

      <div className="flex flex-col justify-center items-center md:items-start ml-3">
        <span className="text-3xl md:text-5xl text-center md:text-left font-semibold">
          Timo
        </span>
        <span className="text-3xl md:text-5xl text-center md:text-left font-semibold">
          Werner
        </span>

        <Link
          to="/profileinfo"
          className="text-lg text-center md:text-left text-blue-500 hover:text-blue-700 font-semibold"
        >
          Edit profile information
        </Link>
      </div>
    </div>
  );
};

export default UserNameSection;
