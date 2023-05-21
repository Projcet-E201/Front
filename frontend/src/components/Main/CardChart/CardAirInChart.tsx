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
  const updateWidth = localStorage.getItem("updateWidth");
  const lineWidth = updateWidth ? parseInt(updateWidth) : 2;
  return (
    <div style={{ height: "100%" }}>
      {airInData.length === 0 ? (
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
          lineWidth={data.length > 1 ? 2 : lineWidth}
          pointSize={10}
          pointColor={{ theme: "background" }}
          pointBorderWidth={2}
          pointBorderColor={{ from: "serieColor" }}
          pointLabelYOffset={-12}
          enableSlices="x"
          enablePoints={false}
          useMesh={true}
          animate={false}
          // isInteractive={true}
          // isInteractive={false}
          enableArea={true}
          areaBaselineValue={0} //default 0
          areaOpacity={0.5}
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
      )}
    </div>
  );
};

export default CardAirInChart;
