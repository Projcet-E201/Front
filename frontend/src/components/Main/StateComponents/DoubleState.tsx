import React, { useEffect, useState } from "react";
import { Bar } from "@nivo/bar";
import { ResponsiveBar } from "@nivo/bar";
import { faker } from "@faker-js/faker";

// import CircularProgress from "@mui/material/CircularProgress";
const DoubleState = () => {
  const [data, setData] = useState([
    {
      id: "db1",
      vacuum: "D1",
      value: faker.datatype.float({ min: -10, max: 300 }),
      color: "#FF5722",
    },
    {
      id: "db2",
      vacuum: "D2",
      value: faker.datatype.float({ min: -10, max: 300 }),
      color: "#FFC107",
    },
    {
      id: "db3",
      vacuum: "D3",
      value: faker.datatype.float({ min: -10, max: 300 }),
      color: "#4CAF50",
    },
    {
      id: "db4",
      vacuum: "D4",
      value: faker.datatype.float({ min: -10, max: 300 }),
      color: "#2196F3",
    },
    {
      id: "db5",
      vacuum: "D5",
      value: faker.datatype.float({ min: -10, max: 300 }),
      color: "#9C27B0",
    },
    {
      id: "db6",
      vacuum: "D6",
      value: faker.datatype.float({ min: -10, max: 300 }),
      color: "#FF9800",
    },
    {
      id: "db7",
      vacuum: "D7",
      value: faker.datatype.float({ min: -10, max: 300 }),
      color: "#795548",
    },
    {
      id: "db8",
      vacuum: "D8",
      value: faker.datatype.float({ min: -10, max: 300 }),
      color: "#00BCD4",
    },
    {
      id: "db9",
      vacuum: "D9",
      value: faker.datatype.float({ min: -10, max: 300 }),
      color: "#E91E63",
    },
    {
      id: "db10",
      vacuum: "D10",
      value: faker.datatype.float({ min: -10, max: 300 }),
      color: "#00ffff",
    },
  ]);

  const [remainingTime, setRemainingTime] = useState(5);

  useEffect(() => {
    const intervalId = setInterval(() => {
      const newData = data.map((d) => ({
        ...d,
        value: faker.datatype.float({ min: -10, max: 300 }),
      }));
      setData(newData);
      setRemainingTime(6);
    }, 5000);

    const countdownIntervalId = setInterval(() => {
      setRemainingTime((prev) => prev - 1);
    }, 1000);

    return () => {
      clearInterval(intervalId);
      clearInterval(countdownIntervalId);
    };
  }, [data]);

  return (
    <ResponsiveBar
      // width={1000} // 차트의 가로 길이
      // width={100} // 차트의 가로 길이
      // height={500} // 차트의 세로 길이
      data={data} // 차트에 표시될 데이터 배열
      keys={["value"]} // 표시될 데이터에서 y축 값에 해당하는 키 값
      indexBy="vacuum" // 표시될 데이터에서 x축 값에 해당하는 키 값
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
      axisLeft={{
        // y축의 설정
        tickValues: 20,
        tickSize: 5, // 축의 눈금선 길이
        tickPadding: 5, // 축과 눈금선 사이의 여백
        tickRotation: 0, // 눈금선의 회전 각도
        // legend: "Value", // y축에 대한 레전드(축 이름)
        // legendPosition: "middle", // 레전드의 위치
        // legendOffset: -40, // 레전드의 오프셋
      }}
      maxValue={300}
      minValue={-50}
      colors={(bar) => bar.data.color}
      markers={[
        {
          axis: "y",
          value: 30,
          lineStyle: { stroke: "red", strokeWidth: 2 },
          legend: "위험 구간",
          legendOrientation: "vertical",
        },
        {
          axis: "y",
          value: 70,
          lineStyle: { stroke: "red", strokeWidth: 2 },
          legend: "",
          legendOrientation: "vertical",
        },
        {
          axis: "y",
          value: 0,
          lineStyle: { stroke: "gray", strokeWidth: 2 },
          legend: "",
          legendOrientation: "vertical",
        },
      ]}
    />
  );
};

export default DoubleState;
