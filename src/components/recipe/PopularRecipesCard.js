import React from 'react';
import dummyImg from '../../images/seblak.jpg';

const PopularRecipesCard = () => {
  return (
    <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-5 gap-y-5">
      <div className="card hover:shadow-lg">
        <img src={dummyImg} alt="Dummy" loading="lazy" className="card-img" />

        <div className="m-4">
          <a href="!#" className="font-bold hover:underline">
            Sate Taichan
          </a>
          <span className="block text-gray-500 text-sm">
            Recipe by {''}
            <a href="!#" className="text-blue-700 hover:underline">
              Kai Havertz
            </a>
          </span>
        </div>
        <div className="card-badge">
          <svg
            viewBox="0 0 20 20"
            fill="#fae13c"
            className="star w-6 h-6 inline-block"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
          </svg>
          <span>30</span>
        </div>
      </div>
    </div>
  );
};

export default PopularRecipesCard;
