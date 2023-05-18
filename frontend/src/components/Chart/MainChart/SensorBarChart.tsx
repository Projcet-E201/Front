import React, { useEffect, useState } from "react";
import { ResponsiveBar } from "@nivo/bar";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";

type SensorBarChartProps = {
  data: any[];
  sensor: string;
};

const SensorBarChart = ({ data, sensor }: SensorBarChartProps) => {
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

  const colors = ["#5CC2F2", "#C1EAF3"];
  const getColor = (bar: any) => colors[bar.index % colors.length];

  return (
    <div style={{ height: "100%" }}>
      <ResponsiveBar
        data={data}
        keys={[sensor]}
        indexBy="id"
        margin={{ top: 3, right: 10, bottom: 5, left: 10 }}
        padding={0.3}
        valueScale={{ type: "linear" }}
        indexScale={{ type: "band", round: true }}
        colors={getColor}
        borderColor={{ from: "color", modifiers: [["darker", 1.6]] }}
        axisTop={null}
        axisRight={null}
        axisBottom={null}
        axisLeft={null}
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
        gridYValues={[
          sensor === "AIR_OUT_MPA" ? -0.1 : 0,
          sensor === "MOTOR"
            ? 150
            : sensor === "VACUUM"
            ? 50
            : sensor === "AIR_IN_KPA"
            ? 450
            : sensor === "AIR_OUT_KPA"
            ? 450
            : sensor === "AIR_OUT_MPA"
            ? 0.45
            : sensor === "WATER"
            ? 2
            : sensor === "ABRASION"
            ? 20
            : sensor === "LOAD"
            ? 8
            : 25000,
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
            : 50000,
        ]}
        label={(bar: any) => `${bar.id}: ${bar.data[sensor]}`}
        tooltip={customTooltip}
      />
    </div>
  );
};

export default SensorBarChart;
