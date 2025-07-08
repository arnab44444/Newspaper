import React from "react";
import { Chart } from "react-google-charts";

const ArticlesBarChart = () => {
  const data = [
    ["Month", "Articles"],
    ["January", 8],
    ["February", 12],
    ["March", 5],
    ["April", 15],
    ["May", 10],
    ["June", 18],
  ];

  const options = {
    title: "Articles Published Per Month",
    chartArea: { width: "50%" },
    hAxis: {
      title: "Total Articles",
      minValue: 0,
    },
    vAxis: {
      title: "Month",
    },
    colors: ["#00bcd4"],
  };

  return (
    <div className="bg-white shadow-md p-6 rounded-lg max-w-4xl mx-auto mt-10">
      <h2 className="text-xl font-semibold mb-4 text-center text-cyan-600">
        Monthly Article Statistics (Static)
      </h2>
      <Chart chartType="BarChart" width="100%" height="400px" data={data} options={options} />
    </div>
  );
};

export default ArticlesBarChart;
