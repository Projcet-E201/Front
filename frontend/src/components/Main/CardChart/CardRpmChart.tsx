import React, { useEffect, useState } from "react";
import { Bar } from "@nivo/bar";
import { ResponsiveBar } from "@nivo/bar";
import { faker } from "@faker-js/faker";

// import CircularProgress from "@mui/material/CircularProgress";
const CardRpmChart = ({ velocityData }: any) => {
  const data: any = velocityData.map((item: any, index: number) => {
    const key = Object.keys(item)[0];
    const value = item[key];

    return {
      id: `V${index + 1}`,
      value,
      color: index % 2 === 0 ? "#C1EAF3" : "#5CC2F2",
    };
  });

  return (
    <ResponsiveBar
      // width={1000} // 차트의 가로 길이
      // width={100} // 차트의 가로 길이
      // height={500} // 차트의 세로 길이
      data={data} // 차트에 표시될 데이터 배열
      keys={["value"]} // 표시될 데이터에서 y축 값에 해당하는 키 값
      indexBy="id" // 표시될 데이터에서 x축 값에 해당하는 키 값
      margin={{ top: 10, right: 10, bottom: 40, left: 40 }} // 차트와 경계선 사이의 여백
      padding={0.2} // 바 사이의 여백
      labelTextColor={{ from: "color", modifiers: [["darker", 1.6]] }} // 라벨의 색상과 스타일 지정
      axisBottom={{
        // x축의 설정
        tickSize: 5, // 축의 눈금선 길이
        tickPadding: 5, // 축과 눈금선 사이의 여백
        tickRotation: 0, // 눈금선의 회전 각도
        // legend: "Vacuum", // x축에 대한 레전드(축 이름)
        legendPosition: "middle", // 레전드의 위치
        legendOffset: 32, // 레전드의 오프셋
      }}
      axisLeft={{
        // y축의 설정
        tickSize: 5, // 축의 눈금선 길이
        tickPadding: 5, // 축과 눈금선 사이의 여백
        tickRotation: 0, // 눈금선의 회전 각도
        // legend: "Value", // y축에 대한 레전드(축 이름)
        legendPosition: "middle", // 레전드의 위치
        legendOffset: -40, // 레전드의 오프셋
        // tickValues: [0, 50000], // 최소값과 최대값 지정
      }}
      maxValue={50000}
      colors={(bar: any) => bar.data.color}
      // markers={[
      //   {
      //     axis: "y",
      //     value: 30,
      //     lineStyle: { stroke: "red", strokeWidth: 2 },
      //     legend: "위험 구간",
      //     legendOrientation: "vertical",
      //   },
      //   {
      //     axis: "y",
      //     value: 70,
      //     lineStyle: { stroke: "red", strokeWidth: 2 },
      //     legend: "",
      //     legendOrientation: "vertical",
      //   },
      // ]}
    />
  );
};

export default CardRpmChart;
