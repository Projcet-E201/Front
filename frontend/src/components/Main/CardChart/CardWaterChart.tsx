import React, { useEffect, useState } from "react";
import { ResponsiveBar } from "@nivo/bar";

const CardWaterChart = ({ waterData }: any) => {
  console.log(waterData, "water");

  const data: any = waterData
    .filter((item: any) => !isNaN(item.value))
    .map((item: any, index: number) => {
      const key = Object.keys(item)[0];
      const value = item[key];

      return {
        id: `W${index + 1}`,
        value,
        color: index % 2 === 0 ? "#C1EAF3" : "#5CC2F2",
      };
    });

  return (
    <div style={{ height: "100%" }}>
      {data.length === 0 ? (
        <div
          style={{
            height: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            textAlign: "center",
          }}
        >
          <div>
            <h4>저장된 데이터가 없습니다.</h4>
            <h4>관리자에게 문의하세요.</h4>
          </div>
        </div>
      ) : (
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
      )}
    </div>
  );
};

export default CardWaterChart;
