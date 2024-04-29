import React from "react";
import { useTheme } from "@mui/material";
import { tokens } from "../Page/theme";
import { Bar } from "react-chartjs-2";

const BarChart = ({ isDashboard = false }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const data = {
    labels: ["Hot dog", "Burger", "Sandwich", "Kebab", "Fries", "Donut"],
    datasets: [
      {
        label: "Food",
        data: [12, 19, 3, 5, 2, 3],
        backgroundColor: colors.primary,
        borderColor: colors.primary,
        borderWidth: 1,
      },
    ],
  };

  const options = {
    indexAxis: "y",
    elements: {
      bar: {
        borderWidth: 2,
      },
    },
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: false,
      },
    },
    scales: {
      x: {
        ticks: {
          color: colors.grey[100],
        },
        grid: {
          display: false,
        },
      },
      y: {
        ticks: {
          color: colors.grey[100],
        },
        grid: {
          color: colors.grey[100],
        },
      },
    },
  };
};

export default BarChart;
