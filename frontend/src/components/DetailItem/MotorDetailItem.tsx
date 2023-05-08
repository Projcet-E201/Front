import React, { useState, useEffect } from "react";
import { faker } from "@faker-js/faker";

import { useParams, useNavigate, useLocation } from "react-router-dom";

import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import MotorDetailChart from "../Chart/DetailChart/MotorDetailChart";
import styles from "./MotorDetailItem.module.css";
import { DatePicker, Space, Button } from "antd";

const { RangePicker } = DatePicker;

const MotorDetailItem = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [data, setData] = useState<{ x: number; [key: string]: number }[]>([]);
  const [intervalSeconds, setIntervalSeconds] = useState<number>(5);
  const datasets = [...Array(1)].map((_, i) => ({
    id: `Motor${i + 1}`,
    data: data.map((d) => ({ x: d.x, y: d[`Motor${i + 1}`] })),
  }));
  const [ws, setWs] = useState<WebSocket | null>(null);

  useEffect(() => {
    const intervalId = setInterval(() => {
      const currentTime = new Date().toLocaleTimeString("ko-KR", {
        hour12: false,
      });
      const newEntry: any = { x: currentTime };
      for (let i = 1; i <= 1; i++) {
        newEntry[`Motor${i}`] = faker.datatype.number({ min: 10, max: 290 });
      }
      setData((prevData) =>
        prevData.length >= 10
          ? [...prevData.slice(1), newEntry]
          : [...prevData, newEntry]
      );
    }, intervalSeconds * 1000);
    return () => clearInterval(intervalId);
  }, [location, intervalSeconds]);

  useEffect(() => {
    setWs(new WebSocket("ws://localhost:8000")); // WebSocket 생성
    return () => {
      if (ws) {
        ws.close(); // WebSocket 연결 종료
      }
    };
  }, []);
  const handleRealTimeButtonClick = () => {
    if (ws) {
      ws.send(JSON.stringify({ realTime: true }));
    }
    window.location.reload();
  };

  const handleDateChange = (dates: any, dateStrings: [string, string]) => {
    if (ws) {
      ws.send(JSON.stringify({ dates: dateStrings }));
    }
  };

  const handlehistoryButtonClick = () => {
    if (ws) {
      ws.send(JSON.stringify({ realTime: true }));
    }
  };

  return (
    <div style={{ width: "100%" }}>
      <Card className={styles.detailcard}>
        <CardContent>
          <div style={{ height: "33vh" }}>
            <MotorDetailChart datasets={datasets} legend={false} />
          </div>
        </CardContent>
      </Card>
      <Card className={styles.detaildate}>
        <CardContent>
          <div style={{ height: "33vh", marginTop: "0%" }}>
            <div className={styles.data}>
              <div className={styles.max}>
                <h1 style={{ marginBottom: "0%" }}>0.8</h1>
                <p>Maximum Value</p>
              </div>
              <div className={styles.avg}>
                <h1 style={{ marginBottom: "0%" }}>0.5</h1>
                <p>Average Value</p>
              </div>
              <div className={styles.min}>
                <h1 style={{ marginBottom: "0%" }}>0</h1>
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
                <Button block onClick={handlehistoryButtonClick}>
                  검색하기
                </Button>
                <Button type="text" block onClick={handleRealTimeButtonClick}>
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

export default MotorDetailItem;
