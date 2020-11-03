import React, { useState, useEffect } from 'react';

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
    <>
      <div className="grid grid-cols-1 md:grid-cols-12 flex-grow min-h-screen">
        <Sidebar isScroll={isScroll} />
        <Component {...rest} />
      </div>
      <Footer />
    </>
  );
}

export default DefaultLayout;
