import React from 'react';

const AuthLayout = ({ component: Component, ...rest }) => {
  return (
    <div className="bg-gray-200 min-h-screen font-body">
      <div className="flex flex-col justify-center items-center">
        <Component {...rest} />
      </div>
    </div>
  );
};

export default AuthLayout;
