import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import UserProfileNavbar from '../layout/UserProfileNavbar';
import SignOutLinks from '../layout/SignOutLinks';
import UserProfileSection from './UserProfileSection';
import MyRecipe from '../recipe/MyRecipe';

const Profile = (props) => {
  useEffect(() => {
    document.title = 'Profile';
  });

  const { auth } = props;

  return (
    <main className="px-16 py-6 bg-gray-100 md:col-span-10">
      {auth?.uid ? <UserProfileNavbar /> : <SignOutLinks />}
      <UserProfileSection />

      <div className="flex flex-col justify-center md:justify-start p-4">
        <h1 className="text-lg md:text-2xl text-center md:text-left mb-3 font-bold">
          My Recipes
        </h1>

        <MyRecipe />
      </div>
    </main>
  );
};

const mapStateToProps = (state) => {
  return {
    auth: state.firebase.auth,
  };
};

export default connect(mapStateToProps)(Profile);
