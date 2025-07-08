import React from "react";
import { Chart } from "react-google-charts";

const TrafficAreaChart = () => {
  const data = [
    ["Day", "Visitors"],
    ["Monday", 120],
    ["Tuesday", 150],
    ["Wednesday", 100],
    ["Thursday", 180],
    ["Friday", 200],
    ["Saturday", 250],
    ["Sunday", 300],
  ];

  const options = {
    title: "Website Traffic (Weekly)",
    hAxis: { title: "Day", titleTextStyle: { color: "#333" } },
    vAxis: { minValue: 0 },
    chartArea: { width: "70%", height: "70%" },
    colors: ["#673ab7"],
  };

  return (
    <div className="bg-white shadow-md p-6 rounded-lg max-w-4xl mx-auto mt-10">
      <h2 className="text-xl font-semibold mb-4 text-center text-purple-600">
        Weekly Website Traffic (Static)
      </h2>
      <Chart chartType="AreaChart" data={data} options={options} width="100%" height="400px" />
    </div>
  );
};

export default TrafficAreaChart;
