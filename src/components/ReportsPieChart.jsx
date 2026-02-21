import React from "react";
import { Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";

ChartJS.register(ArcElement, Tooltip, Legend, ChartDataLabels);

const ReportsPieChart = () => {
  const data = {
    labels: ["Income", "Expenses", "Balance"],
    datasets: [
      {
        label: "Amount (₦)",
        data: [50000, 20000, 30000],
        backgroundColor: ["#3B82F6", "#1E40AF", "#60A5FA"],
        borderColor: "transparent", // no border
        borderWidth: 0,
      },
    ],
  };

  const options = {
    plugins: {
      legend: {
        display: false, // hide legend
      },
      tooltip: {
        enabled: false, // hide tooltip
      },
      datalabels: {
        color: "white",
        font: {
          weight: "bold",
          size: 14,
        },
        anchor: "center",
        align: "center",
        formatter: (value, context) => {
          const label = context.chart.data.labels[context.dataIndex]; // get slice label
          return `₦${value.toLocaleString()}\n${label}`; // display amount + label
        },
      },
    },
  };

  return <Pie data={data} options={options} />;
};

export default ReportsPieChart;
