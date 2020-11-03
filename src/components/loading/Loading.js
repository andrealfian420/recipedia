import React from 'react';
import ClipLoader from 'react-spinners/ClipLoader';

export default function Loading({ loading, component }) {
  switch (component) {
    case 'root':
      return (
        <div className="flex justify-center items-center h-48">
          <div className="my-auto">
            <ClipLoader size={20} color={'#9EA5A5'} loading={loading} />
          </div>
        </div>
      );

    case 'homeRecipeCards':
      return (
        <div className="w-full text-center my-5">
          <ClipLoader size={20} color={'#9EA5A5'} loading={loading} />
        </div>
      );

    case 'recipeDetail':
      return (
        <div className="flex justify-center items-center w-full h-full">
          <ClipLoader size={20} color={'#9EA5A5'} loading={loading} />
        </div>
      );

    case 'editRecipe':
      return (
        <div
          className="flex justify-center items-center w-full"
          style={{ height: '50%' }}
        >
          <ClipLoader size={20} color={'#9EA5A5'} loading={loading} />
        </div>
      );

    case 'userProfileNavbar':
      return (
        <div className="hidden md:flex flex-row md:justify-end items-center text-md">
          <ClipLoader size={20} color={'#9EA5A5'} loading={loading} />
        </div>
      );

    case 'ownProfile':
      return (
        <main className="px-16 py-6 bg-gray-100 md:col-span-10">
          <div className="flex justify-center items-center h-48">
            <ClipLoader size={20} color={'#9EA5A5'} loading={loading} />
          </div>
        </main>
      );

    case 'userProfile':
      return (
        <div
          className="flex justify-center items-center w-full"
          style={{ height: '50%' }}
        >
          <ClipLoader size={20} color={'#9EA5A5'} loading={loading} />
        </div>
      );

    default:
      return <ClipLoader size={20} color={'#9EA5A5'} loading={loading} />;
  }
}
