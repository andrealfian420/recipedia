import React from 'react';
import ClipLoader from 'react-spinners/ClipLoader';

export default function Loading({ loading, component }) {
  switch (component) {
    case 'root':
      return (
        <div className="flex justify-center align-center h-48">
          <div className="my-auto">
            <ClipLoader size={20} color={'#9EA5A5'} loading={loading} />
          </div>
        </div>
      );

    case 'recipedetail':
      return (
        <div className="flex justify-center items-center w-full h-full">
          <ClipLoader size={20} color={'#9EA5A5'} loading={loading} />
        </div>
      );

    case 'editrecipe':
      return (
        <div
          className="flex justify-center items-center w-full"
          style={{ height: '50%' }}
        >
          <ClipLoader size={20} color={'#9EA5A5'} loading={loading} />
        </div>
      );

    case 'userprofilenavbar':
      return (
        <div className="hidden md:flex flex-row md:justify-end items-center text-md">
          <ClipLoader size={20} color={'#9EA5A5'} loading={loading} />
        </div>
      );

    case 'userprofile':
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
