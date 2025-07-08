import React from "react";
import CountUp from "react-countup";
import { FaUsers, FaUserCheck, FaUserAltSlash } from "react-icons/fa";

const StatsSection = () => {
  const stats = [
    {
      icon: (
        <FaUsers className="text-5xl text-blue-600 group-hover:scale-110 transition-transform" />
      ),
      label: "Total Users",
      value: 120, // 👈 Replace with your own static count
    },
    {
      icon: (
        <FaUserCheck className="text-5xl text-green-500 group-hover:scale-110 transition-transform" />
      ),
      label: "Premium Users",
      value: 25,
    },
    {
      icon: (
        <FaUserAltSlash className="text-5xl text-orange-500 group-hover:scale-110 transition-transform" />
      ),
      label: "Normal Users",
      value: 95,
    },
  ];

  return (
    <section className="py-16 px-4 bg-gradient-to-b from-cyan-50 to-white">
      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-8">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="group bg-white/80 backdrop-blur-lg p-6 rounded-xl shadow-md border border-cyan-100 text-center transform transition duration-300 hover:shadow-cyan-200 hover:-translate-y-2"
          >
            <div className="mb-4 text-center">{stat.icon}</div>
            <h2 className="text-3xl font-bold text-cyan-700">
              <CountUp end={stat.value} duration={2.5} />+
            </h2>
            <p className="mt-2 text-base font-semibold text-gray-700">
              {stat.label}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default StatsSection;
