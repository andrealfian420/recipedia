import React from 'react';
import { Link } from 'react-router-dom';

const LatestRecipesCard = ({ recipes }) => {
  const recipesCard = recipes.map((recipe) => {
    return (
      <div className="card hover:shadow-lg" key={recipe.id}>
        <img
          src={recipe.image}
          alt={recipe.title}
          className="card-img"
          loading="lazy"
        />
        <div className="m-4">
          <Link
            to={`/recipe/${recipe.slug}`}
            className="font-bold hover:underline"
          >
            {recipe.title}
          </Link>
          <span className="block text-gray-500 text-sm">
            Recipe by {''}
            <a
              href={`/profile/${recipe.authorId}`}
              className="text-blue-700 hover:underline"
            >
              {recipe.authorFullName}
            </a>
          </span>
        </div>
        <div className="card-badge">
          <svg
            viewBox="0 0 20 20"
            fill="currentColor"
            className="clock w-6 h-6 inline-block"
          >
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
              clipRule="evenodd"
            ></path>
          </svg>
          <span> {recipe.duration}</span>
        </div>
      </div>
    );
  });
  return (
    <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-5 gap-y-5">
      {recipesCard}
    </div>
  );
};

export default LatestRecipesCard;
