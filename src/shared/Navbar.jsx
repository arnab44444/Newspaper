import React, { useContext, useEffect, useState } from "react";
import { NavLink, Link, useNavigate } from "react-router";
import { AuthContext } from "../provider/AuthProvider";
import useAxiosSecure from "../hooks/useAxiosSecure";

const Navbar = () => {
  const { user, signOutUser, setUser } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();

  const [userWithRole, setUserWithRole] = useState(null);
  const [isSubscribed, setIsSubscribed] = useState(false);

  // Fetch user role and subscription
  useEffect(() => {
    if (user?.email) {
      axiosSecure.get(`/users/${user.email}`).then((res) => {
        const data = res.data;
        setUserWithRole(data);
        const now = new Date();
        setIsSubscribed(
          data?.premiumTaken && new Date(data.premiumTaken) > now
        );
      });
    }
  }, [user]);

  const handleSignOut = () => {
    signOutUser()
      .then(() => {
        setUser(null);
        navigate("/auth/login");
      })
      .catch((error) => console.log(error.message));
  };

  const navLinkClass = ({ isActive }) =>
    isActive ? "text-cyan-400 font-semibold" : "text-white hover:text-cyan-300";

  return (
    <div className="sticky top-0 z-50 navbar bg-black text-white px-6 md:px-10 lg:px-16 border-b shadow">
      {/* Navbar Start: Logo & Hamburger */}
      <div className="navbar-start">
        <div className="dropdown lg:hidden">
          <div tabIndex={0} role="button" className="btn btn-ghost">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 z-[99] p-3 shadow bg-gray-900 rounded-box w-56"
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
              </>
            )}

            <li>
              <NavLink to="/blog" className={navLinkClass}>
                Blogs
              </NavLink>
            </li>
            <li>
              <NavLink to="/aboutUs" className={navLinkClass}>
                About Us
              </NavLink>
            </li>
          </ul>
        </div>

        <Link to="/" className="text-2xl font-bold text-cyan-400 tracking-wide">
          VoxNova
        </Link>
      </div>

      {/* Navbar Center (only lg) */}
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal gap-4">
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
            </>
          )}

          <li>
            <NavLink to="/blog" className={navLinkClass}>
              Blogs
            </NavLink>
          </li>
          <li>
            <NavLink to="/aboutUs" className={navLinkClass}>
              About Us
            </NavLink>
          </li>
        </ul>
      </div>

      {/* Navbar End: User Profile + Auth */}
      <div className="navbar-end flex items-center gap-4">
        {user ? (
          <div className="flex items-center gap-4">
            <Link to="/user-profile">
              <img
                src={user.photoURL}
                alt="User"
                className="w-10 h-10 rounded-full border-2 border-cyan-400"
              />
            </Link>
            <button onClick={handleSignOut} className="btn btn-sm btn-primary">
              Sign Out
            </button>
          </div>
        ) : (
          <>
            <Link to="/auth/login" className="btn btn-sm btn-primary">
              Login
            </Link>
            <Link to="/auth/register" className="btn btn-sm btn-primary">
              Register
            </Link>
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;
