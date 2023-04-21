import React, { useState, useEffect, useMemo } from "react";
import { ResponsiveBar } from "@nivo/bar";
import { faker } from "@faker-js/faker";
const CardLoadChart = () => {
  const [data, setData] = useState([
    { id: "L1", Load: "A", value: 10, color: "#FF5722" },
    { id: "L2", Load: "B", value: 20, color: "#FFC107" },
    { id: "L3", Load: "C", value: 30, color: "#4CAF50" },
    { id: "L4", Load: "D", value: 40, color: "#2196F3" },
    { id: "L5", Load: "E", value: 50, color: "#9C27B0" },
  ]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      const newData = data.map((d) => ({
        ...d,
        value: faker.datatype.number({ min: 10, max: 100 }),
      }));
      setData(newData);
    }, 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, [data]);

  const sortedData = useMemo(() => [...data].reverse(), [data]);

  return (
    <ResponsiveBar
      layout="horizontal"
      data={sortedData} // 차트에 표시될 데이터 배열
      keys={["value"]} // 표시될 데이터에서 y축 값에 해당하는 키 값
      indexBy="Load" // 표시될 데이터에서 x축 값에 해당하는 키 값
      margin={{ top: 10, right: 10, bottom: 40, left: 40 }} // 차트와 경계선 사이의 여백
      padding={0.2} // 바 사이의 여백
      labelTextColor={{ from: "color", modifiers: [["darker", 1.6]] }} // 라벨의 색상과 스타일 지정      maxValue={100}
      colors={(bar) => bar.data.color}
      // colors={{ datum: "category10" }}
      markers={[
        {
          axis: "x",
          value: 70,
          lineStyle: { stroke: "red", strokeWidth: 2 },
          legend: "히히",
        },
      ]}
    />
  );
};

export default CardLoadChart;
