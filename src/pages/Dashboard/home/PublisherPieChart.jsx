import React from "react";
import { Chart } from "react-google-charts";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const PublisherPieChart = () => {
  const axiosSecure = useAxiosSecure();

  const { data: distribution = [], isLoading } = useQuery({
    queryKey: ["publisherDistribution"],
    queryFn: async () => {
      const res = await axiosSecure.get("/articles/publisher-distribution");
      return res.data;
    },
  });

  if (isLoading) return <p className="text-center">Loading chart...</p>;

  // ✅ Prepare chart data
  const total = distribution.reduce((acc, cur) => acc + cur.count, 0);

  const chartData = [
    ["Publisher", "Percentage"],
    ...distribution.map((item) => [item._id, (item.count / total) * 100]),
  ];

  return (
    <div className="bg-white shadow-md p-6 rounded-lg max-w-2xl mx-auto mt-10">
      <h2 className="text-xl font-semibold mb-4 text-center text-cyan-600">
        Publication Article Distribution
      </h2>
      <Chart
        chartType="PieChart"
        data={chartData}
        width={"100%"}
        height={"400px"}
        options={{
          title: "Article Share by Publisher (Approved Only)",
          is3D: true,
          slices: {
            0: { color: "#00bcd4" },
            1: { color: "#8e44ad" },
            2: { color: "#f39c12" },
            3: { color: "#e74c3c" },
          },
        }}
      />
    </div>
  );
};

export default PublisherPieChart;
