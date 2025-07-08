import React, { useEffect, useState } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { Link } from "react-router";
import { FaLock } from "react-icons/fa";

const PremiumArticles = () => {
  const [articles, setArticles] = useState([]);
  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    axiosSecure
      .get("/articles/premium")
      .then((res) => setArticles(res.data))
      .catch((err) => console.error("Failed to load premium articles", err));
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold text-center text-cyan-600 mb-6">
        🔒 Premium Articles
      </h2>

      {articles.length === 0 ? (
        <p className="text-center text-gray-500">
          No premium articles available.
        </p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {articles.map((article) => (
            <div
              key={article._id}
              className="bg-white border border-cyan-200 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition flex flex-col"
            >
              <img
                src={article.image}
                alt={article.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-4 flex flex-col flex-grow">
                <h3 className="text-xl font-bold text-gray-800">
                  {article.title}
                </h3>
                <p className="text-sm text-gray-500 mt-1">
                  Publisher:{" "}
                  <span className="text-gray-800 font-medium">
                    {article.publisher}
                  </span>
                </p>
                <p className="text-gray-600 text-sm mt-2 line-clamp-3 flex-grow">
                  {article.description}
                </p>
                <Link
                  to={`/articles/${article._id}`}
                  className="mt-4 px-4 py-2 text-center text-white bg-cyan-600 rounded hover:bg-cyan-700 text-sm"
                >
                  Details
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PremiumArticles;
