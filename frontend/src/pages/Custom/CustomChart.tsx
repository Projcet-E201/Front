import React, { useEffect, useState } from "react";
import { useNavigate, useLocation, useParams } from "react-router";
import { ResponsiveLine } from "@nivo/line";

import axios from "axios";

import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

const CustomChart = ({ chart }: any) => {
  const navigate = useNavigate();

  const [error, setError] = useState<any>();
  const [reconnectTimer, setReconnectTimer] = useState<any>();
  const [reconnectTimeLeft, setReconnectTimeLeft] = useState<number>(0);

  const [sensor, setSensor] = useState<any>("");
  const [customData, setCustomData] = useState<any>([]);
  const [selectData, setSelectData] = useState<any>([]);

  const defaultUrl = `https://semse.info/api/machine/${chart.machine}`;

  // console.log(chart, "34343434");

  let customurl = "";
  useEffect(() => {
    if (chart.sensor === "Motor") {
      setSensor("motor");
      customurl = defaultUrl + `/motor`;
    } else if (chart.sensor === "Vacuum") {
      setSensor("vacuum");
      customurl = defaultUrl + "/vacuum";
    } else if (chart.sensor === "AirIn") {
      setSensor("air_in_kpa");
      customurl = defaultUrl + "/air_in_kpa";
    } else if (chart.sensor === "AirOut(kPa)") {
      setSensor("air_out_kpa");
      customurl = defaultUrl + "/air_out_kpa";
    } else if (chart.sensor === "AirOut(MPa)") {
      setSensor("air_out_mpa");
      customurl = defaultUrl + "/air_out_mpa";
    } else if (chart.sensor === "Water") {
      setSensor("water");
      customurl = defaultUrl + "/water";
    } else if (chart.sensor === "마모량") {
      setSensor("abrasion");
      customurl = defaultUrl + "/abrasion";
    } else if (chart.sensor === "부하량") {
      setSensor("load");
      customurl = defaultUrl + "/load";
    } else if (chart.sensor === "회전속도") {
      setSensor("velocity");
      customurl = defaultUrl + "/velocity";
    }
  }, []);

  const [data, setData] = useState<any>([]);
  const [min, setMin] = useState<any>(0);
  const [max, setMax] = useState<any>(100);

  const getData = () => {
    axios

      .get(customurl)
      .then((response) => {
        setData(response.data);
        // console.log(response.data);
        const customData = response.data.reduce((acc: any, custom: any) => {
          const { name, time, value } = custom;
          const dataPoint = { x: time.split("/")[1], y: value };
          let customId = "";

          if (chart.sensor === "Motor") {
            customId = name.replace("MOTOR", "");
            setMax(300);
            setMin(0);
          } else if (chart.sensor === "Vacuum") {
            customId = name.replace("VACUUM", "");
            setMax(100);
            setMin(0);
          } else if (chart.sensor === "AirIn") {
            customId = name.replace("AIR_IN_KPA", "");
            setMax(900);
            setMin(0);
          } else if (chart.sensor === "AirOut(kPa)") {
            customId = name.replace("AIR_OUT_KPA", "");
            setMax(900);
            setMin(0);
          } else if (chart.sensor === "AirOut(MPa)") {
            customId = name.replace("AIR_OUT_MPA", "");
            setMax(1);
            setMin(-0.1);
          } else if (chart.sensor === "Water") {
            customId = name.replace("WATER", "");
            setMax(4);
            setMin(0);
          } else if (chart.sensor === "마모량") {
            customId = name.replace("ABRASION", "");
            setMax(40);
            setMin(0);
          } else if (chart.sensor === "부하량") {
            customId = name.replace("LOAD", "");
            setMax(16);
            setMin(0);
          } else if (chart.sensor === "회전속도") {
            customId = name.replace("VELOCITY", "");
            setMax(50000);
            setMin(0);
          }
          if (!acc[customId]) {
            acc[customId] = {
              id: `${chart.sensor}${customId}`,
              data: [dataPoint],
            };
          } else {
            acc[customId].data.push(dataPoint);
          }

          return acc;
        }, {});
        setCustomData(Object.values(customData));
      })
      .catch((err) => {
        // console.log(err);
      });
  };
  const updateCycle = localStorage.getItem("updateCycle");
  const time = updateCycle ? parseInt(updateCycle) : 10000;
  useEffect(() => {
    getData();
    const interval = setInterval(() => {
      getData();
    }, time);

    return () => {
      clearInterval(interval);
      clearInterval(reconnectTimer);
      setData([]);
    };
  }, []);

  // console.log(customData, "customData");

  let filteredData = [];
  if (chart.sensorNumber !== "all") {
    const targetNumber = parseInt(chart.sensorNumber);
    filteredData = customData.filter((data: any) => {
      const lastNumber = parseInt(data.id.match(/\d+$/)[0]);
      return lastNumber === targetNumber;
    });
  } else {
    filteredData = customData;
  }
  const updateWidth = localStorage.getItem("updateWidth");
  const lineWidth = updateWidth ? parseInt(updateWidth) : 2;
  const lineStyle = localStorage.getItem("lineStyle");
  const curve: any = lineStyle ? lineStyle : "monotoneX";
  return (
    <div
      style={{ height: "100%" }}
      onClick={() => {
        let navi = "";
        const defaultUrl = `/machine/${chart.machine}`;
        if (chart.sensorNumber === "all") {
          if (chart.sensor === "Motor") {
            navi = defaultUrl + `/motor`;
          } else if (chart.sensor === "Vacuum") {
            navi = defaultUrl + "/vacuum";
          } else if (chart.sensor === "AirIn") {
            navi = defaultUrl + "/air-in";
          } else if (chart.sensor === "AirOut(kPa)") {
            navi = defaultUrl + "/air-out-kpa";
          } else if (chart.sensor === "AirOut(MPa)") {
            navi = defaultUrl + "/air-out-mpa";
          } else if (chart.sensor === "Water") {
            navi = defaultUrl + "/water";
          } else if (chart.sensor === "마모량") {
            navi = defaultUrl + "/abrasion";
          } else if (chart.sensor === "부하량") {
            navi = defaultUrl + "/load";
          } else if (chart.sensor === "회전속도") {
            navi = defaultUrl + "/rpm";
          }
        } else {
          if (chart.sensor === "Motor") {
            navi = defaultUrl + `/motor/${chart.sensorNumber}`;
          } else if (chart.sensor === "Vacuum") {
            navi = defaultUrl + `/vacuum/${chart.sensorNumber}`;
          } else if (chart.sensor === "AirIn") {
            navi = defaultUrl + `/air-in/${chart.sensorNumber}`;
          } else if (chart.sensor === "AirOut(kPa)") {
            navi = defaultUrl + `/air-out-kpa/${chart.sensorNumber}`;
          } else if (chart.sensor === "AirOut(MPa)") {
            navi = defaultUrl + `/air-out-mpa/${chart.sensorNumber}`;
          } else if (chart.sensor === "Water") {
            navi = defaultUrl + `/water/${chart.sensorNumber}`;
          } else if (chart.sensor === "마모량") {
            navi = defaultUrl + `/abrasion/${chart.sensorNumber}`;
          } else if (chart.sensor === "부하량") {
            navi = defaultUrl + `/load/${chart.sensorNumber}`;
          } else if (chart.sensor === "회전속도") {
            navi = defaultUrl + `/rpm/${chart.sensorNumber}`;
          }
        }
        navigate(navi);
      }}
    >
      {filteredData.length === 0 ? (
        <Box
          sx={{
            height: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <CircularProgress />
          <h3>데이터를 불러오는 중 입니다...</h3>
        </Box>
      ) : (
        <ResponsiveLine
          data={filteredData}
          margin={{ top: 10, right: 120, bottom: 30, left: 40 }}
          // xScale={{ type: "point" }}
          yScale={{
            type: "linear",
            // min: "auto",
            // min: 0,
            min: min,
            // max: "auto",
            max: max,
            stacked: false,
            // stacked: true,
            reverse: false,
          }}
          curve={curve}
          // curve="linear"
          axisTop={null}
          axisRight={null}
          colors={{ scheme: "category10" }}
          // colors={(data) => data.color}
          lineWidth={filteredData.length > 1 ? 2 : lineWidth}
          pointSize={10}
          pointColor={{ theme: "background" }}
          pointBorderWidth={2}
          pointBorderColor={{ from: "serieColor" }}
          pointLabelYOffset={-12}
          enableSlices="x"
          enablePoints={false}
          useMesh={true}
          animate={true}
          // isInteractive={true}
          // isInteractive={false}
          legends={[
            {
              anchor: "right",
              // anchor: "top",
              direction: "column",
              justify: true,
              translateX: 110, // 차트와 legend 사이 간격 조정
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
        />
      )}
    </div>
  );
};

export default CustomChart;
