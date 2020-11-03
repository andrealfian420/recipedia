import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { firestoreConnect } from 'react-redux-firebase';
import LatestRecipesCard from './LatestRecipesCard';
import Loading from '../loading/Loading';

const LatestRecipes = ({ recipes }) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(recipes ? false : true);
  }, [recipes]);

  if (loading) {
    return (
      <>
        <h4 className="font-bold mt-12 pb-2 border-b-4 border-gray-200">
          Latest recipes
        </h4>

        <Loading loading={loading} component="homeRecipeCards" />
      </>
    );
  }

  return (
    <>
      <h4 className="font-bold mt-12 pb-2 border-b-4 border-gray-200">
        Latest recipes
      </h4>

      {recipes?.length ? (
        <LatestRecipesCard recipes={recipes} />
      ) : (
        <div className="w-full text-center my-5">
          <span className=" text-md text-red-700">
            No recipe has been created
          </span>
        </div>
      )}
    </>
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
