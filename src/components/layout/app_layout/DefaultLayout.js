import React from 'react';
import Sidebar from '../Sidebar';
import Footer from '../Footer';

export default function DefaultLayout({ component: Component, ...rest }) {
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-12 flex-1">
        <Sidebar />
        <Component {...rest} />
      </div>
      <Footer />
    </>
  );
}
