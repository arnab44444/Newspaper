import React, { useContext } from "react";
import { Link, NavLink, Outlet, useNavigate } from "react-router";
import { FaHome, FaUserEdit, FaSignOutAlt, FaSeedling } from "react-icons/fa";
import { AuthContext } from "../provider/AuthProvider";

const DashboardLayout = () => {
  const { user, signOutUser, setUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const activeClass = "bg-indigo-100 text-indigo-700 font-semibold rounded-md";

  const handleLogout = async () => {
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
    <div className="drawer lg:drawer-open min-h-screen">
      <input id="dashboard-drawer" type="checkbox" className="drawer-toggle" />

      <div className="drawer-content flex flex-col">
        {/* Mobile Navbar */}
        <div className="navbar bg-green-500 lg:hidden shadow-md">
          <div className="flex-none">
            <label
              htmlFor="dashboard-drawer"
              className="btn btn-square btn-ghost"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 stroke-current"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </label>
          </div>
          <div className="flex-1 px-2 text-xl font-bold text-white">
            Dashboard
          </div>
        </div>

        {/* Outlet Content */}
        <main className="p-6 bg-base-100 min-h-[calc(100vh-64px)]">
          <Outlet />
        </main>
      </div>

      {/* Sidebar */}
      <div className="drawer-side">
        <label htmlFor="dashboard-drawer" className="drawer-overlay"></label>

        <div className="menu p-4 w-72 max-w-xs bg-green-800 text-base-content border-r border-gray-300 flex flex-col justify-between h-full">
          <div>
            <div className="mb-6 px-2">
              <Link to="/">
                <h2 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-green-500 via-lime-400 to-green-600 bg-clip-text text-transparent tracking-tight">GreenNest</h2>
              </Link>
              <p className="text-sm text-gray-200 mt-1">
                Logged in as{" "}
                <span className="font-semibold">{user?.displayName}</span>
              </p>
            </div>

            <NavLink
              to="/dashboard"
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-2 hover:bg-indigo-50 hover:text-black rounded-md ${
                  isActive ? activeClass : ""
                }`
              }
            >
              <FaHome /> Home
            </NavLink>

            <NavLink
              to="/dashboard/add-publishers"
              className={({ isActive }) =>
                `px-4 py-2 rounded-md flex items-center gap-3 hover:bg-indigo-50 hover:text-black ${
                  isActive ? activeClass : ""
                }`
              }
            >
              <FaSeedling /> Add Publishers
            </NavLink>

            {/* <NavLink
              to="/dashboard/add-plants"
              className={({ isActive }) =>
                `px-4 py-2 rounded-md flex items-center gap-3 hover:bg-indigo-50 hover:text-black ${
                  isActive ? activeClass : ""
                }`
              }
            >
              <FaSeedling /> Add Plants
            </NavLink>

            <NavLink
              to="/dashboard/all-plants"
              className={({ isActive }) =>
                `px-4 py-2 rounded-md flex items-center gap-3 hover:bg-indigo-50 hover:text-black ${
                  isActive ? activeClass : ""
                }`
              }
            >
              <FaSeedling /> All Plants
            </NavLink>

            <NavLink
              to={`/dashboard/my-plants/${user?.email}`}
              className={({ isActive }) =>
                `px-4 py-2 rounded-md flex items-center gap-3 hover:bg-indigo-50 hover:text-black ${
                  isActive ? activeClass : ""
                }`
              }
            >
              My Plants
            </NavLink> */}
          </div>

          {/* Bottom Buttons */}
          <div className="space-y-2 mt-6">
            <NavLink
              to="/dashboard/update-profile"
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-2 w-full rounded-md font-semibold transition-all duration-200
      ${
        isActive
          ? "bg-indigo-100 text-indigo-700"
          : "bg-indigo-50 text-black hover:bg-indigo-100"
      }`
              }
            >
              <FaUserEdit /> Update Profile
            </NavLink>

            <button
              onClick={handleLogout}
              className="flex items-center gap-3 px-4 py-2 w-full bg-red-100 text-red-700 font-semibold rounded-md hover:bg-red-200 transition-all duration-200"
            >
              <FaSignOutAlt /> Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
