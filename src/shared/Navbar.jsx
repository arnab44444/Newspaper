import React, { useContext, useEffect, useState } from "react";
import Select from "react-select";
import useAxiosSecure from "../hooks/useAxiosSecure";
import { Link, NavLink, useNavigate } from "react-router";
import { AuthContext } from "../provider/AuthProvider";

const Navbar = () => {
  const { user, signOutUser, setUser } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();

  const [userWithRole, setUserWithRole] = useState(null);
  const [isSubscribed, setIsSubscribed] = useState(false);

  // ✅ Fetch user info and check subscription
  useEffect(() => {
    if (user?.email) {
      axiosSecure.get(`/users/${user.email}`).then((res) => {
        const data = res.data;
        setUserWithRole(data);

        const now = new Date();
        if (data?.premiumTaken && new Date(data.premiumTaken) > now) {
          setIsSubscribed(true);
        } else {
          setIsSubscribed(false);
        }
      });
    }
  }, [user]);

  const handleSignOut = () => {
    signOutUser()
      .then(() => {
        console.log("sign out successful");
        setUser(null);
        navigate("/auth/login");
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  const navLinkClass = ({ isActive }) =>
    isActive ? "text-cyan-400 font-semibold" : "text-white hover:text-cyan-300";

  return (
    <div className="sticky top-0 z-50 flex justify-between navbar p-0 bg-black text-white border-b px-8 md:px-12 lg:px-16 xl:px-24 shadow-sm">
      {/* Start Section */}
      <div className="navbar-start">
        <div className="dropdown">
          <div
            tabIndex={0}
            role="button"
            className="cursor-pointer mr-2 lg:hidden md:hidden"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-white"
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
            className="menu menu-sm dropdown-content bg-gray-900 text-white rounded-box z-10 mt-3 w-52 p-2 shadow"
          >
            <li>
              <NavLink to="/" className={navLinkClass}>
                Home
              </NavLink>
            </li>
            <li>
              <NavLink to="/all-articles" className={navLinkClass}>
                All Articles
              </NavLink>
            </li>

            {userWithRole?.role === "admin" && (
            <>
              <li>
                <NavLink to="/add-articles" className={navLinkClass}>
                  Add Articles
                </NavLink>
              </li>

              <li>
                <NavLink to="/my-articles" className={navLinkClass}>
                  My Articles
                </NavLink>
              </li>

              <li>
                <NavLink to="/dashboard" className={navLinkClass}>
                  Dashboard
                </NavLink>
              </li>
              {/* <li>
                <NavLink to="/user-profile" className={navLinkClass}>
                  <img
                    src={user.photoURL}
                    alt="User"
                    className="w-8 h-8 rounded-full border-2 border-white"
                  />
                </NavLink>
              </li> */}
            </>
          )}

          {userWithRole?.role === "user" && (
            <>
              <li>
                <NavLink to="/add-articles" className={navLinkClass}>
                  Add Articles
                </NavLink>
              </li>
              <li>
                <NavLink to="/subscription" className={navLinkClass}>
                  Subscription
                </NavLink>
              </li>
              {isSubscribed && (
                <li>
                  <NavLink to="/premium-article" className={navLinkClass}>
                    Premium Articles
                  </NavLink>
                </li>
              )}
              <li>
                <NavLink to="/my-articles" className={navLinkClass}>
                  My Articles
                </NavLink>
              </li>
              {/* <li>
                <NavLink to="/user-profile" className={navLinkClass}>
                  <img
                    src={user.photoURL}
                    alt="User"
                    className="w-8 h-8 rounded-full border-2 border-white"
                  />
                </NavLink>
              </li> */}
            </>
          )}
          </ul>
        </div>

        {/* Logo */}
        <div className="flex items-center gap-2">
          <h2 className="text-2xl md:text-3xl font-bold bg-cyan-700 bg-clip-text text-transparent tracking-tight">
            VoxNova
          </h2>
        </div>
      </div>

      {/* Center Desktop Menu */}
      <div className="hidden navbar-center md:flex lg:flex">
        <ul className="menu menu-horizontal px-1">
          <li>
            <NavLink to="/" className={navLinkClass}>
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/all-articles" className={navLinkClass}>
              All Articles
            </NavLink>
          </li>

          {userWithRole?.role === "admin" && (
            <>
              <li>
                <NavLink to="/add-articles" className={navLinkClass}>
                  Add Articles
                </NavLink>
              </li>

              <li>
                <NavLink to="/my-articles" className={navLinkClass}>
                  My Articles
                </NavLink>
              </li>

              <li>
                <NavLink to="/dashboard" className={navLinkClass}>
                  Dashboard
                </NavLink>
              </li>
              {/* <li>
                <NavLink to="/user-profile" className={navLinkClass}>
                  <img
                    src={user.photoURL}
                    alt="User"
                    className="w-8 h-8 rounded-full border-2 border-white"
                  />
                </NavLink>
              </li> */}
            </>
          )}

          {userWithRole?.role === "user" && (
            <>
              <li>
                <NavLink to="/add-articles" className={navLinkClass}>
                  Add Articles
                </NavLink>
              </li>
              <li>
                <NavLink to="/subscription" className={navLinkClass}>
                  Subscription
                </NavLink>
              </li>
              {isSubscribed && (
                <li>
                  <NavLink to="/premium-article" className={navLinkClass}>
                    Premium Articles
                  </NavLink>
                </li>
              )}
              <li>
                <NavLink to="/my-articles" className={navLinkClass}>
                  My Articles
                </NavLink>
              </li>
              {/* <li>
                <NavLink to="/user-profile" className={navLinkClass}>
                  <img
                    src={user.photoURL}
                    alt="User"
                    className="w-8 h-8 rounded-full border-2 border-white"
                  />
                </NavLink>
              </li> */}
            </>
          )}
        </ul>
      </div>

      {/* Right Section */}
      <div className="navbar-end flex items-center gap-4">
        {user ? (
          <div className="flex items-center gap-4">
            {/* ✅ User Photo */}
            <NavLink to="/user-profile" className={navLinkClass}>
              <img
                src={user.photoURL}
                alt="User"
                className="w-10 h-10 rounded-full border-2 border-cyan-400"
              />
            </NavLink>

            {/* ✅ Sign Out Button */}
            <button onClick={handleSignOut} className="btn btn-primary">
              Sign Out
            </button>
          </div>
        ) : (
          <>
            <Link to="/auth/login" className="btn  btn-primary">
              Login
            </Link>
            <Link to="/auth/register" className="btn btn-primary">
              Register
            </Link>
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;
