import React, { useContext } from "react";
import { Link, NavLink, Outlet, useNavigate } from "react-router";
import { FaHome, FaUserEdit, FaSignOutAlt, FaSeedling, FaUsers, FaNewspaper } from "react-icons/fa";
import { AuthContext } from "../provider/AuthProvider";

const DashboardLayout = () => {
  const { user, signOutUser, setUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const activeClass =
    "bg-gradient-to-r from-green-400 to-green-600 text-white font-semibold shadow-lg";

  const handleLogout = async () => {
    try {
      await signOutUser();
      setUser(null);
      navigate("/");
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="drawer lg:drawer-open min-h-screen bg-gradient-to-br from-cyan-50 via-white to-cyan-100">
      <input id="dashboard-drawer" type="checkbox" className="drawer-toggle" />

      {/* Main Content */}
      <div className="drawer-content flex flex-col">
        {/* Mobile Navbar */}
        <div className="navbar  lg:hidden shadow-lg">
          <div className="flex-none">
            <label htmlFor="dashboard-drawer" className="btn btn-square btn-ghost text-black">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 stroke-current"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </label>
          </div>
          <div className="flex-1 px-4 text-xl font-extrabold text-black tracking-tight">Dashboard</div>
        </div>

        {/* Outlet Content */}
        <main className="p-8 bg-white rounded-tl-xl rounded-tr-xl shadow-lg min-h-[calc(100vh-64px)]">
          <Outlet />
        </main>
      </div>

      {/* Sidebar */}
      <div className="drawer-side">
        <label htmlFor="dashboard-drawer" className="drawer-overlay"></label>

        <div className="menu p-6 w-72 max-w-xs bg-black text-white flex flex-col justify-between h-full shadow-xl rounded-tr-xl rounded-br-xl">
          <div>
            <Link to="/" className="block mb-8 px-2">
              <h2 className="text-3xl font-extrabold bg-gradient-to-r from-lime-400 via-green-400 to-green-600 bg-clip-text text-transparent tracking-wide select-none">
                VoxNova
              </h2>
              <p className="text-sm mt-1 text-green-200 select-text">
                Logged in as <span className="font-semibold">{user?.displayName || "Guest"}</span>
              </p>
            </Link>

            {/* Nav Links */}
            <NavLink
              to="/dashboard"
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-md text-lg transition ${
                  isActive ? activeClass : "hover:bg-gray-600 hover:text-white"
                }`
              }
              end
            >
              <FaHome /> Home
            </NavLink>

            <NavLink
              to="/dashboard/add-publishers"
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-md text-lg transition ${
                  isActive ? activeClass : "hover:bg-gray-600 hover:text-white"
                }`
              }
            >
              <FaSeedling /> Add Publishers
            </NavLink>

            <NavLink
              to="/dashboard/all-users"
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-md text-lg transition ${
                  isActive ? activeClass : "hover:bg-gray-600 hover:text-white"
                }`
              }
            >
              <FaUsers /> All Users
            </NavLink>

            <NavLink
              to="/dashboard/admin-all-articles"
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-md text-lg transition ${
                  isActive ? activeClass : "hover:bg-gray-600 hover:text-white"
                }`
              }
            >
              <FaNewspaper /> All Articles
            </NavLink>
          </div>

          {/* Bottom Buttons */}
          <div className="space-y-3">
            {/* <NavLink
              to="/update-profile"
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-md text-lg font-semibold transition ${
                  isActive
                    ? "bg-gradient-to-r from-indigo-400 to-indigo-600 text-white shadow-lg"
                    : "bg-indigo-50 text-indigo-700 hover:bg-indigo-100 hover:text-indigo-900"
                }`
              }
            >
              <FaUserEdit /> Update Profile
            </NavLink> */}

            <button
              onClick={handleLogout}
              className="flex items-center gap-3 px-4 py-3 w-full bg-red-600 text-white font-semibold rounded-md hover:bg-red-700 transition shadow"
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
