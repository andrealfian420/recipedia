import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import UserProfileNavbar from '../layout/UserProfileNavbar';

const About = () => {
  useEffect(() => {
    document.title = 'About Page';
  });

  return (
    <div className="px-8 py-6 bg-gray-100 md:col-span-10">
      <UserProfileNavbar />

      <div className="mt-4 py-2 px-4 flex flex-col justify-center items-center">
        <h1 className="text-6xl font-extrabold">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-500 to-red-500">
            RECIPEDIA
          </span>
        </h1>

        <span className="text-md font-semibold text-gray-600 -mt-3">
          a useful website for foodie person
        </span>

        <div className="flex flex-col justify-center text-lg w-full md:w-3/4 text-center mt-8">
          <span>
            This website, especially the{' '}
            <Link
              to="/"
              className="text-blue-600 hover:text-blue-300 transition duration-500 ease-out"
            >
              Homepage
            </Link>{' '}
            is made based on{' '}
            <a
              href="https://www.youtube.com/c/TheNetNinja/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:text-blue-300 transition duration-500 ease-out"
            >
              The Net Ninja's
            </a>{' '}
            Tailwindcss series on{' '}
            <a
              href="https://www.youtube.com/playlist?list=PL4cUxeGkcC9gpXORlEHjc5bgnIi5HEGhw"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:text-blue-300 transition duration-500 ease-out"
            >
              Youtube.
            </a>{' '}
          </span>

          <span className="mt-3">
            The rest of the page and also the features of the page is made by
            myself :)
          </span>

          <div className="mt-6">Stack used on this website :</div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 justify-items-center mt-4">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg"
              alt="React logo"
              className="h-40 w-40"
            />
            <img
              src="https://firebase.google.com/downloads/brand-guidelines/SVG/logo-standard.svg?hl=id"
              alt="Firebase logo"
              className="h-40 w-40"
            />
            <img
              src="https://www.vectorlogo.zone/logos/tailwindcss/tailwindcss-ar21.svg"
              alt="Tailwindcss logo"
              className="h-40 w-40"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
