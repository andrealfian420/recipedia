import React, { useEffect } from 'react';

import SignOutLinks from '../layout/SignOutLinks';
import UserProfileNavbar from '../layout/UserProfileNavbar';
import Header from '../layout/Header';
import LatestRecipes from '../recipe/LatestRecipes';
import PopularRecipes from '../recipe/PopularRecipes';

const Home = () => {
  useEffect(() => {
    document.title = 'Recipedia';
  });

  return (
    <main className="px-16 py-6 bg-gray-100 md:col-span-10">
      <SignOutLinks />
      {/* <UserProfileNavbar /> */}
      <Header />
      <LatestRecipes />
      <PopularRecipes />
    </main>
  );
};

export default Home;
