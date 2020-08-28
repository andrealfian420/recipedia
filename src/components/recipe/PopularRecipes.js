import React from 'react';
import PopularRecipesCard from './PopularRecipesCard';

const PopularRecipes = () => {
  return (
    <div>
      <h4 className="font-bold mt-12 pb-2 border-b-4 border-gray-200">
        Most popular recipes
      </h4>

      <PopularRecipesCard />
    </div>
  );
};

export default PopularRecipes;
