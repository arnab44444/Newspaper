import React from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";

const PublishersSection = () => {
  const axiosSecure = useAxiosSecure();

  const { data: publishers = [], isLoading } = useQuery({
    queryKey: ["publishers"],
    queryFn: async () => {
      const res = await axiosSecure.get("/publishers");
      return res.data;
    },
  });

  if (isLoading)
    return <p className="text-center py-6 text-gray-600">Loading publishers...</p>;

  return (
    <section className="bg-gray-50 py-16 px-4">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-10">
          📰 <span className="text-cyan-700">Our Top Publishers</span>
        </h2>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
          {publishers.map((pub) => (
            <div
              key={pub._id}
              className="bg-white border border-gray-200 rounded-lg p-4 text-center shadow-sm hover:shadow-md transition"
            >
              <img
                src={pub.logo}
                alt={pub.name}
                className="w-16 h-16 object-contain mx-auto mb-3"
              />
              <p className="text-gray-800 font-medium text-sm">{pub.name}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PublishersSection;
