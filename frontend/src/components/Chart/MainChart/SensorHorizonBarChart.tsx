import React, { useEffect, useState } from "react";
import { ResponsiveBar } from "@nivo/bar";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";

type SensorBarChartProps = {
  data: any[]; // Replace with the correct type
  sensor: string;
};

const SensorHorizontalBarChart = ({ data, sensor }: SensorBarChartProps) => {
  const reversedData = data.slice().reverse();
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
        // onClick={handleBarClick}

        data={reversedData}
        keys={[sensor]}
        indexBy="id"
        layout="horizontal" // 수평 막대 그래프로 변경
        margin={{ top: 3, right: 10, bottom: 10, left: 60 }} // 왼쪽 여백 조정
        padding={0.3}
        valueScale={{ type: "linear" }}
        indexScale={{ type: "band", round: true }}
        colors={"#C1EAF3"}
        borderColor={{ from: "color", modifiers: [["darker", 1.6]] }}
        axisTop={null}
        axisRight={null}
        axisBottom={null}
        axisLeft={{
          tickSize: 5, // x축 틱 높이 조정
          tickPadding: 5,
          tickRotation: 0,
          // legend: sensor,
          legendPosition: "middle",
          legendOffset: -40, // x축 레전드 위치 조정
        }}
        labelSkipWidth={12}
        labelSkipHeight={12}
        labelTextColor="rgba(0, 0, 0, 0)"
        animate={true}
        minValue={sensor == "AIR_OUT_MPA" ? -0.1 : 0}
        maxValue={
          sensor == "MOTOR"
            ? 300
            : sensor == "VACUUM"
            ? 100
            : sensor == "AIR_IN_KPA"
            ? 900
            : sensor == "AIR_OUT_KPA"
            ? 900
            : sensor == "AIR_OUT_MPA"
            ? 1
            : sensor == "WATER"
            ? 4
            : sensor == "ABRASION"
            ? 40
            : sensor == "LOAD"
            ? 16
            : 50000
        }
        // gridYValues={[]}
        tooltip={customTooltip}
      />
    </div>
  );
};

export default SensorHorizontalBarChart;
