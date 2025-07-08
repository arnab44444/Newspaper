import React, { useEffect, useState } from "react";
import CountUp from "react-countup";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { FaUser, FaUserShield, FaCrown } from "react-icons/fa";

const DashboardUserStats = () => {
  const axiosSecure = useAxiosSecure();
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axiosSecure.get("/users").then((res) => setUsers(res.data));
  }, [axiosSecure]);

  const totalUsers = users.length;
  const adminUsers = users.filter((u) => u.role === "admin").length;
  const premiumUsers = users.filter(
    (u) => u.premiumTaken && new Date(u.premiumTaken) > new Date()
  ).length;
  const normalUsers = totalUsers - adminUsers;

  const stats = [
    {
      label: "Total Users",
      value: totalUsers,
      icon: <FaUser className="text-5xl text-blue-500" />,
      color: "bg-blue-100",
    },
    {
      label: "Admins",
      value: adminUsers,
      icon: <FaUserShield className="text-5xl text-red-500" />,
      color: "bg-red-100",
    },
    {
      label: "Premium Users",
      value: premiumUsers,
      icon: <FaCrown className="text-5xl text-yellow-500" />,
      color: "bg-yellow-100",
    },
    {
      label: "Normal Users",
      value: normalUsers,
      icon: <FaUser className="text-5xl text-green-500" />,
      color: "bg-green-100",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 p-6 bg-white rounded shadow">
      {stats.map((stat, index) => (
        <div
          key={index}
          className={`flex flex-col items-center p-6 rounded-lg ${stat.color} shadow-md`}
        >
          {stat.icon}
          <h2 className="text-3xl font-bold text-gray-800 mt-2">
            <CountUp end={stat.value} duration={2} />
          </h2>
          <p className="text-gray-600 mt-1 font-medium">{stat.label}</p>
        </div>
      ))}
    </div>
  );
};

export default DashboardUserStats;
