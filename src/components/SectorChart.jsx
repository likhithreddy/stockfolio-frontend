import React from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { motion } from "framer-motion";

ChartJS.register(ArcElement, Tooltip, Legend);

const chartVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { 
    opacity: 1, 
    scale: 1,
    transition: { duration: 0.6, ease: "easeOut" }
  }
}

const SectorChart = ({ holdings }) => {
  const sectorTotals = {};
  holdings.forEach((h) => {
    const sector = h.sector || "Unknown";
    const value = parseFloat(h.total_value);
    sectorTotals[sector] = (sectorTotals[sector] || 0) + value;
  });

  const labels = Object.keys(sectorTotals);
  const values = Object.values(sectorTotals);

  const data = {
    labels,
    datasets: [
      {
        label: "Total Value",
        data: values,
        backgroundColor: [
          "#3498db",
          "#2ecc71",
          "#f39c12",
          "#e74c3c",
          "#9b59b6",
          "#1abc9c",
        ],
        borderColor: "#fff",
        borderWidth: 2,
      },
    ],
  };

  return (
    <motion.div 
      className="card p-4 mb-4 shadow-sm mx-auto" // Bootstrap card classes, centering
      style={{ maxWidth: "500px" }} // Keep max-width for chart container
      variants={chartVariants}
      initial="hidden"
      animate="visible"
    >
      <h3 className="card-title text-center mb-3">Sector-wise Investment</h3> {/* Bootstrap card title, text-center, margin-bottom */}
      <div className="chart-container"> {/* Responsive container for chart */}
        <Pie data={data} />
      </div>
    </motion.div>
  );
};

export default SectorChart;
