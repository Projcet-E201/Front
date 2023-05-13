import React, { useEffect, useState } from "react";
import { Bar } from "@nivo/bar";
import { ResponsiveBar } from "@nivo/bar";
import { faker } from "@faker-js/faker";

// import CircularProgress from "@mui/material/CircularProgress";
const CardWaterChart = ({ waterData }: any) => {
  const [data, setData] = useState(
    Array.from(Array(10)).map((_, index) => ({
      id: `water${index + 1}`,
      water: `W${index + 1}`,
      value: 0,
      color: index % 2 === 0 ? "#C1EAF3" : "#5CC2F2",
    }))
  );

  useEffect(() => {
    // waterData가 변경될 때마다 data 배열을 업데이트
  }, [waterData]);

  return (
    <ResponsiveBar
      // width={1000} // 차트의 가로 길이
      // width={100} // 차트의 가로 길이
      // height={500} // 차트의 세로 길이
      data={data} // 차트에 표시될 데이터 배열
      keys={["value"]} // 표시될 데이터에서 y축 값에 해당하는 키 값
      indexBy="water" // 표시될 데이터에서 x축 값에 해당하는 키 값
      margin={{ top: 10, right: 10, bottom: 40, left: 40 }} // 차트와 경계선 사이의 여백
      padding={0.2} // 바 사이의 여백
      labelTextColor={{ from: "color", modifiers: [["darker", 1.6]] }} // 라벨의 색상과 스타일 지정
      // axisBottom={{
      //   // x축의 설정
      //   tickSize: 5, // 축의 눈금선 길이
      //   tickPadding: 5, // 축과 눈금선 사이의 여백
      //   tickRotation: 0, // 눈금선의 회전 각도
      //   legend: "Vacuum", // x축에 대한 레전드(축 이름)
      //   legendPosition: "middle", // 레전드의 위치
      //   legendOffset: 32, // 레전드의 오프셋
      // }}
      // axisLeft={{
      //   // y축의 설정
      //   tickSize: 5, // 축의 눈금선 길이
      //   tickPadding: 5, // 축과 눈금선 사이의 여백
      //   tickRotation: 0, // 눈금선의 회전 각도
      //   legend: "Value", // y축에 대한 레전드(축 이름)
      //   legendPosition: "middle", // 레전드의 위치
      //   legendOffset: -40, // 레전드의 오프셋
      // }}
      maxValue={100}
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

export default CardWaterChart;
