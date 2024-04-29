import React from "react";
import { tokens } from "../Page/theme";
import { useTheme } from "@mui/material";

const PlaceholderChart = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    <div>
      {/* Placeholder text or component */}
    </div>
  );
};

export default PlaceholderChart;
