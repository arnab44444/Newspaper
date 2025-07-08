import React from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { Link } from "react-router";

const TrendingAuthors = () => {
  const axiosSecure = useAxiosSecure();

  const { data: articles = [], isLoading } = useQuery({
    queryKey: ["trendingArticles"],
    queryFn: async () => {
      const res = await axiosSecure.get("/trending-articles");
      return res.data;
    },
  });

  if (isLoading)
    return <p className="text-center py-10 text-gray-600">Loading trending authors...</p>;

  return (
    <div className="py-16 px-4 bg-gray-100">
      <h2 className="text-3xl font-bold text-center text-gray-900 mb-10">
        🔥 <span className="text-cyan-700">Trending Writers</span>
      </h2>

      <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
        {articles.map((article) => (
          <div
            key={article._id}
            className="bg-white border border-gray-200 rounded-xl shadow-sm p-6 text-center hover:shadow-md transition"
          >
            <img
              src={article.authorPhoto}
              alt={article.authorName}
              className="w-20 h-20 rounded-full mx-auto mb-4 object-cover border"
            />
            <h3 className="text-lg font-semibold text-gray-800">{article.authorName}</h3>

            <p className="mt-2 text-sm text-gray-600">
              <span className="text-cyan-600 font-medium">Views:</span> {article.views}
            </p>

            <Link
              to={`/articles/${article._id}`}
              className="mt-4 inline-block bg-cyan-700 text-white text-sm px-4 py-2 rounded-lg hover:bg-cyan-800 transition"
            >
              Read Article
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TrendingAuthors;
