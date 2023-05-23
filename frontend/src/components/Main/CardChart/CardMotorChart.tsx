import React, { useEffect, useState } from "react";
import { useNavigate, useLocation, useParams } from "react-router";

import { ResponsiveLine } from "@nivo/line";

const CardMotorChart = ({ motorData }: any) => {
  const limitedData = motorData.slice(-10); // 마지막 10개의 데이터만 가져옵니다.

  const datasets = [
    {
      id: "min",
      data: limitedData.map((d: any) => {
        let minVal = d.min_value;

        const time = d.time.split("/")[1]; // '/'를 기준으로 문자열을 분할하고 두 번째 요소를 선택합니다.

        return { x: time, y: minVal };
      }),
      color: "skyblue", // min line의 색상을 skyblue로 설정
    },
    {
      id: "max",
      data: limitedData.map((d: any) => {
        const maxVal = d.max_value;
        const time = d.time.split("/")[1]; // '/'를 기준으로 문자열을 분할하고 두 번째 요소를 선택합니다.

        return { x: time, y: maxVal };
      }),
      color: "red", // max line의 색상을 red로 설정
    },
  ];

  // console.log(datasets, "datasets");
  // console.log(motorData);

  const updateWidth = localStorage.getItem("updateWidth");
  const lineWidth = updateWidth ? parseInt(updateWidth) : 2;
  const lineStyle = localStorage.getItem("lineStyle");
  const curve: any = lineStyle ? lineStyle : "monotoneX";

  return (
    <div style={{ height: "100%" }}>
      {motorData.length === 0 ? (
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
        <ResponsiveLine
          data={datasets}
          margin={{ top: 10, right: 70, bottom: 30, left: 40 }}
          // xScale={{ type: "point" }}
          yScale={{
            type: "linear",
            // min: "auto",
            min: 0,
            // max: "auto",
            max: 300,
            stacked: false,
            // stacked: true,
            reverse: false,
          }}
          curve={curve}
          // curve="linear"
          axisTop={null}
          axisRight={null}
          // colors={{ scheme: "category10" }}
          colors={(data) => data.color}
          lineWidth={datasets.length > 1 ? 2 : lineWidth}
          pointSize={10}
          pointColor={{ theme: "background" }}
          pointBorderWidth={2}
          pointBorderColor={{ from: "serieColor" }}
          pointLabelYOffset={-12}
          enableSlices="x"
          enablePoints={false}
          useMesh={true}
          animate={true}
          // isInteractive={true}
          // isInteractive={false}
          legends={[
            {
              anchor: "right",
              // anchor: "top",
              direction: "column",
              justify: false,
              translateX: 100, // 차트와 legend 사이 간격 조정
              translateY: -10, // 차트의 y축 위치
              itemsSpacing: 0,
              itemDirection: "left-to-right",
              itemWidth: 80,
              itemHeight: 20,
              itemOpacity: 0.75,
              symbolSize: 12,
              // symbolShape: "circle",
              symbolBorderColor: "rgba(0, 0, 0, .5)",
              // onClick: (data) => {
              //   const id: string = data.id as string;
              //   // console.log(id[id.length - 1]);
              //   console.log(id);
              //   navigate(`/machine/${machine}/Motor/${id.slice(6)}`);
              // },
              effects: [
                {
                  on: "hover",
                  style: {
                    itemBackground: "rgba(0, 0, 0, .03)",
                    itemOpacity: 1,
                  },
                },
              ],
            },
          ]}
          // markers={[
          //   {
          //     axis: "y",
          //     value: 100,
          //     lineStyle: {
          //       stroke: "green",
          //       strokeWidth: 2,
          //     },
          //   },
          // ]}
        />
      )}
    </div>
  );
};

export default CardMotorChart;
