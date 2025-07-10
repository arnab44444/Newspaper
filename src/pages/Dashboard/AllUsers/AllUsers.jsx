import React, { useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

// paggination done

const AllUsers = () => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10); // ✅ user-selectable page size

  const { data, isPending, isError } = useQuery({
    queryKey: ['allUsers', page, limit],
    queryFn: async () => {
      const res = await axiosSecure.get(`/users-page?page=${page}&limit=${limit}`);
      return res.data;
    }
  });

  const handleMakeAdmin = async (email) => {
    try {
      const res = await axiosSecure.patch(`/users/admin/${email}`);
      if (res.data.message) {
        Swal.fire("Success", res.data.message, "success");
        queryClient.invalidateQueries({ queryKey: ["allUsers", page, limit] });
      }
    } catch (err) {
      Swal.fire("Error", "Failed to make admin", "error");
    }
  };

  if (isPending) return <p className="text-center py-10">Loading users...</p>;
  if (isError) return <p className="text-center text-red-500">Error fetching users.</p>;

  const totalPages = Math.ceil(data.totalUsers / limit);

  return (
    <div className="max-w-6xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold text-cyan-600">👥 All Users</h2>

        {/* ✅ Dropdown to select limit */}
        <div className="flex items-center gap-2">
          <label className="text-sm">Show:</label>
          <select
            className="border rounded p-1"
            value={limit}
            onChange={(e) => {
              setLimit(parseInt(e.target.value));
              setPage(1); // Go back to page 1 when limit changes
            }}
          >
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={15}>15</option>
            <option value={20}>20</option>
          </select>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="table w-full border border-gray-300">
          <thead className="bg-cyan-100 text-gray-700">
            <tr>
              <th>#</th>
              <th>Photo</th>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
            </tr>
          </thead>
          <tbody>
            {data.users.map((user, idx) => (
              <tr key={user._id} className="border-t">
                <td>{(page - 1) * limit + idx + 1}</td>
                <td>
                  <img
                    src={user.photoURL || "https://i.ibb.co/4nrjj30/ai.webp"}
                    alt="User"
                    className="w-10 h-10 rounded-full"
                  />
                </td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>
                  {user.role === "admin" ? (
                    <span className="text-green-600 font-semibold">Admin</span>
                  ) : (
                    <button
                      onClick={() => handleMakeAdmin(user.email)}
                      className="bg-cyan-600 text-white py-1 px-3 rounded hover:bg-cyan-700 text-sm"
                    >
                      Make Admin
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ✅ Pagination Buttons */}
      <div className="flex justify-center mt-6 gap-2 flex-wrap">
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i}
            onClick={() => setPage(i + 1)}
            className={`px-3 py-1 rounded ${page === i + 1 ? "bg-cyan-600 text-white" : "bg-gray-200"}`}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default AllUsers;
