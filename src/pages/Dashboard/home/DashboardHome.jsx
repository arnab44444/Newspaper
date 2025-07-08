import React, { use } from "react";
import { FaCheckCircle, FaLeaf } from "react-icons/fa";
import PublicationPieChart from "./PublisherPieChart";
import ArticlesBarChart from "./ArticlesBarChart";
import TrafficAreaChart from "./TrafficAreaChart";
import { AuthContext } from "../../../provider/AuthProvider";
import DashboardUserStats from "./DashboardUserStats";

const DashboardHome = () => {
  const { user } = use(AuthContext);

  return (
    <div className="bg-gradient-to-br from-green-50 to-white min-h-screen py-10 px-4">

      <h2 className="text-center my-5 text-2xl font-bold">Welcome to Dashboard</h2>

      {/* Charts Section */}
      <DashboardUserStats></DashboardUserStats>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 max-w-7xl mx-auto mb-12">
        <PublicationPieChart />
        <ArticlesBarChart />
        <TrafficAreaChart />
      </div>

      {/* Profile Section */}
      <h2 className="text-3xl font-bold text-center text-cyan-700 mb-6 flex items-center justify-center gap-2">
        <FaLeaf className="text-green-500" /> My Profile
      </h2>

      <div className="max-w-4xl mx-auto bg-white/70 backdrop-blur-md border border-green-200 rounded-2xl shadow-2xl p-6 flex flex-col sm:flex-row items-center gap-6">
        <img
          src={user?.photoURL || "https://i.ibb.co/ZYW3VTp/brown-brim.png"}
          alt="User"
          className="w-28 h-28 sm:w-32 sm:h-32 rounded-full object-cover border-4 border-cyan-200 shadow-lg"
        />

        <div className="flex-1 space-y-2">
          <p className="text-2xl font-semibold text-green-800">
            {user?.displayName || "Unknown User"}
          </p>
          <p className="text-sm text-gray-700">
            <span className="font-medium">📧 Email:</span> {user?.email}
          </p>
          <p className="text-sm text-gray-700">
            <span className="font-medium">👤 Account Type:</span> Regular User
          </p>
          <p className="text-sm text-gray-700">
            <span className="font-medium">📅 Member Since:</span> June 2024
          </p>
          <p className="text-sm text-gray-700 flex items-center gap-2">
            <span className="font-medium">✅ Status:</span>
            <span className="text-green-600 font-semibold">Verified</span>
            <FaCheckCircle className="text-green-500" />
          </p>
        </div>
      </div>
    </div>
  );
};

export default DashboardHome;
