import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { faker } from "@faker-js/faker";
import { ResponsiveLine } from "@nivo/line";

const MotorChart = () => {
  const navigate = useNavigate();
  const [data, setData] = useState<
    { x: string; temp1: number; temp2: number; temp3: number; temp4: number }[]
  >([]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      // setData((prevData) => {
      //   const currentTime = new Date().toLocaleTimeString();
      //   const newEntry = {
      //     x: currentTime,
      //     temp1: faker.datatype.number({ min: 10, max: 100 }),
      //     temp2: faker.datatype.number({ min: 10, max: 100 }),
      //     temp3: faker.datatype.number({ min: 10, max: 100 }),
      //     temp4: faker.datatype.number({ min: 10, max: 100 }),
      //   };
      //   if (prevData.length >= 10) {
      //     const newData = [...prevData.slice(1), newEntry];
      //     return newData;
      //   } else {
      //     return [...prevData, newEntry];
      //   }
      //   // return [...prevData, newEntry];
      // });
      setData((prevData) => {
        const currentTime = new Date().toLocaleTimeString();
        const newEntry = {
          x: currentTime,
          temp1: faker.datatype.number({ min: 10, max: 100 }),
          temp2: faker.datatype.number({ min: 10, max: 100 }),
          temp3: faker.datatype.number({ min: 10, max: 100 }),
          temp4: faker.datatype.number({ min: 10, max: 100 }),
        };
        const newData =
          prevData.length >= 10
            ? [...prevData.slice(1), newEntry]
            : [...prevData, newEntry];
        return newData;
      });
    }, 2000);

    return () => clearInterval(intervalId);
  }, []);

  // 추가: 실시간 차트를 위한 상태 변수와 효과 함수

  const dataset1 = {
    id: "temp1",
    data: data.map((d) => ({ x: d.x, y: d.temp1 })),
  };
  const dataset2 = {
    id: "temp2",
    data: data.map((d) => ({ x: d.x, y: d.temp2 })),
  };
  const dataset3 = {
    id: "temp3",
    data: data.map((d) => ({ x: d.x, y: d.temp3 })),
  };
  const dataset4 = {
    id: "temp4",
    data: data.map((d) => ({ x: d.x, y: d.temp4 })),
  };

  return (
    // <div style={{ height: "100%" }}>
    <div style={{ height: "500px" }}>
      {/* <h3>motor chart</h3> */}
      <ResponsiveLine
        data={[dataset1, dataset2, dataset3, dataset4]}
        margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
        xScale={{ type: "point" }}
        yScale={{
          type: "linear",
          // min: "auto",
          min: 0,
          // max: "auto",
          max: 100,
          stacked: false,
          // stacked: true,
          reverse: false,
        }}
        curve="cardinal"
        // curve="linear"
        axisTop={null}
        axisRight={null}
        colors={{ scheme: "category10" }}
        lineWidth={2} // 그래프 두께
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
        legends={[
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
            onClick: (data) => {
              const id: string = data.id as string;
              // console.log(id[id.length - 1]);
              navigate(`/motor/${id[id.length - 1]}`);
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
        ]}
      />
    </div>
  );
};

export default MotorChart;
