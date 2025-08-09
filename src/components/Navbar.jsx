import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../store/authSlice";
import { persistor } from "../store/index";

const Navbar = () => {
  const isAuthenticated = useSelector((s) => s.auth.isAuthenticated);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    window.localStorage.removeItem("persist:rememberMe");
    persistor.purge();
    navigate("/login");
    console.log(isAuthenticated);
  };

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
          {isAuthenticated ? (
            <>
              <li>
                <Link
                  onClick={handleLogout}
                  className="text-gray-300 hover:text-white"
                  to={"/login"}
                >
                  Logout
                </Link>
              </li>
              <li>
                <Link
                  className=" text-gray-300 hover:text-white"
                  to={"/my-profile"}
                >
                  My Profile
                </Link>
              </li>
            </>
          ) : (
            <li>
              <Link to="/login" className="text-gray-300 hover:text-white">
                Login
              </Link>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
