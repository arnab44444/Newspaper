import React from "react";
import { useParams } from "react-router";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { FaClock, FaEye, FaUser, FaTag, FaCheckCircle } from "react-icons/fa";

const ArticleDetails = () => {
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();

  const { data: article, isPending, isError } = useQuery({
    queryKey: ["article", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/articles/${id}`);
      return res.data;
    },
  });

  if (isPending) return <p className="text-center py-10">Loading...</p>;
  if (isError || !article) return <p className="text-center py-10 text-red-500">Failed to load article.</p>;

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <div className="bg-white shadow-xl rounded-lg overflow-hidden border border-gray-200">
        {/* Image */}
        <img src={article.image} alt={article.title} className="w-full h-64 object-cover" />

        {/* Body */}
        <div className="p-6 space-y-4">
          {/* Title */}
          <h2 className="text-3xl font-bold text-gray-800 flex items-center gap-2">
            {article.title}
            {article.isPremium && (
              <span className="text-sm bg-gradient-to-r from-yellow-400 to-yellow-600 text-white px-2 py-1 rounded-full ml-2">
                Premium
              </span>
            )}
          </h2>

          {/* Meta Info */}
          <div className="text-sm text-gray-500 flex flex-wrap items-center gap-4">
            <span className="flex items-center gap-1">
              <FaUser /> {article.authorName}
            </span>
            <span className="flex items-center gap-1">
              <FaClock /> {new Date(article.postedDate).toLocaleDateString()}
            </span>
            <span className="flex items-center gap-1">
              <FaEye /> {article.views} views
            </span>
            <span className="flex items-center gap-1">
              <FaCheckCircle className="text-green-500" />
              {article.publisher}
            </span>
          </div>

          {/* Tags */}
          {article.tags?.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-2">
              {article.tags.map((tag, idx) => (
                <span key={idx} className="bg-cyan-100 text-cyan-700 px-3 py-1 text-xs rounded-full">
                  <FaTag className="inline mr-1" /> {tag}
                </span>
              ))}
            </div>
          )}

          {/* Description */}
          <div className="text-gray-700 leading-relaxed mt-4 text-justify">
            {article.description}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArticleDetails;
