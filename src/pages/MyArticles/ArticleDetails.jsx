import React, { useContext, useEffect } from "react";
import { useParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { AuthContext } from "../../provider/AuthProvider";
import { FaClock, FaUser, FaEye } from "react-icons/fa";

const ArticleDetails = () => {
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();
  const { user } = useContext(AuthContext);

  const {
    data: article,
    isPending,
    isError,
    refetch,
  } = useQuery({
    queryKey: ["article", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/articles/${id}`);
      return res.data;
    },
  });

  useEffect(() => {
    if (!article || !user || !article.authorEmail || !user.email) return;

    const viewKey = `viewed_${id}`;
    const lastViewed = localStorage.getItem(viewKey);
    const now = Date.now();
    const oneHour = 60 * 60 * 1000;

    const isAuthor = user.email === article.authorEmail;
    const recentlyViewed = lastViewed && now - parseInt(lastViewed) < oneHour;

    if (!isAuthor && !recentlyViewed) {
      axiosSecure.patch(`/articles/views/${id}`).then(() => {
        localStorage.setItem(viewKey, now.toString());
        refetch();
      });
    }
  }, [article, user, id, axiosSecure, refetch]);

  // useEffect(() => {
  //   if (!article || !user) return;

  //   const viewKey = `viewed_${id}`;
  //   const lastViewed = localStorage.getItem(viewKey);
  //   const now = Date.now();
  //   const oneHour = 60 * 60 * 1000;

  //   const isAuthor = user.email === article.authorEmail;
  //   const recentlyViewed = lastViewed && now - Number(lastViewed) < oneHour;

  //   if (!isAuthor && !recentlyViewed) {
  //     axiosSecure.patch(`/articles/views/${id}`).then(() => {
  //       localStorage.setItem(viewKey, now.toString());
  //       refetch();
  //     });
  //   }
  // }, [article, user, id, axiosSecure, refetch]);

  // useEffect(() => {
  //   if (!article || !user) return;

  //   const isAuthor = user.email === article.authorEmail;
  //   if (isAuthor) return;

  //   axiosSecure
  //     .patch(`/articles/views/${id}`)
  //     .then(() => refetch())
  //     .catch((err) => console.log("View tracking error", err));
  // }, [article, user]);

  if (isPending)
    return (
      <p className="text-center py-10 text-gray-600">Loading article...</p>
    );
  if (isError || !article)
    return <p className="text-center py-10 text-red-600">Article not found.</p>;

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <article className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
        {/* Image */}
        <img
          src={article.image}
          alt={article.title}
          className="w-full h-72 md:h-96 object-cover rounded-t-xl"
          loading="lazy"
        />

        <div className="p-8">
          {/* Title */}
          <h1 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-gray-900 leading-tight mb-6">
            {article.title}
          </h1>

          {/* Meta Data */}
          <div className="flex flex-wrap items-center gap-6 text-gray-500 text-sm md:text-base mb-8">
            <div className="flex items-center gap-2">
              <FaUser className="text-cyan-600" />
              <span className="font-medium text-gray-700">
                {article.authorName}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <FaClock className="text-cyan-600" />
              <time
                dateTime={article.postedDate}
                className="font-medium text-gray-700"
              >
                {new Date(article.postedDate).toLocaleDateString(undefined, {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </time>
            </div>

            <div className="flex items-center gap-2">
              <FaEye className="text-cyan-600" />
              <span className="font-medium text-gray-700">
                {article.views} views
              </span>
            </div>

            <div className="ml-auto text-cyan-700 font-semibold text-sm md:text-base">
              Publisher: {article.publisher}
            </div>
          </div>

          {/* Description */}
          <section className="prose prose-cyan max-w-none text-justify text-gray-800 leading-relaxed">
            <p>{article.description}</p>
          </section>
        </div>
      </article>
    </div>
  );
};

export default ArticleDetails;

// up
