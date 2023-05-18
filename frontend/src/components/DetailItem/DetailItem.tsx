import React, { useCallback, useEffect, useRef, useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import DetailChart from "../Chart/DetailChart/DetailChart";
import styles from "./DetailItem.module.css";
import { DatePicker, Space, Button } from "antd";
import axios from "axios";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

const { RangePicker } = DatePicker;
type History = {
  x: string;
  y: number;
};

const DetailItem: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [data, setData] = useState<{ x: number; [key: string]: number }[]>([]);
  const [intervalSeconds, setIntervalSeconds] = useState<number>(1);
  const [machineId, setMachineId] = useState<string>("");
  const [sensor, setSensor] = useState<string>("");
  const [sensorId, setSensorId] = useState<string>("");
  const [startDate, setStartDate] = useState<Date | undefined>();
  const [endDate, setEndDate] = useState<Date | undefined>();
  const [historydata, setHistoryData] = useState<History[]>([]);

  const datasets = [...Array(1)].map((_, i) => {
    const values = data.map((d) => d.y);
    const max = values.length > 0 ? Math.max(...values) : 0;
    const avg =
      values.length > 0 ? values.reduce((a, b) => a + b, 0) / values.length : 0;
    const min = values.length > 0 ? Math.min(...values) : 0;
    const [, , , sensor] = location.pathname.split("/");

    return {
      id: `${sensorId}`,
      name: `${sensor}`,
      data: data.map((d) => ({ x: d.x, y: d.y })),
      max: Number(max.toFixed(3)),
      avg: Number(avg.toFixed(3)),
      min: Number(min.toFixed(3)),
    };
  });

  const handleDateChange = useCallback(
    (dates: any, dateStrings: [string, string]) => {
      if (dates && dates.length === 2 && dates[0] && dates[1]) {
        setStartDate(dates[0].toDate());
        setEndDate(dates[1].toDate());
      }
    },
    []
  );

  useEffect(() => {
    const pathname = location.pathname;
    const [, , machineid, sensor, id] = pathname.split("/");

    // sensor == "rpm"
    //   ? setSensor("velocity")
    //   : sensor == "air-in"
    //   ? setSensor("air_in_kpa")
    //   : sensor == "air-out-kpa"
    //   ? setSensor("air_out_kpa")
    //   : sensor == "air-out-mpa"
    //   ? setSensor("air_out_mpa")
    //   : setSensor(`${sensor}`);
    setSensor(`${sensor}`);
    setSensorId(`${id}`);
    setMachineId(`${machineid}`);
  }, [location.pathname]);

  const getHistoryData = async () => {
    console.log("요청했다멍");

    const startTime = startDate?.toISOString();
    const endTime = endDate?.toISOString();

    await axios
      .get(
        `https://semse.info/api/machine/${machineId}/history/${sensor}/${sensorId}/${startTime}/${endTime}`
      )
      .then((response) => {
        console.log("성공이다람쥐", response.data);
        let currentDate = ""; // 현재 날짜를 저장하는 변수
        const nowData = response.data.data.map((item: any, index: number) => {
          const date = item.x.split("/")[0]; // 날짜 부분 추출
          const time = item.x.split("/")[1]; // 시간 부분 추출

          let x;
          if (currentDate !== date) {
            // 날짜가 바뀌면 날짜와 시간을 함께 저장
            currentDate = date;
            // x = item.x; // 날짜와 시간 전체를 저장
            x = item.x.replace(/^../, ""); // 날짜와 시간 전체를 저장
          } else {
            // 날짜가 동일하면 시간만 저장
            x = time; // 시간만 저장
          }

          return {
            x: x,
            y: parseFloat(item.y), // y 값을 숫자로 변환하여 저장
          };
        });

        setData(nowData);
      })
      .catch((error) => {
        // console.error("실패다람쥐", error);
      });
  };
  console.log(sensor);

  const getNowData = async () => {
    console.log("요청했다람쥐");

    const currentDate = new Date();
    const startTime = new Date(
      currentDate.getTime() - 60 * 60 * 1000
    ).toISOString();
    const endTime = currentDate.toISOString();

    await axios
      .get(
        `https://semse.info/api/machine/${machineId}/history/${sensor}/${sensorId}/${startTime}/${endTime}`
      )
      .then((response) => {
        console.log("성공이다람쥐", response.data);
        let currentDate = ""; // 현재 날짜를 저장하는 변수
        const nowData = response.data.data.map((item: any, index: number) => {
          const date = item.x.split("/")[0]; // 날짜 부분 추출
          const time = item.x.split("/")[1]; // 시간 부분 추출

          let x;
          if (currentDate !== date) {
            // 날짜가 바뀌면 날짜와 시간을 함께 저장
            currentDate = date;
            // x = item.x; // 날짜와 시간 전체를 저장
            x = item.x.replace(/^../, ""); // 날짜와 시간 전체를 저장
          } else {
            // 날짜가 동일하면 시간만 저장
            x = time; // 시간만 저장
          }

          return {
            x: x,
            y: parseFloat(item.y), // y 값을 숫자로 변환하여 저장
          };
        });

        setData(nowData);
      })
      .catch((error) => {
        // console.error("실패다람쥐", error);
      });
  };
  const [check, setCheck] = useState(0);

  useEffect(() => {
    getNowData();

    return () => {
      setData([]);
    };
  }, [sensorId]);

  return (
    <div style={{ width: "100%", display: "flex" }}>
      {data.length === 0 ? (
        <Card className={styles.detailcard}>
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
            <h3> 데이터를 불러오는 중입니다...</h3>
          </Box>
        </Card>
      ) : (
        <Card className={styles.detailcard}>
          <CardContent>
            <div style={{ height: "32.5vh" }}>
              <DetailChart datasets={datasets} legend={false} />
            </div>
          </CardContent>
        </Card>
      )}
      <Card className={styles.detaildate}>
        <CardContent>
          <div style={{ height: "32.5vh", marginTop: "0%" }}>
            <div className={styles.data}>
              <div className={styles.max}>
                <h1 style={{ marginBottom: "0%" }}>{datasets[0].max}</h1>
                <p>Maximum Value</p>
              </div>
              <div className={styles.avg}>
                <h1 style={{ marginBottom: "0%" }}>{datasets[0].avg}</h1>
                <p>Average Value</p>
              </div>
              <div className={styles.min}>
                <h1 style={{ marginBottom: "0%" }}>{datasets[0].min}</h1>
                <p>Minimum Value</p>
              </div>
            </div>
            <br />
            <div
              style={{
                display: "flex",
                justifyContent: "center",
              }}
            >
              <Space direction="vertical" size={12} style={{ width: "80%" }}>
                <RangePicker showTime onChange={handleDateChange} />
              </Space>
            </div>
            <br />
            <br />
            <div style={{ display: "flex", justifyContent: "center" }}>
              <Space direction="vertical" style={{ width: "80%" }}>
                <Button block onClick={getHistoryData}>
                  검색하기
                </Button>
                {/* <Button type="text" block onClick={handleRealTimeButtonClick}> */}
                <Button block onClick={getNowData}>
                  현재 기준으로 보기
                </Button>
              </Space>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DetailItem;
