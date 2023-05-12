import React, { useEffect, useState } from "react";
import { useNavigate, useLocation, useParams } from "react-router";
import { faker } from "@faker-js/faker";
import { ResponsiveLine } from "@nivo/line";
import { linearGradientDef } from "@nivo/core";

const CardMotorChart = ({ motorData }: any) => {
  // console.log(motorData, " motordata prop 받음!");
  const [data, setData] = useState<{ x: number; [key: string]: number }[]>([]);

  useEffect(() => {
    const initialData = [];
    for (let i = 0; i < 10; i++) {
      const dataEntry: any = {};
      const time = new Date(Date.now() - (50000 - i * 5000)).toLocaleTimeString(
        "ko-KR",
        {
          hour12: false,
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        }
      );
      dataEntry["x"] = time;
      for (let j = 1; j <= 2; j++) {
        dataEntry[`Motor${j}`] = faker.datatype.number({ min: 0, max: 300 });
      }
      initialData.push(dataEntry);
    }
    setData(initialData);

    const intervalId = setInterval(() => {
      const currentTime = new Date().toLocaleTimeString("ko-KR", {
        hour12: false,
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      });
      const newEntry: any = { x: currentTime };
      for (let i = 1; i <= 2; i++) {
        newEntry[`Motor${i}`] = faker.datatype.number({ min: 0, max: 300 });
      }
      setData((prevData) =>
        prevData.length >= 10
          ? [...prevData.slice(1), newEntry]
          : [...prevData, newEntry]
      );
    }, 5000);

    return () => clearInterval(intervalId);
  }, []);

  const datasets = [
    {
      id: "min",
      data: data.map((d) => {
        const minVal = Math.min(d["Motor1"], d["Motor2"]);
        return { x: d.x, y: minVal };
      }),
      color: "skyblue", // min line의 색상을 skyblue로 설정
    },
    {
      id: "max",
      data: data.map((d) => {
        const maxVal = Math.max(d["Motor1"], d["Motor2"]);
        return { x: d.x, y: maxVal };
      }),
      color: "red", // max line의 색상을 red로 설정
    },
  ];

  // console.log(datasets);

  return (
    <ResponsiveLine
      data={datasets}
      margin={{ top: 10, right: 70, bottom: 30, left: 40 }}
      // xScale={{ type: "point" }}
      yScale={{
        type: "linear",
        // min: "auto",
        min: 0,
        // max: "auto",
        max: 300,
        stacked: false,
        // stacked: true,
        reverse: false,
      }}
      curve="basis"
      // curve="linear"
      axisTop={null}
      axisRight={null}
      // colors={{ scheme: "category10" }}
      colors={(data) => data.color}
      lineWidth={2} // 그래프 두께
      pointSize={10}
      pointColor={{ theme: "background" }}
      pointBorderWidth={2}
      pointBorderColor={{ from: "serieColor" }}
      pointLabelYOffset={-12}
      enableSlices="x"
      enablePoints={false}
      // useMesh={true}
      animate={true}
      // isInteractive={true}
      // isInteractive={false}
      legends={[
        {
          anchor: "right",
          // anchor: "top",
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
          //   console.log(id);
          //   navigate(`/machine/${machine}/Motor/${id.slice(6)}`);
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
      markers={[
        {
          axis: "y",
          value: 100,
          lineStyle: {
            stroke: "green",
            strokeWidth: 2,
          },
        },
      ]}
    />
  );
};

export default CardMotorChart;
