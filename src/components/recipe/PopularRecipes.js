import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { firestoreConnect } from 'react-redux-firebase';
import PopularRecipesCard from './PopularRecipesCard';
import Loading from '../loading/Loading';

const PopularRecipes = ({ popularRecipes }) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(popularRecipes ? false : true);
  }, [popularRecipes]);

  if (loading) {
    return (
      <>
        <h4 className="font-bold mt-12 pb-2 border-b-4 border-gray-200">
          Most popular recipes
        </h4>

        <Loading loading={loading} component="homeRecipeCards" />
      </>
    );
  }

  return (
    <>
      <h4 className="font-bold mt-12 pb-2 border-b-4 border-gray-200">
        Most popular recipes
      </h4>

      {popularRecipes?.length ? (
        <PopularRecipesCard popularRecipes={popularRecipes} />
      ) : (
        <div className="w-full text-center my-5">
          <span className=" text-md text-red-700">
            No recipe has been really popular so far...
          </span>
        </div>
      )}
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    popularRecipes: state?.firestore?.ordered?.popularRecipes,
  };
};

export default compose(
  connect(mapStateToProps),
  firestoreConnect([
    {
      collection: 'recipes',
      where: ['starsCount', '>', 0],
      orderBy: ['starsCount', 'desc'],
      limit: 3,
      storeAs: 'popularRecipes',
    },
  ])
)(PopularRecipes);
