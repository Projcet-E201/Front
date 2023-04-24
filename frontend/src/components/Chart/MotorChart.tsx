import React from "react";
import { useNavigate } from "react-router";

import { ResponsiveLine } from "@nivo/line";

interface Props {
  datasets: any[];
  legend?: boolean;
}
const MotorChart = ({ datasets, legend }: Props) => {
  const navigate = useNavigate();

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
        navigate(`motor/${id[id.length - 1]}`);
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
      data={datasets}
      margin={{ top: 10, right: legend ? 110 : 20, bottom: 30, left: 40 }}
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
      legends={legend ? legends : []}
    />
  );
};

export default MotorChart;
