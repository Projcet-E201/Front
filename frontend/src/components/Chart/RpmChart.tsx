import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";

import { ResponsiveLine } from "@nivo/line";

import { useRecoilState } from "recoil";
import { selectedMachineAtom } from "../../store/atoms";
import { RpmMarkersAtom } from "../../store/atoms";

interface Props {
  datasets: any[];
  legend?: boolean;
}

const formatTime = (secondsAgo: number) => {
  const d = new Date();
  d.setSeconds(d.getSeconds() - secondsAgo);
  return d.toLocaleTimeString();
};

const RpmChart = ({ datasets, legend }: Props) => {
  const navigate = useNavigate();

  const [markers, setMarkers] = useState([]);
  const [recoilMarkers, setRecoilMarkers] = useRecoilState(RpmMarkersAtom);

  useEffect(() => {
    const markersFromLocalStorage = JSON.parse(
      localStorage.getItem("RpmChartMarkers") || "[]"
    );
    setMarkers(markersFromLocalStorage.filter((marker: any) => marker.checked));
    setRecoilMarkers(
      markersFromLocalStorage.filter((marker: any) => marker.checked)
    );
  }, []);

  const selectedMachine = useRecoilState(selectedMachineAtom);

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
        // navigate(`/machine/${selectedMachine}/abra
        // sion/${id[id.length - 1]}`);
        navigate(`${id[id.length - 1]}`);
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
  return (
    <ResponsiveLine
      data={datasets}
      margin={{ top: 10, right: legend ? 110 : 35, bottom: 30, left: 40 }}
      xFormat={(value: any) => formatTime(new Date().getTime() / 1000 - value)}
      xScale={{ type: "point" }}
      yScale={{
        type: "linear",
        min: 0,
        max: 50000,
        stacked: false,
        reverse: false,
      }}
      curve="monotoneX"
      axisTop={null}
      axisRight={null}
      colors={{ scheme: "category10" }}
      lineWidth={datasets.length > 1 ? 2 : lineWidth}
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
      markers={recoilMarkers.filter((marker: any) => marker.checked)}
    />
  );
};

export default RpmChart;
