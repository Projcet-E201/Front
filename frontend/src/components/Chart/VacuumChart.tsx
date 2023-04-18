import React, { useEffect, useState } from "react";
import { Bar } from "@nivo/bar";
import { faker } from "@faker-js/faker";

import CircularProgress from "@mui/material/CircularProgress";
const VacuumChart = () => {
  const [data, setData] = useState([
    { id: "vc1", vacuum: "A", value: 10, color: "#FF5722" },
    { id: "vc2", vacuum: "B", value: 20, color: "#FFC107" },
    { id: "vc3", vacuum: "C", value: 30, color: "#4CAF50" },
    { id: "vc4", vacuum: "D", value: 40, color: "#2196F3" },
    { id: "vc5", vacuum: "E", value: 50, color: "#9C27B0" },
    { id: "vc6", vacuum: "F", value: 60, color: "#FF9800" },
    { id: "vc7", vacuum: "G", value: 70, color: "#795548" },
    { id: "vc8", vacuum: "H", value: 80, color: "#00BCD4" },
    { id: "vc9", vacuum: "I", value: 90, color: "#E91E63" },
  ]);

  const [remainingTime, setRemainingTime] = useState(5);

  useEffect(() => {
    const intervalId = setInterval(() => {
      const newData = data.map((d) => ({
        ...d,
        value: faker.datatype.number({ min: 10, max: 100 }),
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
    <div>
      <Bar
        width={1000} // 차트의 가로 길이
        height={500} // 차트의 세로 길이
        data={data} // 차트에 표시될 데이터 배열
        keys={["value"]} // 표시될 데이터에서 y축 값에 해당하는 키 값
        indexBy="vacuum" // 표시될 데이터에서 x축 값에 해당하는 키 값
        margin={{ top: 50, right: 50, bottom: 50, left: 60 }} // 차트와 경계선 사이의 여백
        padding={0.2} // 바 사이의 여백
        labelTextColor={{ from: "color", modifiers: [["darker", 1.6]] }} // 라벨의 색상과 스타일 지정
        axisBottom={{
          // x축의 설정
          tickSize: 5, // 축의 눈금선 길이
          tickPadding: 5, // 축과 눈금선 사이의 여백
          tickRotation: 0, // 눈금선의 회전 각도
          legend: "Vacuum", // x축에 대한 레전드(축 이름)
          legendPosition: "middle", // 레전드의 위치
          legendOffset: 32, // 레전드의 오프셋
        }}
        axisLeft={{
          // y축의 설정
          tickSize: 5, // 축의 눈금선 길이
          tickPadding: 5, // 축과 눈금선 사이의 여백
          tickRotation: 0, // 눈금선의 회전 각도
          legend: "Value", // y축에 대한 레전드(축 이름)
          legendPosition: "middle", // 레전드의 위치
          legendOffset: -40, // 레전드의 오프셋
        }}
        maxValue={100}
        colors={(bar) => bar.data.color}
        markers={[
          {
            axis: "y",
            value: 50,
            lineStyle: { stroke: "rgba(0, 0, 0, .35)", strokeWidth: 2 },
            legend: "선 설명 쓰기",
            legendOrientation: "vertical",
          },
        ]}
      />
      <div>{remainingTime}</div>
      <div>
        {remainingTime > 0 && (
          <div style={{ textAlign: "center" }}>
            <CircularProgress
              variant="determinate"
              value={(5 - remainingTime) * 20}
            />
            <div style={{ marginTop: 10 }}>
              Remaining Time: {remainingTime} seconds
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default VacuumChart;
