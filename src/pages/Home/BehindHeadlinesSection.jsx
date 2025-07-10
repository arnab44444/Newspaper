import React from "react";

const headlines = [
  {
    id: 1,
    title: "Bangladesh Launches Nationwide Digital Voting System",
    category: "Politics",
    author: "Rafsan Jamil",
    date: "July 10, 2025",
    highlights: [
      "Biometric voter ID introduced in 20+ districts",
      "85% voter turnout during by-election",
      "Real-time results via online dashboard",
    ],
  },
  {
    id: 2,
    title: "Dhaka Tops Smart City Rankings in South Asia",
    category: "Technology",
    author: "Farzana Akter",
    date: "July 9, 2025",
    highlights: [
      "Dhaka’s smart surveillance reduces traffic violations by 40%",
      "Public Wi-Fi zones expand to 80% coverage",
      "Ranked #1 for tech-based public safety",
    ],
  },
  {
    id: 3,
    title: "New Renewable Energy Projects Announced",
    category: "Environment",
    author: "Salma Begum",
    date: "July 8, 2025",
    highlights: [
      "Solar farms planned across 5 districts",
      "Government incentives for clean energy",
      "Partnership with international green tech firms",
    ],
  },
  {
    id: 4,
    title: "Education Reform Bill Passed in Parliament",
    category: "Education",
    author: "Mahmud Hassan",
    date: "July 7, 2025",
    highlights: [
      "Increased funding for rural schools",
      "New curriculum standards to be implemented",
      "Focus on digital literacy and critical thinking",
    ],
  },
];

const BehindHeadlinesSection = () => {
  return (
    <section className="py-16 px-4 bg-gray-100">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-center text-cyan-700 mb-10">
          📰 Behind the Headlines
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {headlines.map((news) => (
            <div
              key={news.id}
              className="bg-white border border-gray-200 rounded-lg shadow-sm p-6 transition hover:shadow-lg"
            >
              <div className="mb-4">
                <span className="inline-block bg-cyan-100 text-cyan-700 text-xs font-medium px-3 py-1 rounded-full mb-2">
                  {news.category}
                </span>
                <h3 className="text-xl font-semibold text-gray-800">
                  {news.title}
                </h3>
                <p className="text-sm text-gray-500 mt-1">
                  By {news.author} • {news.date}
                </p>
              </div>

              <ul className="list-disc pl-5 text-gray-700 space-y-1">
                {news.highlights.map((point, idx) => (
                  <li key={idx} className="text-sm">{point}</li>
                ))}
              </ul>

              {/* <div className="text-right mt-4">
                <button className="text-cyan-600 text-sm font-semibold hover:underline">
                  Read Full Analysis →
                </button>
              </div> */}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BehindHeadlinesSection;
