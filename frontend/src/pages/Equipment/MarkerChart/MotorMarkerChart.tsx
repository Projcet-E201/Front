import React, { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router";

import { ResponsiveLine } from "@nivo/line";

const data = [
  {
    id: "motor",
    data: Array.from({ length: 20 }, (_, i) => ({
      x: new Date(Date.UTC(2022, 0, 1 + i)).toLocaleDateString("ko-KR", {
        month: "2-digit",
        day: "2-digit",
      }),
      y: Math.sin((i / 5) * Math.PI) * 50 + 50,
    })),
  },
];

const MotorMarkerChart = () => {
  const navigate = useNavigate();
  const [markers, setMarkers] = useState([]);

  useEffect(() => {
    const markersFromLocalStorage = JSON.parse(
      localStorage.getItem("motorChartMarkers") || "[]"
    );
    setMarkers(markersFromLocalStorage.filter((marker: any) => marker.checked));
  }, [localStorage]);

  const legends: any = [
    {
      anchor: "top-right",
      direction: "column",
      justify: false,
      translateX: 100,
      translateY: 0,
      itemsSpacing: 0,
      itemDirection: "left-to-right",
      itemWidth: 80,
      itemHeight: 20,
      itemOpacity: 0.75,
      symbolSize: 12,
      symbolShape: "circle",
      symbolBorderColor: "rgba(0, 0, 0, .5)",
      onClick: (data: any) => {
        const id: string = data.id as string;
        navigate(`${data.id.slice(5)}`);
      },
      // effects: [
      //   {
      //     on: "hover",
      //     style: {
      //       itemBackground: "rgba(0, 0, 0, .03)",
      //       itemOpacity: 1,
      //     },
      //   },
      // ],
    },
  ];
  const updateWidth = localStorage.getItem("updateWidth");
  const lineWidth = updateWidth ? parseInt(updateWidth) : 2;
  return (
    <ResponsiveLine
      data={data}
      margin={{ top: 10, right: 35, bottom: 30, left: 40 }}
      // xFormat={(value: any) => formatTime(new Date().getTime() / 1000 - value)}
      xScale={{ type: "point" }}
      yScale={{
        type: "linear",
        min: 0,
        max: 120,
        stacked: false,
        reverse: false,
      }}
      curve="monotoneX"
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
      // useMesh={true}
      animate={true}
      // legends={legend ? legends : []}
      markers={markers}
      isInteractive={false} // 마우스 움직이면 tooltip 막 뜨는거
    />
  );
};

export default MotorMarkerChart;
