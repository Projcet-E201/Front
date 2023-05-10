import React, { useEffect, useState } from "react";
import { Bar } from "@nivo/bar";
import { ResponsiveBar } from "@nivo/bar";
import { faker } from "@faker-js/faker";

import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

// import CircularProgress from "@mui/material/CircularProgress";
const DoubleState = ({ data }: any) => {
  return (
    <div style={{ height: "100%" }}>
      {data.length > 1 ? (
        <ResponsiveBar
          data={data} // 차트에 표시될 데이터 배열
          keys={["value"]} // 표시될 데이터에서 y축 값에 해당하는 키 값
          indexBy="name" // 표시될 데이터에서 x축 값에 해당하는 키 값
          margin={{ top: 10, right: 10, bottom: 40, left: 40 }} // 차트와 경계선 사이의 여백
          padding={0.2} // 바 사이의 여백
          labelTextColor={{ from: "color", modifiers: [["darker", 1.6]] }} // 라벨의 색상과 스타일 지정
          // axisBottom={{
          //   // x축의 설정
          //   tickSize: 5, // 축의 눈금선 길이
          //   tickPadding: 5, // 축과 눈금선 사이의 여백
          //   tickRotation: 0, // 눈금선의 회전 각도
          //   legend: "name", // x축에 대한 레전드(축 이름)
          //   legendPosition: "middle", // 레전드의 위치
          //   legendOffset: 32, // 레전드의 오프셋
          // }}
          axisLeft={{
            // y축의 설정
            // tickValues: 20,
            tickSize: 5, // 축의 눈금선 길이
            tickPadding: 5, // 축과 눈금선 사이의 여백
            tickRotation: 0, // 눈금선의 회전 각도
            // legend: "Value", // y축에 대한 레전드(축 이름)
            // legendPosition: "middle", // 레전드의 위치
            // legendOffset: -40, // 레전드의 오프셋
          }}
          maxValue={1000}
          minValue={-100}
          colors={(bar: any) => bar.data.color}
        />
      ) : (
        <Box
          sx={{
            height: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <CircularProgress />
          <h3>Double 데이터를 불러오는 중 입니다...</h3>
        </Box>
      )}
    </div>
  );
};

export default DoubleState;
