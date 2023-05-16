import React, { useState, useEffect, useMemo } from "react";
import { ResponsiveBar } from "@nivo/bar";
import { faker } from "@faker-js/faker";
const CardAbrasionChart = ({ abrasionData }: any) => {
  const data = abrasionData
    .filter((item: any) => !isNaN(item[Object.keys(item)[0]]))
    .map((item: any, index: number) => {
      const key = Object.keys(item)[0];
      const id = `A${index + 1}`;
      const value = item[key];
      const color = index % 2 === 0 ? "#C1EAF3" : "#5CC2F2";

      return {
        id,
        value,
        color,
      };
    })
    .sort((a: any, b: any) => {
      const idA = parseInt(a.id.replace("ABRASION", ""));
      const idB = parseInt(b.id.replace("ABRASION", ""));
      return idA - idB;
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
          layout="horizontal"
          data={data}
          keys={["value"]}
          indexBy="id"
          margin={{ top: 10, right: 10, bottom: 40, left: 40 }}
          padding={0.2}
          labelTextColor={{ from: "color", modifiers: [["darker", 1.6]] }}
          maxValue={40}
          colors={(bar: any) => bar.data.color}
        />
      )}
    </div>
  );
};

export default CardAbrasionChart;
