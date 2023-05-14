import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router";
import { faker } from "@faker-js/faker";
import { ResponsiveLine } from "@nivo/line";

const CardAirInChart = ({ airInData }: any) => {
  const data = [
    {
      id: "avg",
      data: airInData.map((item: any) => ({
        x: item.time.split("/")[1],
        y: item.avg,
      })),
    },
  ];
  return (
    <ResponsiveLine
      data={data}
      margin={{ top: 10, right: 70, bottom: 30, left: 40 }}
      // xScale={{ type: "point" }}
      yScale={{
        type: "linear",
        // min: "auto",
        min: 0,
        // max: "auto",
        max: 900,
        stacked: false,
        // stacked: true,
        reverse: false,
      }}
      curve="monotoneX"
      // curve="linear"
      axisTop={null}
      axisRight={null}
      colors={{ scheme: "category10" }}
      lineWidth={2} // 그래프 두께
      pointSize={10}
      pointColor={{ theme: "background" }}
      pointBorderWidth={2}
      pointBorderColor={{ from: "serieColor" }}
      pointLabelYOffset={-12}
      enableSlices="x"
      enablePoints={false}
      // useMesh={true}
      animate={false}
      // isInteractive={true}
      // isInteractive={false}
      legends={[
        {
          // anchor: "top-right",
          anchor: "right",
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
          //   console.log(location.pathname);
          //   navigate(
          //     `/machine/${location.pathname.slice(-1)}/AirIn/${
          //       id[id.length - 1]
          //     }`
          //   );
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
    />
  );
};

export default CardAirInChart;
