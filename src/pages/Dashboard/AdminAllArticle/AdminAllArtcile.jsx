import React, { useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { FaCheck, FaTimes, FaStar, FaTrash } from "react-icons/fa";

const AdminAllArticle = () => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();
  const [declineReason, setDeclineReason] = useState("");
  const [modalId, setModalId] = useState(null);

  const { data: articles = [], isLoading } = useQuery({
    queryKey: ["all-articles-admin"],
    queryFn: async () => {
      const res = await axiosSecure.get("/all-articles");
      return res.data;
    },
  });

  const handleApprove = async (id) => {
    await axiosSecure.patch(`/articles/approve/${id}`);
    queryClient.invalidateQueries(["all-articles-admin"]);
    Swal.fire("Approved!", "The article is now visible.", "success");
  };

  const handleMakePremium = async (id) => {
    await axiosSecure.patch(`/articles/premium/${id}`);
    queryClient.invalidateQueries(["all-articles-admin"]);
    Swal.fire("Premium!", "Article marked as premium.", "success");
  };

  const handleDelete = async (id) => {
    const confirm = await Swal.fire({
      title: "Are you sure?",
      text: "This will permanently delete the article.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel",
    });
    if (confirm.isConfirmed) {
      await axiosSecure.delete(`/articles/${id}`);
      queryClient.invalidateQueries(["all-articles-admin"]);
      Swal.fire("Deleted!", "The article has been deleted.", "success");
    }
  };

  const handleDecline = async () => {
    if (!declineReason.trim()) {
      Swal.fire("Error", "Please provide a reason to decline.", "error");
      return;
    }
    await axiosSecure.patch(`/articles/decline/${modalId}`, {
      reason: declineReason,
    });
    setModalId(null);
    setDeclineReason("");
    queryClient.invalidateQueries(["all-articles-admin"]);
    Swal.fire("Declined!", "The article was declined.", "info");
  };

  if (isLoading)
    return <p className="text-center py-8 text-gray-600">Loading articles...</p>;

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h2 className="text-3xl font-extrabold mb-6 text-gray-900">📰 Admin All Articles</h2>
      <div className="overflow-x-auto border rounded-lg shadow">
        <table className="min-w-full table-auto border-collapse">
          <thead className="bg-cyan-200 ">
            <tr>
              <th className="border-b px-4 py-2 text-left text-sm font-semibold text-gray-700 w-12">#</th>
              <th className="border-b px-4 py-2 text-left text-sm font-semibold text-gray-700 min-w-[180px]">Title</th>
              <th className="border-b px-4 py-2 text-left text-sm font-semibold text-gray-700 min-w-[140px]">Author</th>
              <th className="border-b px-4 py-2 text-left text-sm font-semibold text-gray-700 min-w-[180px]">Email</th>
              <th className="border-b px-4 py-2 text-left text-sm font-semibold text-gray-700 w-14">Photo</th>
              <th className="border-b px-4 py-2 text-left text-sm font-semibold text-gray-700 w-28">Date</th>
              <th className="border-b px-4 py-2 text-left text-sm font-semibold text-gray-700 w-20">Status</th>
              <th className="border-b px-4 py-2 text-left text-sm font-semibold text-gray-700 min-w-[140px]">Publisher</th>
              <th className="border-b px-4 py-2 text-center text-sm font-semibold text-gray-700 w-48">Actions</th>
            </tr>
          </thead>
          <tbody>
            {articles.map((article, index) => (
              <tr
                key={article._id}
                className={index % 2 === 0 ? "bg-white" : "bg-cyan-50 hover:bg-cyan-100"}
              >
                <td className="border-b px-4 py-3 text-sm text-gray-700">{index + 1}</td>
                <td className="border-b px-4 py-3 text-sm text-gray-900 font-medium">{article.title}</td>
                <td className="border-b px-4 py-3 text-sm text-gray-700">{article.authorName}</td>
                <td className="border-b px-4 py-3 text-sm text-gray-700 truncate max-w-[180px]" title={article.authorEmail}>
                  {article.authorEmail}
                </td>
                <td className="border-b px-4 py-2">
                  <img
                    src={article.authorPhoto}
                    alt="author"
                    className="w-10 h-10 rounded-full object-cover"
                  />
                </td>
                <td className="border-b px-4 py-3 text-sm text-gray-700 whitespace-nowrap">
                  {new Date(article.postedDate).toLocaleDateString(undefined, {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })}
                </td>
                <td className="border-b px-4 py-3 text-sm font-semibold text-center">
                  <span
                    className={`inline-block px-2 py-1 rounded-full text-xs font-semibold
                      ${
                        article.status === "approved"
                          ? "bg-green-100 text-green-700"
                          : article.status === "pending"
                          ? "bg-yellow-100 text-yellow-700"
                          : article.status === "declined"
                          ? "bg-red-100 text-red-700"
                          : "bg-gray-100 text-gray-700"
                      }
                    `}
                  >
                    {article.status.charAt(0).toUpperCase() + article.status.slice(1)}
                  </span>
                </td>
                <td className="border-b px-4 py-3 text-sm text-gray-700">{article.publisher}</td>
                <td className="border-b px-4 py-3 text-center space-y-2">
                  {article.status === "pending" && (
                    <div className="flex justify-center gap-2 flex-wrap">
                      <button
                        title="Approve Article"
                        onClick={() => handleApprove(article._id)}
                        className="btn btn-xs bg-green-600 hover:bg-green-700 text-white flex items-center gap-1"
                      >
                        <FaCheck /> Approve
                      </button>
                      <button
                        title="Decline Article"
                        onClick={() => setModalId(article._id)}
                        className="btn btn-xs bg-red-600 hover:bg-red-700 text-white flex items-center gap-1"
                      >
                        <FaTimes /> Decline
                      </button>
                    </div>
                  )}
                  <button
                    title="Mark as Premium"
                    onClick={() => handleMakePremium(article._id)}
                    className="btn btn-xs bg-yellow-500 hover:bg-yellow-600 text-white flex items-center gap-1 w-full"
                  >
                    <FaStar /> Premium
                  </button>
                  <button
                    title="Delete Article"
                    onClick={() => handleDelete(article._id)}
                    className="btn btn-xs bg-gray-700 hover:bg-gray-800 text-white flex items-center gap-1 w-full"
                  >
                    <FaTrash /> Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Decline Modal */}
      {modalId && (
        <div className="fixed inset-0 z-50 bg-transparent bg-opacity-60 flex items-center justify-center p-4">
          <div className="bg-gray-200 p-6 rounded-lg shadow-lg w-full max-w-md">
            <h3 className="text-xl font-semibold mb-4">Reason for Decline</h3>
            <textarea
              rows={5}
              className="w-full p-3 border border-gray-300 rounded resize-none focus:outline-none focus:ring-2 focus:ring-cyan-400"
              placeholder="Please provide a reason for declining this article"
              value={declineReason}
              onChange={(e) => setDeclineReason(e.target.value)}
            ></textarea>
            <div className="flex justify-end gap-3 mt-4">
              <button
                className="btn btn-sm bg-gray-300 hover:bg-gray-400 text-gray-800"
                onClick={() => {
                  setModalId(null);
                  setDeclineReason("");
                }}
              >
                Cancel
              </button>
              <button
                className="btn btn-sm bg-red-600 hover:bg-red-700 text-white"
                onClick={handleDecline}
              >
                Submit Decline
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminAllArticle;
