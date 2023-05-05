import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";

import { ResponsiveLine } from "@nivo/line";

const data = [
  {
    id: "motor1",
    data: [
      { x: "2022-01-01", y: 10 },
      { x: "2022-01-02", y: 20 },
      { x: "2022-01-03", y: 30 },
      { x: "2022-01-04", y: 40 },
      { x: "2022-01-05", y: 50 },
    ],
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
  }, [markers]);

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
  ];

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
      curve="basis"
      axisTop={null}
      axisRight={null}
      colors={{ scheme: "category10" }}
      lineWidth={2}
      pointSize={10}
      pointColor={{ theme: "background" }}
      pointBorderWidth={2}
      pointBorderColor={{ from: "serieColor" }}
      pointLabelYOffset={-12}
      enableSlices="x"
      enablePoints={false}
      useMesh={true}
      animate={false}
      // legends={legend ? legends : []}
      markers={markers}
    />
  );
};

export default MotorMarkerChart;