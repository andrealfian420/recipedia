import React, { useState, useEffect } from 'react';
import { Route } from 'react-router-dom';

// Components
import Sidebar from '../Sidebar';
import Footer from '../Footer';

function DefaultLayout({ component: Component, ...rest }) {
  const [isScroll, setIsScroll] = useState(false);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  });

  const handleScroll = () => {
    if (window.pageYOffset > 1) {
      setIsScroll(true);
    } else {
      setIsScroll(false);
    }
  };

  return (
    <Route
      {...rest}
      render={(props) => (
        <div>
          <div className="text-gray-600 font-body font-semibold min-h-screen flex flex-col">
            <div className="grid grid-cols-1 md:grid-cols-12  flex-grow">
              <Sidebar isScroll={isScroll} />
              <Component {...props} />
            </div>
          </div>
          <Footer />
        </div>
      )}
    />
  );
}

export default DefaultLayout;
