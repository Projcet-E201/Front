import React, { useCallback, useEffect, useRef, useState } from "react";
import { faker } from "@faker-js/faker";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import DetailChart from "../Chart/DetailChart/DetailChart";
import styles from "./DetailItem.module.css";
import { DatePicker, Space, Button } from "antd";
import Stomp from "stompjs";
import SockJS from "sockjs-client";
import axios from "axios";

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
  const [sensorId, setSensorId] = useState<string>("");
  const [startDate, setStartDate] = useState<Date | undefined>();
  const [endDate, setEndDate] = useState<Date | undefined>();
  const [historydata, setHistoryData] = useState<History>();

  const datasets = [...Array(1)].map((_, i) => {
    const values = data.map((d) => d[`${sensorId}`]);
    const max = values.length > 0 ? Math.max(...values) : 0;
    const avg =
      values.length > 0 ? values.reduce((a, b) => a + b, 0) / values.length : 0;
    const min = values.length > 0 ? Math.min(...values) : 0;
    const [, , , sensor] = location.pathname.split("/");

    return {
      id: `${sensorId}`,
      name: `${sensor}`,
      data: data.map((d) => ({ x: d.x, y: d[`${sensorId}`] })),
      max: Number(max.toFixed(3)),
      avg: Number(avg.toFixed(3)),
      min: Number(min.toFixed(3)),
    };
  });

  const handleDateChange = useCallback(
    (dates: any, dateStrings: [string, string]) => {
      setStartDate(dates[0].toDate());
      setEndDate(dates[1].toDate());
    },
    []
  );

  useEffect(() => {
    const pathname = location.pathname;
    const [, , , sensor, id] = pathname.split("/");
    setSensorId(`${sensor}${id}`);
  }, [location.pathname]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      const pathname = location.pathname;
      const [, , , sensor, id] = pathname.split("/");
      const currentTime = new Date().toLocaleTimeString("ko-KR", {
        hour12: false,
      });
      const newEntry: any = { x: currentTime };
      for (let i = 1; i <= 1; i++) {
        newEntry[`${sensor}${id}`] = faker.datatype.number({
          min: 10,
          max: 290,
        });
      }
      setData((prevData) =>
        prevData.length >= 10
          ? [...prevData.slice(1), newEntry]
          : [...prevData, newEntry]
      );
    }, intervalSeconds * 1000);
    return () => clearInterval(intervalId);
  }, [location, intervalSeconds]);

  const getHistorytData = async () => {
    console.log("요청했다냥");

    await axios

      .get("https://semse.info/api/machine/history")

      // .get("http://localhost8091/api/main/machine")
      .then((response) => {
        console.log("성공이다냥", response.data);
        setHistoryData(response.data);
      })
      .catch((error) => {
        console.error("실패다냥", error);
      });
  };

  return (
    <div style={{ width: "100%" }}>
      <Card className={styles.detailcard}>
        <CardContent>
          <div style={{ height: "33vh" }}>
            <DetailChart datasets={datasets} legend={false} />
          </div>
        </CardContent>
      </Card>
      <Card className={styles.detaildate}>
        <CardContent>
          <div style={{ height: "33vh", marginTop: "0%" }}>
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
                {/* <Button block onClick={getHistorytData}>
                  검색하기
                </Button>
                <Button type="text" block onClick={handleRealTimeButtonClick}>
                  실시간 보기
                </Button> */}
                <Button block>검색하기</Button>
                <Button type="text" block>
                  실시간 보기
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
