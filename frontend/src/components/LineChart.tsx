import React from "react";
import { useTheme } from "@mui/material";
import { tokens } from "../Page/theme";
import {
  LineChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

const LineChartComponent = ({
}) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const data = [
    { transportation: "Car", count: 10 },
    { transportation: "Train", count: 20 },
    { transportation: "Bus", count: 30 },
    { transportation: "Bike", count: 15 },
  ];

  return (
    <LineChart
      width={800}
      height={400}
      data={data}
      margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="transportation" />
      <YAxis />
      <Tooltip />
      <Legend />
    </LineChart>
  );
};

export default LineChartComponent;
