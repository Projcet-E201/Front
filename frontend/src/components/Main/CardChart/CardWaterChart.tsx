import React, { useEffect, useState } from "react";
import { ResponsiveBar } from "@nivo/bar";

const CardWaterChart = ({ waterData }: any) => {
  const data: any = Object.entries(waterData[0]).map(([id, value], index) => ({
    id: `water${index + 1}`,
    water: `W${index + 1}`,
    value,
    color: index % 2 === 0 ? "#C1EAF3" : "#5CC2F2",
  }));

  return (
    <ResponsiveBar
      data={data}
      keys={["value"]}
      indexBy="water"
      margin={{ top: 10, right: 10, bottom: 40, left: 40 }}
      padding={0.2}
      labelTextColor={{ from: "color", modifiers: [["darker", 1.6]] }}
      maxValue={4}
      colors={(bar: any) => bar.data.color}
    />
  );
};

export default CardWaterChart;
