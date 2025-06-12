import React from "react";
import { FaBars } from "react-icons/fa";

import PropTypes from "prop-types";

export default function Header({ toggleSidebar }) {
  return (
    <header className="bg-black shadow  flex items-center text-white top-0 left-0 w-full z-50">
      <div className="flex items-center ml-4">
      <FaBars className="text-white mr-4 cursor-pointer" onClick={toggleSidebar} />
       <img
          src="/logo.png"
          alt="Logo"
          className="h-10 w-auto mt-4 mr-2"
          style={{ borderRadius: "50%" }}   
        />
        </div>
        {/* <h1 className="text-2xl font-bold ml-10">Image Classification Dashboard</h1> */}
    </header>
  );
}

Header.propTypes = {
  toggleSidebar: PropTypes.func.isRequired,
};