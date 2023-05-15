import React, { useEffect, useState } from "react";
import { ResponsiveBar } from "@nivo/bar";

const CardWaterChart = ({ waterData }: any) => {
  console.log(waterData, "water");

  const data: any = waterData.map((item: any, index: number) => {
    const key = Object.keys(item)[0];
    const value = item[key];

    return {
      id: `W${index + 1}`,
      value,
      color: index % 2 === 0 ? "#C1EAF3" : "#5CC2F2",
    };
  });

  console.log(data, "datadatawater");

  return (
    <ResponsiveBar
      data={data}
      keys={["value"]}
      indexBy="id"
      margin={{ top: 10, right: 10, bottom: 40, left: 40 }}
      padding={0.2}
      labelTextColor={{ from: "color", modifiers: [["darker", 1.6]] }}
      maxValue={4}
      colors={(bar: any) => bar.data.color}
    />
  );
};

export default CardWaterChart;
