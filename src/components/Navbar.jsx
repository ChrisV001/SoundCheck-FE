import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 w-full bg-gray-800 z-50 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-white text-xl font-bold">
          <Link to="/">SoundCheck</Link>
        </div>
        <ul className="flex space-x-4 list-none">
          <li>
            <Link to="/" className="text-gray-300 hover:text-white">
              Home
            </Link>
          </li>
          <li>
            <Link to="/articles" className="text-gray-300 hover:text-white">
              Articles
            </Link>
          </li>
          <li>
            <Link to="/login" className="text-gray-300 hover:text-white">
              Login
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
