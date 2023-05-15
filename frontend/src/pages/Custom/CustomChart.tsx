import React, { useEffect, useState } from "react";
import { useNavigate, useLocation, useParams } from "react-router";
import { faker } from "@faker-js/faker";
import { ResponsiveLine } from "@nivo/line";
import { linearGradientDef } from "@nivo/core";

import axios from "axios";

const CustomChart = ({ chart }: any) => {
  console.log(typeof chart.machine, "prop chart");
  console.log(chart.sensor, "prop chart");
  console.log(chart.sensorNumber, "prop chart");

  const [error, setError] = useState<any>();
  const [reconnectTimer, setReconnectTimer] = useState<any>();
  const [reconnectTimeLeft, setReconnectTimeLeft] = useState<number>(0);

  const [sensor, setSensor] = useState<any>("");
  const [url, setUrl] = useState<any>("");

  const defaultUrl = `https://semse.info/api/machine/${chart.machine}`;

  useEffect(() => {
    if (chart.sensor === "Motor") {
      setSensor("motor");
      setUrl(defaultUrl + "/motor");
    } else if (chart.sensor === "Vacuum") {
      setSensor("vacuum");
      setUrl(defaultUrl + "/vacuum");
    } else if (chart.sensor === "AirIn") {
      setSensor("air-in");
      setUrl(defaultUrl + "/air-in");
    } else if (chart.sensor === "AirOut(kPa)") {
      setSensor("air_out_kpa");
      setUrl(defaultUrl + "/air_out_kpa");
    } else if (chart.sensor === "AirOut(MPa)") {
      setSensor("air_out_mpa");
      setUrl(defaultUrl + "/air_out_mpa");
    } else if (chart.sensor === "Water") {
      setSensor("water");
      setUrl(defaultUrl + "/water");
    } else if (chart.sensor === "마모량") {
      setSensor("abrasion");
      setUrl(defaultUrl + "/abrasion");
    } else if (chart.sensor === "부하량") {
      setSensor("load");
      setUrl(defaultUrl + "/load");
    } else if (chart.sensor === "회전속도") {
      setSensor("velocity");
      setUrl(defaultUrl + "/velocity");
    }
  }, [chart.sensor]);

  const [data, setData] = useState<any>([]);

  const getData = () => {
    console.log("axios", url);
    axios
      .get(`${url}`)
      .then((res) => {
        console.log(res.data, "dfdfdf");
        setData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getData();
    const interval = setInterval(() => {
      getData();
    }, 10000);

    return () => {
      clearInterval(interval);
      clearInterval(reconnectTimer);
      setData([]);
    };
  }, []);

  return (
    <div>
      <h1>{chart.machine}</h1>
      <h1>{sensor}</h1>
      <h1>{chart.sensorNumber}</h1>
      <h1>{url}</h1>
      <p>{JSON.stringify(data)}</p>
    </div>
    //   <ResponsiveLine
    //     data={datasets}
    //     margin={{ top: 10, right: 70, bottom: 30, left: 40 }}
    //     // xScale={{ type: "point" }}
    //     yScale={{
    //       type: "linear",
    //       // min: "auto",
    //       min: 0,
    //       // max: "auto",
    //       max: 300,
    //       stacked: false,
    //       // stacked: true,
    //       reverse: false,
    //     }}
    //     curve="monotoneX"
    //     // curve="linear"
    //     axisTop={null}
    //     axisRight={null}
    //     // colors={{ scheme: "category10" }}
    //     colors={(data) => data.color}
    //     lineWidth={2} // 그래프 두께
    //     pointSize={10}
    //     pointColor={{ theme: "background" }}
    //     pointBorderWidth={2}
    //     pointBorderColor={{ from: "serieColor" }}
    //     pointLabelYOffset={-12}
    //     enableSlices="x"
    //     enablePoints={false}
    //     // useMesh={true}
    //     animate={true}
    //     // isInteractive={true}
    //     // isInteractive={false}
    //     legends={[
    //       {
    //         anchor: "right",
    //         // anchor: "top",
    //         direction: "column",
    //         justify: false,
    //         translateX: 100, // 차트와 legend 사이 간격 조정
    //         translateY: -10, // 차트의 y축 위치
    //         itemsSpacing: 0,
    //         itemDirection: "left-to-right",
    //         itemWidth: 80,
    //         itemHeight: 20,
    //         itemOpacity: 0.75,
    //         symbolSize: 12,
    //         // symbolShape: "circle",
    //         symbolBorderColor: "rgba(0, 0, 0, .5)",
    //         // onClick: (data) => {
    //         //   const id: string = data.id as string;
    //         //   // console.log(id[id.length - 1]);
    //         //   console.log(id);
    //         //   navigate(`/machine/${machine}/Motor/${id.slice(6)}`);
    //         // },
    //         effects: [
    //           {
    //             on: "hover",
    //             style: {
    //               itemBackground: "rgba(0, 0, 0, .03)",
    //               itemOpacity: 1,
    //             },
    //           },
    //         ],
    //       },
    //     ]}
    //     // markers={[
    //     //   {
    //     //     axis: "y",
    //     //     value: 100,
    //     //     lineStyle: {
    //     //       stroke: "green",
    //     //       strokeWidth: 2,
    //     //     },
    //     //   },
    //     // ]}
    //   />
  );
};

export default CustomChart;
