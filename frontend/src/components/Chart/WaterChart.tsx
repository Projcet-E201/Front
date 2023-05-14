import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";

import { ResponsiveLine } from "@nivo/line";

// import { useSetRecoilState } from "recoil";
import { useRecoilState } from "recoil";
import { WaterMarkersAtom } from "../../store/atoms";

interface Props {
  datasets: any[];
  legend?: boolean;
}

const formatTime = (secondsAgo: number) => {
  const d = new Date();
  d.setSeconds(d.getSeconds() - secondsAgo);
  return d.toLocaleTimeString();
};

const WaterChart = ({ datasets, legend }: Props) => {
  const navigate = useNavigate();
  const [markers, setMarkers] = useState<any>([]);
  const [recoilMarkers, setRecoilMarkers] = useRecoilState(WaterMarkersAtom);

  useEffect(() => {
    const markersFromLocalStorage = JSON.parse(
      localStorage.getItem("WaterChartMarkers") || "[]"
    );
    setMarkers(markersFromLocalStorage.filter((marker: any) => marker.checked));
    // 일단 Recoil에서도 관리해보자.
    setRecoilMarkers(
      markersFromLocalStorage.filter((marker: any) => marker.checked)
    );
    console.log(markers);
    // markers에 의존하면  markers의 변경에 의해 자신이 다시 실행되면서 엄청 많이 실행되고 있음 주의할 것.
    // 성능 이슈 발생하면 버려야 할 듯
  }, []);

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
      data={datasets}
      margin={{ top: 10, right: legend ? 110 : 35, bottom: 30, left: 40 }}
      xFormat={(value: any) => formatTime(new Date().getTime() / 1000 - value)}
      xScale={{ type: "point" }}
      yScale={{
        type: "linear",
        min: 0,
        max: 4,
        stacked: false,
        reverse: false,
      }}
      curve="monotoneX"
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
      // 이렇게 하면 차트가 업데이트 될 때마다 markers를 가져와서 업데이트 주기마다 나타난다. 그러면 데이터를 실시간으로 받아오니까 괜찮지 않을까?
      // markers={JSON.parse(
      //   localStorage.getItem("WaterChartMarkers") || "[]"
      // ).filter((marker: any) => marker.checked)}
      // markers={markers}
      markers={recoilMarkers.filter((marker: any) => marker.checked)}
    />
  );
};

export default WaterChart;
