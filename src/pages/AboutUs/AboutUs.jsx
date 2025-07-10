import React from "react";

const AboutUs = () => {
  return (
    <section className="bg-white text-gray-800 py-16 px-4">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold text-center text-cyan-700 mb-6">About Us</h2>
        <p className="text-center text-gray-600 max-w-3xl mx-auto mb-12">
          Welcome to <span className="font-bold text-cyan-600">VoxNova</span> – your trusted source for honest and impactful journalism. Our team is dedicated to bringing you reliable news that informs, educates, and inspires.
        </p>

        {/* Mission Section */}
        <div className="mb-12">
          <h3 className="text-2xl font-semibold text-cyan-600 mb-4 text-center">🎯 Our Mission</h3>
          <p className="text-gray-700 text-center max-w-4xl mx-auto">
            We aim to make high-quality journalism accessible to all. From politics and science to entertainment and social issues,
            VoxNova strives to deliver accurate reporting that matters in your everyday life.
          </p>
        </div>

        {/* Core Values */}
        <div className="mt-16">
          <h3 className="text-2xl font-semibold text-cyan-600 mb-6 text-center">🌟 Our Core Values</h3>
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div className="bg-cyan-50 p-6 rounded shadow hover:shadow-md transition">
              <h4 className="text-lg font-bold text-cyan-700 mb-2">Truth</h4>
              <p className="text-sm text-gray-600">
                We prioritize honesty and fact-checking in every report we publish.
              </p>
            </div>
            <div className="bg-cyan-50 p-6 rounded shadow hover:shadow-md transition">
              <h4 className="text-lg font-bold text-cyan-700 mb-2">Independence</h4>
              <p className="text-sm text-gray-600">
                We report without bias and serve the public—not corporate or political agendas.
              </p>
            </div>
            <div className="bg-cyan-50 p-6 rounded shadow hover:shadow-md transition">
              <h4 className="text-lg font-bold text-cyan-700 mb-2">Innovation</h4>
              <p className="text-sm text-gray-600">
                We embrace modern technology to deliver news faster and more efficiently.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;

// final