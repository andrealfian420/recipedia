import React from 'react';
import LatestRecipesCard from './LatestRecipesCard';

const LatestRecipes = () => {
  return (
    <div>
      <h4 className="font-bold mt-12 pb-2 border-b-4 border-gray-200">
        Latest recipes
      </h4>

      <LatestRecipesCard />
    </div>
  );
};

export default LatestRecipes;
