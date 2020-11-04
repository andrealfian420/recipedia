import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import SidebarLinks from './SidebarLinks';

const Sidebar = (props) => {
  const [buttonClicked, setButtonClicked] = useState(false);

  const handleMobileMenu = () => {
    const userClick = !buttonClicked;

    setButtonClicked(userClick);
  };

  return (
    <div
      className={`w-full bg-white fixed md:static z-10 md:z-0 md:col-span-2 md:flex md:justify-end`}
    >
      <nav className="text-right">
        <div className="flex justify-between items-center">
          {/* Page Name */}
          <h1 className="font-bold uppercase p-4 md:border-b-4 border-gray-100">
            <Link to="/" className="hover:text-gray-700">
              Recipedia
            </Link>
          </h1>
          {/* End of Page Name */}
          {/* Menu Button */}
          <div className="px-4 cursor-pointer md:hidden">
            <svg
              viewBox="0 0 20 20"
              fill="currentColor"
              className="menu w-6 h-6"
              onClick={handleMobileMenu}
            >
              <path
                fillRule="evenodd"
                d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                clipRule="evenodd"
              ></path>
            </svg>
          </div>
          {/* End of Menu Button */}
        </div>
        <SidebarLinks showMobileLinks={buttonClicked} />
      </nav>
    </div>
  );
};

export default Sidebar;
