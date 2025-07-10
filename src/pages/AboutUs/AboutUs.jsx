import React from "react";

const AboutUs = () => {
  return (
    <section className="bg-white text-gray-800 py-16 px-4">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold text-center text-cyan-700 mb-6">About Us</h2>
        <p className="text-center text-gray-600 max-w-3xl mx-auto mb-12">
          Welcome to <span className="font-bold text-cyan-600">VoxNova</span> – your modern voice of truth. We are a team of passionate journalists, editors, and tech experts committed to delivering accurate, insightful, and fast news in the digital age.
        </p>

        <div className="grid md:grid-cols-2 gap-10 items-center">
          {/* Left: Mission */}
          <div>
            <h3 className="text-2xl font-semibold text-cyan-600 mb-4">🎯 Our Mission</h3>
            <p className="text-gray-700 leading-relaxed">
              VoxNova aims to reshape the way you experience journalism. We prioritize transparency,
              ethics, and accessibility to ensure everyone has access to real stories that matter.
              From politics and science to culture and entertainment, we cover it all with depth and integrity.
            </p>
          </div>

          {/* Right: Image */}
          <img
            src="https://i.postimg.cc/Dz6CWmzN/about-us.jpg"
            alt="About us"
            className="w-full rounded-lg shadow-md"
          />
        </div>

        {/* Our Values */}
        <div className="mt-16">
          <h3 className="text-2xl font-semibold text-cyan-600 mb-6 text-center">🌟 Our Core Values</h3>
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div className="bg-cyan-50 p-6 rounded shadow hover:shadow-md transition">
              <h4 className="text-lg font-bold text-cyan-700 mb-2">Truth</h4>
              <p className="text-sm text-gray-600">We believe honest, fact-based journalism drives a stronger society.</p>
            </div>
            <div className="bg-cyan-50 p-6 rounded shadow hover:shadow-md transition">
              <h4 className="text-lg font-bold text-cyan-700 mb-2">Innovation</h4>
              <p className="text-sm text-gray-600">We use the latest technology to deliver news faster and smarter.</p>
            </div>
            <div className="bg-cyan-50 p-6 rounded shadow hover:shadow-md transition">
              <h4 className="text-lg font-bold text-cyan-700 mb-2">Inclusion</h4>
              <p className="text-sm text-gray-600">We amplify diverse voices and stories from every community.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
