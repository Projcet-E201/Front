import React from "react";
import { Pie } from "react-chartjs-2";

type PieData = {
  id: string;
  value: number;
};

type PieChartProps = {
  data: PieData[];
};

const MachinePieChart = ({ data }: PieChartProps) => {
  const chartData = {
    labels: data.map((item) => item.id),
    datasets: [
      {
        data: data.map((item) => item.value),
        backgroundColor: [
          "#0088FE",
          "#00C49F",
          "#FFBB28",
          "#FF8042",
          "#AF19FF",
          "#FF1960",
        ],
        hoverBackgroundColor: [
          "#005BAC",
          "#008772",
          "#D19222",
          "#D15C24",
          "#7E1382",
          "#D1133B",
        ],
      },
    ],
  };

  return (
    <Pie
      data={chartData}
      options={{
        maintainAspectRatio: false,
        // legend: {
        //   position: "bottom",
        // },
      }}
    />
  );
};

export default MachinePieChart;
