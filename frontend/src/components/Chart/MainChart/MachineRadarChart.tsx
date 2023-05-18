import React from "react";
import { ResponsiveRadar, RadarCustomLayer } from "@nivo/radar";

type MachineData = {
  id: string;
  SCORE: number;
};

type MachineRadarChartProps = {
  data: MachineData[];
};

const MachineRadarChart = ({ data }: MachineRadarChartProps) => {
  const CustomAxes: RadarCustomLayer<MachineData>[] = [
    // 커스텀 axes 설정
  ];
  const CustomMarkers: RadarCustomLayer<MachineData>[] = [
    // 커스텀 markers 설정
  ];

  const sortedData = [...data].sort((a, b) => {
    const aIndex = parseInt(a.id.replace("CLIENT", ""));
    const bIndex = parseInt(b.id.replace("CLIENT", ""));
    return aIndex - bIndex;
  });

  return (
    <ResponsiveRadar
      data={sortedData}
      keys={["SCORE"]}
      indexBy="id"
      maxValue={100}
      curve="linearClosed"
      margin={{ top: 50, right: 80, bottom: 50, left: 80 }}
      borderWidth={2}
      borderColor={{ from: "color" }}
      gridLevels={4}
      gridShape="circular"
      gridLabelOffset={16}
      enableDots={true}
      dotSize={8}
      dotColor={{ theme: "background" }}
      dotBorderWidth={2}
      dotBorderColor={{ from: "color" }}
      enableDotLabel={true}
      dotLabel={(bar: any) => bar.id}
      dotLabelYOffset={-12}
      colors={"#191ba9"}
      fillOpacity={0.25}
      blendMode="multiply"
      animate={true}
      motionConfig="gentle"
      isInteractive={true}
      // legends={[
      //   {
      //     anchor: "top-left",
      //     direction: "column",
      //     translateX: -50,
      //     translateY: -40,
      //     itemWidth: 80,
      //     itemHeight: 20,
      //     itemTextColor: "#999",
      //     symbolSize: 12,
      //     symbolShape: "circle",
      //     effects: [
      //       {
      //         on: "hover",
      //         style: {
      //           itemTextColor: "#000",
      //         },
      //       },
      //     ],
      //   },
      // ]}
      // layers={["grid", ...CustomMarkers, ...CustomAxes, "dots", "legends"]}
    />
  );
};

export default MachineRadarChart;
