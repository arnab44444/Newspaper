import React from "react";
import CountUp from "react-countup";
import { FaUsers, FaUserCheck, FaUserAltSlash } from "react-icons/fa";

const StatsSection = () => {
  const stats = [
    {
      icon: (
        <FaUsers className="text-4xl text-blue-600 group-hover:scale-110 transition-transform" />
      ),
      label: "Total Users",
      value: 120,
    },
    {
      icon: (
        <FaUserCheck className="text-4xl text-green-500 group-hover:scale-110 transition-transform" />
      ),
      label: "Premium Users",
      value: 25,
    },
    {
      icon: (
        <FaUserAltSlash className="text-4xl text-orange-500 group-hover:scale-110 transition-transform" />
      ),
      label: "Normal Users",
      value: 95,
    },
  ];

  return (
    <section className="py-8 px-4 bg-gradient-to-b from-cyan-50 to-white">
      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-6">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="group bg-white/90 backdrop-blur-md p-4 rounded-lg shadow-lg border border-cyan-200 text-center transform transition duration-300 hover:shadow-cyan-400 hover:-translate-y-1"
            style={{ minHeight: "130px" }}
          >
            <div className="mb-2 text-center">{stat.icon}</div>
            <h2 className="text-2xl font-extrabold text-cyan-700">
              <CountUp end={stat.value} duration={2.5} />+
            </h2>
            <p className="mt-1 text-sm font-semibold text-gray-700">
              {stat.label}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default StatsSection;

// update