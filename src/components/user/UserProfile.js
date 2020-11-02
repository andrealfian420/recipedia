import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { firestoreConnect } from 'react-redux-firebase';
import { actionTypes } from 'redux-firestore';
import UserProfileNavbar from '../layout/UserProfileNavbar';
import SignOutLinks from '../layout/SignOutLinks';
import UserProfileSection from './UserProfileSection';
import MyRecipe from '../recipe/MyRecipe';
import ClipLoader from 'react-spinners/ClipLoader';

const UserProfile = (props) => {
  const {
    userId,
    authorProfile,
    recipesCreated,
    removePreviousProfileOnMount,
  } = props;

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    return () => {
      removePreviousProfileOnMount();
    };
  }, [removePreviousProfileOnMount]);

  useEffect(() => {
    setLoading(authorProfile ? false : true);
  }, [authorProfile]);

  if (loading) {
    return (
      <main className="px-16 py-6 bg-gray-100 md:col-span-10">
        {userId ? <UserProfileNavbar /> : <SignOutLinks />}
        <div
          className="flex justify-center items-center w-full"
          style={{ height: '50%' }}
        >
          <ClipLoader size={35} color={'#9EA5A5'} loading={loading} />
        </div>
      </main>
    );
  }

  return (
    <main className="px-16 py-6 bg-gray-100 md:col-span-10">
      {userId ? <UserProfileNavbar /> : <SignOutLinks />}
      <UserProfileSection profile={authorProfile} isOwnProfile={false} />

      <div className="flex flex-col justify-center md:justify-start p-4">
        <h1 className="text-lg md:text-2xl text-center md:text-left mb-3 font-bold">
          Recipes Created
        </h1>

        {recipesCreated?.length ? (
          <MyRecipe myRecipes={recipesCreated} isOwnProfile={false} />
        ) : (
          <div className="text-red-600 text-center md:text-left mt-2 md:mt-3">
            <span>This user have not created any recipe so far..</span>
          </div>
        )}
      </div>
    </main>
  );
};

const mapStateToProps = (state) => {
  const authorProfile = state?.firestore?.ordered?.authorProfile?.[0];
  const recipesCreated = state?.firestore?.ordered?.recipesCreated;
  const userId = state?.firebase?.auth?.uid;

  return {
    userId,
    authorProfile,
    recipesCreated,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    removePreviousProfileOnMount: () =>
      dispatch({
        type: actionTypes.CLEAR_DATA,
        preserve: {
          data: [],
          ordered: ['recipes'],
        },
      }),
  };
};

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  firestoreConnect((props) => {
    return [
      {
        collection: 'recipes',
        where: ['authorId', '==', props.match.params.id],
        orderBy: ['createdAt', 'desc'],
        storeAs: 'recipesCreated',
      },
      {
        collection: 'users',
        doc: props.match.params.id,
        storeAs: 'authorProfile',
      },
    ];
  })
)(UserProfile);
