import React, { useContext, useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { AuthContext } from "../../provider/AuthProvider";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { Link, useNavigate } from "react-router";
import { FaEye, FaEdit, FaTrash } from "react-icons/fa";
import Swal from "sweetalert2";

const MyArticles = () => {
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();
  const navigate = useNavigate();

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
    <div className="p-6 min-h-[calc(100vh-100px)] py-10">
      <h2 className="text-2xl font-bold mb-6 text-center text-cyan-700">📄 My Articles</h2>

      {articles.length === 0 ? (
        <div className="text-center bg-white shadow-md rounded-lg p-10 max-w-xl mx-auto border">
          <h3 className="text-xl font-semibold text-gray-800 mb-3">No Articles Added Yet</h3>
          <p className="text-gray-600 mb-5">
            Looks like you haven’t published any articles yet. Click below to start writing!
          </p>
          <button
            onClick={() => navigate("/add-articles")}
            className="bg-cyan-700 hover:bg-cyan-800 text-white font-medium px-5 py-2 rounded-md transition"
          >
            ➕ Add Article
          </button>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="table w-full border border-gray-200 rounded-md">
            <thead className="bg-cyan-100 text-gray-700 text-sm uppercase">
              <tr>
                <th>#</th>
                <th>Title</th>
                <th>Status</th>
                <th>Premium</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody className="text-sm text-gray-800">
              {articles.map((article, idx) => (
                <tr key={article._id} className="border-t hover:bg-gray-50">
                  <td>{idx + 1}</td>
                  <td>{article.title}</td>

                  <td>
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

                  <td className="space-x-2">
                    <Link
                      to={`/articles/${article._id}`}
                      className="inline-flex items-center gap-1 text-blue-600 hover:underline"
                    >
                      <FaEye /> View
                    </Link>
                    <Link
                      to={`/update-article/${article._id}`}
                      className="inline-flex items-center gap-1 text-yellow-600 hover:underline"
                    >
                      <FaEdit /> Edit
                    </Link>
                    <button
                      onClick={() => handleDelete(article._id)}
                      className="inline-flex items-center gap-1 text-red-600 hover:underline"
                    >
                      <FaTrash /> Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Decline Reason Modal */}
      {showReasonModal && (
        <div className="fixed inset-0 bg-transparent bg-opacity-50 flex justify-center items-center z-50 px-4">
          <div className="bg-gray-200 p-6 rounded shadow-md max-w-sm w-full">
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
