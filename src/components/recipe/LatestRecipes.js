import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { firestoreConnect } from 'react-redux-firebase';
import LatestRecipesCard from './LatestRecipesCard';

const LatestRecipes = ({ recipes }) => {
  return (
    <div>
      <h4 className="font-bold mt-12 pb-2 border-b-4 border-gray-200">
        Latest recipes
      </h4>

      {recipes ? (
        <LatestRecipesCard recipes={recipes} />
      ) : (
        <div className="w-full text-center my-5">
          <span className=" text-md text-red-700">
            No recipe has been created
          </span>
        </div>
      )}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    recipes: state.firestore.ordered.recipes,
  };
};

export default compose(
  connect(mapStateToProps),
  firestoreConnect([
    {
      collection: 'recipes',
      orderBy: ['createdAt', 'desc'],
      limit: 6,
      storeAs: 'recipes',
    },
  ])
)(LatestRecipes);
