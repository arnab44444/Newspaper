import React from "react";
import Slider from "react-slick";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useNavigate } from "react-router";
import { motion } from "framer-motion";

const TrendingSlider = () => {
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();

  const { data: trending = [] } = useQuery({
    queryKey: ["trending"],
    queryFn: async () => {
      const res = await axiosSecure.get("/articles/trending");
      return res.data;
    },
  });

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    responsive: [
      {
        breakpoint: 768,
        settings: { slidesToShow: 1 },
      },
    ],
  };

  return (
    <div className="max-w-6xl mx-auto py-16 px-4">
      <h2 className="text-3xl font-extrabold text-center text-gray-900 mb-10">
        🔥 <span className="text-cyan-700">Trending Articles</span>
      </h2>

      <Slider {...settings}>
        {trending.map((article) => (
          <div key={article._id} className="px-3">
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="bg-white border border-gray-200 rounded-2xl shadow-md overflow-hidden flex flex-col h-full transition-all"
            >
              <img
                src={article.image}
                alt={article.title}
                className="h-52 md:h-56 w-full object-cover"
              />
              <div className="p-4 flex flex-col flex-1">
                <h3 className="text-lg font-bold text-gray-800 mb-1 line-clamp-2">
                  {article.title}
                </h3>
                <p className="text-sm text-gray-600">{article.publisher}</p>
                <p className="text-sm text-gray-500 mb-3">
                  Views: <span className="font-bold">{article.views}</span>
                </p>
{/* 
                <button
                  onClick={() => navigate(`/articles/${article._id}`)}
                  className="mt-auto bg-cyan-600 hover:bg-cyan-700 text-white py-2 rounded-lg text-sm transition duration-300"
                >
                  Read More
                </button> */}
              </div>
            </motion.div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default TrendingSlider;
