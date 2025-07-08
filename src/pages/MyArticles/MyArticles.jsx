import React, { useContext, useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { AuthContext } from "../../provider/AuthProvider";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { Link } from "react-router";
import { FaEye, FaEdit, FaTrash } from "react-icons/fa";
import Swal from "sweetalert2";

const MyArticles = () => {
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  const [declineReason, setDeclineReason] = useState("");
  const [showReasonModal, setShowReasonModal] = useState(false);

  // ✅ Load user articles
  const { data: articles = [], isPending, isError } = useQuery({
    queryKey: ["myArticles", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/articles/user/${user.email}`);
      return res.data;
    },
  });

  // ✅ Delete article
  const handleDelete = async (id) => {
    const confirm = await Swal.fire({
      title: "Are you sure?",
      text: "You want to delete this article?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
    });

    if (confirm.isConfirmed) {
      try {
        await axiosSecure.delete(`/articles/${id}`);
        await queryClient.invalidateQueries({ queryKey: ["myArticles", user?.email] });
        Swal.fire("Deleted!", "Article has been deleted.", "success");
      } catch (err) {
        Swal.fire("Error", "Failed to delete article", "error");
      }
    }
  };

  const openReasonModal = (reason) => {
    setDeclineReason(reason);
    setShowReasonModal(true);
  };

  if (isPending) return <p className="text-center py-10">Loading articles...</p>;
  if (isError) return <p className="text-center py-10 text-red-500">Failed to load articles.</p>;

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-center text-cyan-600">📄 My Articles</h2>

      <div className="overflow-x-auto">
        <table className="table w-full border border-gray-300">
          <thead className="bg-cyan-100 text-gray-700">
            <tr>
              <th>#</th>
              <th>Title</th>
              <th>Status</th>
              <th>Premium</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {articles.map((article, idx) => (
              <tr key={article._id} className="border-t">
                <td>{idx + 1}</td>
                <td>{article.title}</td>

                <td className="text-sm">
                  {article.status === "declined" ? (
                    <div className="flex items-center gap-2">
                      <span className="text-red-600 font-semibold">Declined</span>
                      {article.declineReason && (
                        <button
                          onClick={() => openReasonModal(article.declineReason)}
                          className="text-blue-600 underline text-xs"
                        >
                          Why?
                        </button>
                      )}
                    </div>
                  ) : article.status === "approved" ? (
                    <span className="text-green-600 font-semibold">Approved</span>
                  ) : (
                    <span className="text-yellow-600 font-semibold">Pending</span>
                  )}
                </td>

                <td>{article.isPremium ? "Yes" : "No"}</td>

                <td className="space-x-2 text-sm">
                  <Link
                    to={`/articles/${article._id}`}
                    className="inline-flex items-center gap-1 text-blue-500 hover:underline"
                  >
                    <FaEye /> Details
                  </Link>
                  <Link
                    to={`/update-article/${article._id}`}
                    className="inline-flex items-center gap-1 text-yellow-500 hover:underline"
                  >
                    <FaEdit /> Update
                  </Link>
                  <button
                    onClick={() => handleDelete(article._id)}
                    className="inline-flex items-center gap-1 text-red-500 hover:underline"
                  >
                    <FaTrash /> Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Decline Reason Modal */}
      {showReasonModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded shadow-md max-w-sm w-full">
            <h3 className="text-lg font-semibold text-red-600 mb-2">Decline Reason</h3>
            <p className="text-gray-700">{declineReason}</p>
            <button
              onClick={() => setShowReasonModal(false)}
              className="mt-4 w-full bg-cyan-600 text-white py-2 rounded hover:bg-cyan-700"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyArticles;
