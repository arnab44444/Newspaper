import React from "react";
import { FaYoutube, FaPodcast, FaInstagram } from "react-icons/fa";

const trendingMedia = [
  {
    title: "MrBeast Breaks Internet with $1M Challenge",
    source: "YouTube",
    image: "https://i.ytimg.com/vi/0e3GPea1Tyg/maxresdefault.jpg",
    icon: <FaYoutube className="text-red-500 text-xl" />,
  },
  {
    title: "The Daily Podcast: AI Will Take Over or Not?",
    source: "Podcast",
    image: "https://i.ibb.co/DfVyyLtz/AI-Today-Podcast.png",
    icon: <FaPodcast className="text-purple-600 text-xl" />,
  },
  {
    title: "Influencer Debates New Voting Law on Live",
    source: "Instagram",
    image: "https://i.ibb.co/k2fFNcKt/brady-bunch-nest-00-00-03-23-still003.jpg",
    icon: <FaInstagram className="text-pink-500 text-xl" />,
  },
];

const TrendingInMedia = () => {
  return (
    <section className="bg-gray-100 py-12 px-4 md:px-10">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-3xl font-bold text-cyan-700 mb-10">
          🔥 Trending in Media
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {trendingMedia.map((item, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-md overflow-hidden transform hover:scale-[1.03] transition duration-300"
            >
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-5 text-left">
                <div className="flex items-center gap-2 mb-2 text-gray-500">
                  {item.icon}
                  <span className="text-sm font-medium">{item.source}</span>
                </div>
                <h3 className="text-lg font-semibold text-gray-800">
                  {item.title}
                </h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrendingInMedia;
