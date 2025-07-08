import React from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const AllUsers = () => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  const { data: users = [], isPending, isError } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await axiosSecure.get("/users");
      return res.data;
    },
  });

  const handleMakeAdmin = async (email) => {
    try {
      const res = await axiosSecure.patch(`/users/admin/${email}`);
      if (res.data.message) {
        Swal.fire("Success", res.data.message, "success");
        queryClient.invalidateQueries({ queryKey: ["users"] });
      }
    } catch (err) {
      Swal.fire("Error", "Failed to make admin", "error");
    }
  };

  if (isPending) return <p className="text-center py-10">Loading users...</p>;
  if (isError) return <p className="text-center text-red-500">Error fetching users.</p>;

  return (
    <div className="max-w-5xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-semibold mb-6 text-center text-cyan-600">👥 All Users</h2>

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
            {users.map((user, idx) => (
              <tr key={user._id} className="border-t">
                <td>{idx + 1}</td>
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
    </div>
  );
};

export default AllUsers;
