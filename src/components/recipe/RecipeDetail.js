import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { firestoreConnect } from 'react-redux-firebase';
import { actionTypes } from 'redux-firestore';
import UserProfileNavbar from '../layout/UserProfileNavbar';
import SignOutLinks from '../layout/SignOutLinks';
import listChecker from '../../helpers/listChecker';
import {
  giveStarToRecipe,
  removeStarFromRecipe,
} from '../../store/actions/recipeActions';
import Loading from '../loading/Loading';

const RecipeDetail = (props) => {
  const {
    auth,
    recipe,
    removePreviousRecipeOnMount,
    giveStarToRecipe,
    removeStarFromRecipe,
  } = props;

  useEffect(() => {
    return () => {
      removePreviousRecipeOnMount();
    };
  }, [removePreviousRecipeOnMount]);

  const [starGiven, setStarGiven] = useState(false);
  const isStarGiven = recipe?.stars?.some((star) => star === auth?.uid);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setStarGiven(isStarGiven);
  }, [isStarGiven]);

  useEffect(() => {
    setLoading(recipe ? false : true);
  }, [recipe]);

  const handleStarClick = () => {
    if (isStarGiven) {
      removeStarFromRecipe(auth.uid, recipe.id);
    } else {
      giveStarToRecipe(auth.uid, recipe.id);
    }
  };

  if (loading) {
    document.title = 'Loading..';
    return (
      <main className="px-16 py-6 bg-gray-100 md:col-span-10">
        {auth?.uid ? <UserProfileNavbar /> : <SignOutLinks />}
        <Loading loading={loading} component="recipeDetail" />
      </main>
    );
  }

  document.title = recipe.title;
  return (
    <main className="px-16 py-6 bg-gray-100 md:col-span-10">
      {auth?.uid ? <UserProfileNavbar /> : <SignOutLinks />}

      <header>
        <h2 className="text-gray-700 text-center md:text-left text-4xl md:text-6xl font-semibold">
          {recipe.title}
        </h2>
        <h3 className="text-xl md:text-2xl text-center md:text-left font-semibold">
          by {recipe.authorFullName}
        </h3>
      </header>

      <div className="py-2 overflow-hidden">
        <img
          src={recipe.image}
          alt={recipe.title}
          className="recipe-image object-cover w-full h-full md:h-64 rounded-md"
          style={{ height: '60vh' }}
        />
      </div>

      <div className="p-2 my-2">
        <h3 className="text-xl font-bold text-center md:text-left mb-2">
          Ingredients :
        </h3>

        <div
          dangerouslySetInnerHTML={{ __html: listChecker(recipe.ingredients) }}
        />
      </div>

      <div className="p-2">
        <h3 className="text-xl font-bold text-center md:text-left mb-2">
          How to make :
        </h3>

        <div
          className="text-justify"
          dangerouslySetInnerHTML={{ __html: listChecker(recipe.instructions) }}
        />
      </div>

      {auth?.uid ? (
        <div className="flex justify-center items-center mt-6">
          <svg
            viewBox="0 0 20 20"
            fill={!starGiven ? 'currentColor' : '#fae13c'}
            className="star w-12 h-12 cursor-pointer"
            onClick={handleStarClick}
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
          </svg>

          <span>
            {isStarGiven ? 'Star given !' : 'Give this recipe a star !'}
          </span>
        </div>
      ) : null}

      <div className="mt-6 text-center md:text-left text-lg">
        <Link to="/" className="hover:underline">
          &larr; Back to homepage
        </Link>
      </div>
    </main>
  );
};

const mapStateToProps = (state) => {
  const recipe = state?.firestore?.ordered?.recipe?.[0];

  return {
    auth: state.firebase.auth,
    recipe,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    removePreviousRecipeOnMount: () =>
      dispatch({
        type: actionTypes.CLEAR_DATA,
        preserve: {
          data: [],
          ordered: ['recipes'],
        },
      }),
    giveStarToRecipe: (userId, recipeId) =>
      dispatch(giveStarToRecipe(userId, recipeId)),
    removeStarFromRecipe: (userId, recipeId) =>
      dispatch(removeStarFromRecipe(userId, recipeId)),
  };
};

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  firestoreConnect((props) => {
    return [
      {
        collection: 'recipes',
        where: ['slug', '==', props.match.params.slug],
        storeAs: 'recipe',
      },
    ];
  })
)(RecipeDetail);
