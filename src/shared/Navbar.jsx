import React, { useEffect, useState, useContext } from "react";
import { Link, NavLink } from "react-router";
import { AuthContext } from "../provider/AuthProvider";

const Navbar = () => {
  const { user, signOutUser, setUser } = useContext(AuthContext);

  // Theme state
  const [theme, setTheme] = useState("light");

  // Load saved theme from localStorage
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") || "light";
    setTheme(savedTheme);
    document.documentElement.setAttribute("data-theme", savedTheme);
  }, []);

  // Toggle theme
  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    document.documentElement.setAttribute("data-theme", newTheme);
    localStorage.setItem("theme", newTheme);
  };

  const handleSignOut = () => {
    signOutUser()
      .then(() => {
        console.log("sign out successful");
        setUser(null);
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  return (
    <div className="sticky top-0 z-50 flex justify-between navbar p-0 bg-green-700 border-b px-8 md:px-12 lg:px-16 xl:px-24 shadow-sm">
      <div className="navbar-start">
        <div className="dropdown">
          <div
            tabIndex={0}
            role="button"
            className="cursor-pointer mr-2 lg:hidden md:hidden"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>

          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
          >
            <li>
              <NavLink
                to="/"
                className={({ isActive }) =>
                  isActive
                    ? " text-indigo-300 dark:text-green-400"
                    : " text-gray-600 dark:text-gray-300"
                }
              >
                Home
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/all-plants"
                className={({ isActive }) =>
                  isActive
                    ? " text-indigo-300 dark:text-green-400"
                    : " text-gray-600 dark:text-gray-300"
                }
              >
                All Plants
              </NavLink>
            </li>

            <li>
              <NavLink
                to="/aboutUs"
                className={({ isActive }) =>
                  isActive
                    ? " text-indigo-300 dark:text-green-400"
                    : " text-gray-600 dark:text-gray-300"
                }
              >
                About Us
              </NavLink>
            </li>

            <li>
              <NavLink
                to="/contactUs"
                className={({ isActive }) =>
                  isActive
                    ? " text-indigo-300 dark:text-green-400"
                    : " text-gray-600 dark:text-gray-300"
                }
              >
                Contact Us
              </NavLink>
            </li>

            <li>
              <NavLink
                to="/blog"
                className={({ isActive }) =>
                  isActive
                    ? " text-indigo-300 dark:text-green-400"
                    : " text-gray-600 dark:text-gray-300"
                }
              >
                Blog
              </NavLink>
            </li>

            {user && (
              <>
                <li>
                  <NavLink
                    to="/dashboard"
                    className={({ isActive }) =>
                      isActive
                        ? " text-indigo-300 dark:text-green-400"
                        : " text-gray-600 dark:text-gray-300"
                    }
                  >
                    Dashboard
                  </NavLink>
                </li>
              </>
            )}
          </ul>
        </div>

        <div className="flex items-center gap-2">
          {/* Leaf Icon or Logo */}
          {/* <img
            src="https://cdn-icons-png.flaticon.com/512/2907/2907513.png" // replace with your logo if needed
            alt="GreenNest Logo"
            className="h-10 w-10"
          /> */}

          {/* Site Title */}
          <h2 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-green-500 via-lime-400 to-green-600 bg-clip-text text-transparent tracking-tight">
            GreenNest
          </h2>
        </div>
      </div>

      <div className="hidden navbar-center md:flex lg:flex">
        <ul className="menu menu-horizontal px-1">
          <li>
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive
                  ? " text-indigo-300 dark:text-green-400"
                  : " text-gray-600 dark:text-gray-300"
              }
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/all-plants"
              className={({ isActive }) =>
                isActive
                  ? " text-indigo-300 dark:text-green-400"
                  : " text-gray-600 dark:text-gray-300"
              }
            >
              All Plants
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/aboutUs"
              className={({ isActive }) =>
                isActive
                  ? " text-indigo-300 dark:text-green-400"
                  : " text-gray-600 dark:text-gray-300"
              }
            >
              About Us
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/contactUs"
              className={({ isActive }) =>
                isActive
                  ? " text-indigo-300 dark:text-green-400"
                  : " text-gray-600 dark:text-gray-300"
              }
            >
              Contact Us
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/blog"
              className={({ isActive }) =>
                isActive
                  ? " text-indigo-300 dark:text-green-400"
                  : " text-gray-600 dark:text-gray-300"
              }
            >
              Blog
            </NavLink>
          </li>

          {user && (
            <>
              <li>
                <NavLink
                  to="/dashboard"
                  className={({ isActive }) =>
                    isActive
                      ? " text-indigo-300 dark:text-green-400"
                      : " text-gray-600 dark:text-gray-300"
                  }
                >
                  Dashboard
                </NavLink>
              </li>
            </>
          )}
        </ul>
      </div>

      <div className="navbar-end flex items-center gap-4">
        {/* 🌙 Theme Toggle Button */}
        <label className="swap swap-rotate">
          <input
            type="checkbox"
            onChange={toggleTheme}
            checked={theme === "dark"}
          />
          {/* Sun Icon */}
          <svg
            className="swap-on fill-current w-6 h-6 text-yellow-400"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <path d="M5 12a7 7 0 1114 0 7 7 0 01-14 0zm7-10v2m0 16v2m10-10h-2M4 12H2m16.95-6.95l-1.414 1.414M6.464 17.536l-1.414 1.414M17.536 17.536l1.414 1.414M6.464 6.464L5.05 5.05" />
          </svg>
          {/* Moon Icon */}
          <svg
            className="swap-off fill-current w-6 h-6 text-gray-800"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <path d="M21 12.79A9 9 0 1111.21 3a7 7 0 109.79 9.79z" />
          </svg>
        </label>

        {user ? (
          <div className="dropdown dropdown-end">
            <label tabIndex="0" className="btn btn-ghost btn-circle avatar">
              <div className="w-10 rounded-full">
                <img
                  src={`${user.photoURL}`}
                  className="w-12 rounded-full"
                  alt=""
                />
              </div>
            </label>
            <ul
              tabIndex="0"
              className="menu menu-sm dropdown-content mt-3 z-[1] p-4 shadow bg-gray-800 text-white rounded-box w-60"
            >
              <li>
                <span className="font-bold text-white">{user.displayName}</span>
              </li>
              <li>
                <span className="text-sm text-gray-400">{user.email}</span>
              </li>
              <li>
                <hr className="my-2 border-gray-600" />
              </li>
              <li>
                <a onClick={handleSignOut} className="btn btn-primary px-3">
                  Sign Out
                </a>
              </li>
            </ul>
          </div>
        ) : (
          <>
            <Link to="/auth/login" className="btn btn-primary px-3">
              Login
            </Link>
            <Link to="/auth/register" className="btn btn-primary px-3">
              Register
            </Link>
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;
