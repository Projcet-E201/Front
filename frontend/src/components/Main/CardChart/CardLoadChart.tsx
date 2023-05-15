import React, { useState, useEffect, useMemo } from "react";
import { ResponsiveBar } from "@nivo/bar";
import { faker } from "@faker-js/faker";
const CardLoadChart = ({ loadData }: any) => {
  const data: any = loadData.map((item: any, index: number) => {
    const key = Object.keys(item)[0];
    const value = item[key];

    return {
      id: `L${index + 1}`,
      value,
      color: index % 2 === 0 ? "#C1EAF3" : "#5CC2F2",
    };
  });
  return (
    <ResponsiveBar
      layout="horizontal"
      data={data} // 차트에 표시될 데이터 배열
      keys={["value"]} // 표시될 데이터에서 y축 값에 해당하는 키 값
      indexBy="id" // 표시될 데이터에서 x축 값에 해당하는 키 값
      margin={{ top: 10, right: 10, bottom: 40, left: 40 }} // 차트와 경계선 사이의 여백
      padding={0.2} // 바 사이의 여백
      labelTextColor={{ from: "color", modifiers: [["darker", 1.6]] }} // 라벨의 색상과 스타일 지정      maxValue={100}
      colors={(bar: any) => bar.data.color}
      // colors={{ datum: "category10" }}
      maxValue={16}
      // markers={[
      //   {
      //     axis: "x",
      //     value: 13,
      //     lineStyle: { stroke: "red", strokeWidth: 2 },
      //     legend: "히히",
      //   },
      // ]}
    />
  );
};

export default CardLoadChart;
