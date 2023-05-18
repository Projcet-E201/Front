import React, { useEffect, useState } from "react";
import { ResponsiveBar } from "@nivo/bar";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";

type SensorBarChartProps = {
  data: any[];
  sensor: string;
};

const SensorHorizontalBarChart = ({ data, sensor }: SensorBarChartProps) => {
  const reversedData = data.slice().reverse();
  const colors = ["#5CC2F2", "#C1EAF3"];
  const getColor = (bar: any) => colors[bar.index % colors.length];

  const customTooltip = (bar: any) => {
    return (
      <div
        style={{
          background: "#fff",
          padding: "10px",
          border: "1px solid #ccc",
          textAlign: "center",
        }}
      >
        <strong>{bar.data.id}</strong>
        <br />
        {bar.data[sensor]}
      </div>
    );
  };

  return (
    <div style={{ height: "100%" }}>
      <ResponsiveBar
        data={reversedData}
        keys={[sensor]}
        indexBy="id"
        layout="horizontal"
        margin={{ top: 3, right: 10, bottom: 10, left: 60 }}
        padding={0.3}
        valueScale={{ type: "linear" }}
        indexScale={{ type: "band", round: true }}
        colors={getColor}
        borderColor={{ from: "color", modifiers: [["darker", 1.6]] }}
        axisTop={null}
        axisRight={null}
        axisBottom={null}
        axisLeft={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legendPosition: "middle",
          legendOffset: -40,
        }}
        labelSkipWidth={12}
        labelSkipHeight={12}
        labelTextColor="rgba(0, 0, 0, 0)"
        animate={true}
        minValue={sensor === "AIR_OUT_MPA" ? -0.1 : 0}
        maxValue={
          sensor === "MOTOR"
            ? 300
            : sensor === "VACUUM"
            ? 100
            : sensor === "AIR_IN_KPA"
            ? 900
            : sensor === "AIR_OUT_KPA"
            ? 900
            : sensor === "AIR_OUT_MPA"
            ? 1
            : sensor === "WATER"
            ? 4
            : sensor === "ABRASION"
            ? 40
            : sensor === "LOAD"
            ? 16
            : 50000
        }
        tooltip={customTooltip}
      />
    </div>
  );
};

export default SensorHorizontalBarChart;
