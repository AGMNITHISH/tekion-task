import React from "react";
import { PieChart, Pie, Cell, Tooltip } from "recharts";
const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

const EmiPieChart = ({ pieData }) => {
  return (
    <>
      <PieChart width={300} height={300}>
        <Pie
          data={pieData}
          nameKey="name"
          dataKey="value"
          cx="50%"
          cy="50%"
          outerRadius={80}
          fill="#8884d8"
          label
        >
          {pieData.map((item, index) => {
            return (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            );
          })}
        </Pie>
        <Tooltip />
      </PieChart>
    </>
  );
};

export default EmiPieChart;
