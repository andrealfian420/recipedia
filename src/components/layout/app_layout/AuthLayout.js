import React from 'react';
import { Route } from 'react-router-dom';

const AuthLayout = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) => (
        <div>
          <div className="bg-gray-200 min-h-screen font-body">
            <div className="flex flex-col justify-center items-center">
              <Component {...props} />
            </div>
            <p className="text-center text-black text-xs -mt-10">
              Copyright Andre Ramadhan 2020
            </p>
          </div>
        </div>
      )}
    />
  );
};

export default AuthLayout;
