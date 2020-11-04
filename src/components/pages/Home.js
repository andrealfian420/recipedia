import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import UserProfileNavbar from '../layout/UserProfileNavbar';
import SignOutLinks from '../layout/SignOutLinks';
import Header from '../layout/Header';
import LatestRecipes from '../recipe/LatestRecipes';
import PopularRecipes from '../recipe/PopularRecipes';

const Home = (props) => {
  useEffect(() => {
    document.title = 'Recipedia';
  });

  const { auth } = props;

  return (
    <main className="px-16 py-6 bg-gray-100 md:col-span-10 mt-5 md:mt-0">
      {auth?.uid ? <UserProfileNavbar /> : <SignOutLinks />}
      <Header />
      <LatestRecipes />
      <PopularRecipes />
    </main>
  );
};

const mapStateToProps = (state) => {
  return {
    auth: state.firebase.auth,
  };
};

export default connect(mapStateToProps)(Home);
