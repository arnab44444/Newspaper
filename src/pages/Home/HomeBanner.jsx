import React from "react";
import { Typewriter } from "react-simple-typewriter";
import { motion } from "framer-motion";
import { NavLink } from "react-router";

const HomeBanner = () => {
  return (
    <div className="relative text-center py-24 md:py-32 bg-gradient-to-r from-gray-100 via-white to-gray-100 overflow-hidden">
      {/* Decorative Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-black via-transparent to-black opacity-5 pointer-events-none" />

      {/* Content */}
      <motion.div
        className="relative z-10"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <h1 className="text-3xl md:text-6xl font-extrabold text-gray-900 leading-tight">
          Welcome to{" "}
          <span className="text-cyan-700">
            <Typewriter
              words={[
                "VoxNova!",
                "Uncover the Truth.",
                "Stay Informed.",
                "Explore Trending Stories.",
                "Experience Premium Journalism.",
              ]}
              loop={0}
              cursor
              cursorStyle="|"
              typeSpeed={60}
              deleteSpeed={40}
              delaySpeed={1500}
            />
          </span>
        </h1>

        <p className="mt-6 text-lg md:text-xl text-gray-600 max-w-2xl mx-auto px-4">
          Your destination for <span className="font-semibold text-gray-800">high-quality</span>,{" "}
          <span className="font-semibold text-gray-800">unbiased</span>, and{" "}
          <span className="font-semibold text-cyan-700">premium journalism</span>.
        </p>

        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 1, duration: 0.6 }}
        >
          <NavLink to='/all-articles'>
            <button className="mt-8 px-6 py-3 bg-cyan-700 hover:bg-cyan-800 text-white rounded-xl shadow-lg transition duration-300">
            Explore Now
          </button>
          </NavLink>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default HomeBanner;
