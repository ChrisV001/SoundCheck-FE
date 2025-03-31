// src/components/Navbar.jsx
import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="navbar fixed top-0 left-0 w-full bg-white rounded-box shadow-base-300/20 shadow-sm z-50">
      <div className="w-full md:flex md:items-center md:gap-2">
        <div className="flex items-center justify-between">
          <div className="navbar-start items-center justify-between max-md:w-full">
            <Link
              className="link text-base-content link-neutral text-xl font-bold no-underline"
              to="/"
            >
              SoundCheck
            </Link>
            <div className="md:hidden">
              <button
                type="button"
                className="collapse-toggle btn btn-outline btn-secondary btn-sm btn-square"
                data-collapse="#default-navbar-collapse"
                aria-controls="default-navbar-collapse"
                aria-label="Toggle navigation"
              >
                <span className="icon-[tabler--menu-2] collapse-open:hidden size-4"></span>
                <span className="icon-[tabler--x] collapse-open:block hidden size-4"></span>
              </button>
            </div>
          </div>
        </div>
        <div
          id="default-navbar-collapse"
          className="md:navbar-end collapse hidden grow basis-full overflow-hidden transition-all duration-300 max-md:w-full"
        >
          <ul className="menu md:menu-horizontal gap-2 p-0 list-none text-base max-md:mt-2">
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/services">Services</Link>
            </li>
            <li>
              <Link to="/contact">Contact us</Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
