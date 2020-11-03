import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { firestoreConnect } from 'react-redux-firebase';
import UserProfileNavbar from '../layout/UserProfileNavbar';
import UserProfileSection from './UserProfileSection';
import MyRecipe from '../recipe/MyRecipe';
import Loading from '../loading/Loading';

const Profile = ({ profile, myRecipes }) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    document.title = 'Profile';
  });

  useEffect(() => {
    setLoading(profile && myRecipes ? false : true);
  }, [profile, myRecipes]);

  if (loading) {
    return <Loading loading={loading} component="ownProfile" />;
  }

  return (
    <main className="px-16 py-6 bg-gray-100 md:col-span-10">
      <UserProfileNavbar />
      <UserProfileSection profile={profile} isOwnProfile={true} />

      <div className="flex flex-col justify-center md:justify-start p-4">
        <h1 className="text-lg md:text-2xl text-center md:text-left mb-3 font-bold">
          My Recipes
        </h1>

        {myRecipes?.length ? (
          <MyRecipe myRecipes={myRecipes} isOwnProfile={true} />
        ) : (
          <div className="text-red-600 text-center md:text-left mt-2 md:mt-3">
            <span>You haven't created any recipe</span>
          </div>
        )}
      </div>
    </main>
  );
};

const mapStateToProps = (state) => {
  const myRecipes = state?.firestore?.ordered?.myRecipes;

  return {
    profile: state.firebase.profile,
    userId: state.firebase.auth.uid,
    myRecipes,
  };
};

export default compose(
  connect(mapStateToProps),
  firestoreConnect((props) => {
    return [
      {
        collection: 'recipes',
        where: ['authorId', '==', props.userId],
        orderBy: ['createdAt', 'desc'],
        storeAs: 'myRecipes',
      },
    ];
  })
)(Profile);
