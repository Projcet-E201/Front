import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";

import { ResponsiveLine } from "@nivo/line";
import { useParams } from "react-router";

import { useRecoilState } from "recoil";
import { AirInMarkersAtom } from "../../store/atoms";

interface Props {
  datasets: any[];
  legend?: boolean;
}

const formatTime = (secondsAgo: number) => {
  const d = new Date();
  d.setSeconds(d.getSeconds() - secondsAgo);
  return d.toLocaleTimeString();
};

const AirInChart = ({ datasets, legend }: Props) => {
  // console.log(avgData);
  const navigate = useNavigate();
  const [markers, setMarkers] = useState([]);
  const [recoilMarkers, setRecoilMarkers] = useRecoilState(AirInMarkersAtom);
  const { machine } = useParams();

  useEffect(() => {
    const markersFromLocalStorage = JSON.parse(
      localStorage.getItem("AirInChartMarkers") || "[]"
    );
    setMarkers(markersFromLocalStorage.filter((marker: any) => marker.checked));
    setRecoilMarkers(
      markersFromLocalStorage.filter((marker: any) => marker.checked)
    );
  }, []);

  const legends: any = [
    {
      anchor: "top-right",
      direction: "column",
      justify: false,
      translateX: 120,
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
        navigate(`/machine/${machine}/air-in/${id[id.length - 1]}`);
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

  const updateWidth = localStorage.getItem("updateWidth");
  const lineWidth = updateWidth ? parseInt(updateWidth) : 2;
  const lineStyle = localStorage.getItem("lineStyle");
  const curve: any = lineStyle ? lineStyle : "monotoneX";

  return (
    <ResponsiveLine
      data={datasets}
      margin={{ top: 10, right: legend ? 110 : 35, bottom: 30, left: 40 }}
      xFormat={(value: any) => formatTime(new Date().getTime() / 1000 - value)}
      xScale={{ type: "point" }}
      yScale={{
        type: "linear",
        min: 0,
        max: 900,
        stacked: false,
        reverse: false,
      }}
      curve={curve}
      axisTop={null}
      axisRight={null}
      colors={{ scheme: "category10" }}
      // lineWidth={2}
      lineWidth={datasets.length >= 2 ? 2 : lineWidth}
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
      // markers={markers}
      markers={recoilMarkers.filter((marker: any) => marker.checked)}
    />
  );
};

export default AirInChart;
