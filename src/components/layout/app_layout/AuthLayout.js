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
          </div>
        </div>
      )}
    />
  );
};

export default AuthLayout;
