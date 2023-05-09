import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";

import { ResponsiveLine } from "@nivo/line";

interface Props {
  datasets: any[];
  legend?: boolean;
}

const formatTime = (secondsAgo: number) => {
  const d = new Date();
  d.setSeconds(d.getSeconds() - secondsAgo);
  return d.toLocaleTimeString();
};

const DetailChart = ({ datasets, legend }: Props) => {
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
  const [maxvalue, setMaxvalue] = useState(0);
  const [minvalue, setMinvalue] = useState(0);

  useEffect(() => {
    if (datasets[0].name == "motor") {
      setMaxvalue(300);
      setMinvalue(0);
    } else if (datasets[0].name == "water") {
      setMaxvalue(4);
      setMinvalue(0);
    } else if (datasets[0].name == "vacuum") {
      setMaxvalue(30);
      setMinvalue(0);
    } else if (datasets[0].name == "air-in") {
      setMaxvalue(900);
      setMinvalue(0);
    } else if (datasets[0].name == "air-out-kpa") {
      setMaxvalue(900);
      setMinvalue(0);
    } else if (datasets[0].name == "air-out-mpa") {
      setMaxvalue(1);
      setMinvalue(-0.1);
    } else if (datasets[0].name == "abrasion") {
      setMaxvalue(40);
      setMinvalue(0);
    } else if (datasets[0].name == "load") {
      setMaxvalue(16);
      setMinvalue(0);
    } else if (datasets[0].name == "rpm") {
      setMaxvalue(50000);
      setMinvalue(0);
    }
    return;
  }, []);

  return (
    <ResponsiveLine
      data={datasets}
      margin={{ top: 10, right: legend ? 110 : 35, bottom: 30, left: 40 }}
      xFormat={(value: any) => formatTime(new Date().getTime() / 1000 - value)}
      xScale={{ type: "point" }}
      yScale={{
        type: "linear",
        min: minvalue,
        max: maxvalue,
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

export default DetailChart;
