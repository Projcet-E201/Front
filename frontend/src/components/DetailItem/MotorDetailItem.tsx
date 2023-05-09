import React, { useCallback, useEffect, useRef, useState } from "react";
import { faker } from "@faker-js/faker";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import MotorDetailChart from "../Chart/DetailChart/MotorDetailChart";
import styles from "./MotorDetailItem.module.css";
import { DatePicker, Space, Button } from "antd";
import Stomp from "stompjs";
import SockJS from "sockjs-client";

const { RangePicker } = DatePicker;

const MotorDetailItem: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [data, setData] = useState<{ x: number; [key: string]: number }[]>([]);
  const [intervalSeconds, setIntervalSeconds] = useState<number>(5);
  const datasets = [...Array(1)].map((_, i) => ({
    id: `Motor${i + 1}`,
    data: data.map((d) => ({ x: d.x, y: d[`Motor${i + 1}`] })),
  }));

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

  //웹소켓 코드 시작

  const connectUrl = "http://k8e201.p.ssafy.io:8091/ws";
  // const connectUrl = "http://localhost:8091/ws";

  const [ws, setWs] = useState<WebSocket | null>(null);
  const [stompClient, setStompClient] = useState<Stomp.Client | null>(null);
  const [message, setMessage] = useState<any>();

  const connectWebSocket = () => {
    console.log(connectUrl);
    const socket = new SockJS(connectUrl);
    const stompClient = Stomp.over(socket);
    stompClient.connect(
      // 헤더
      {},
      () => {
        // 연결 성공시 이벤트
        // console.log("WebSocket connected");
        setStompClient(stompClient);
      },
      (error) => {
        // 연결 실패시 이벤트
        console.error("WebSocket error: ", error);
      }
    );
  };
  const handleRealTimeButtonClick = () => {
    if (ws) {
      ws.send(JSON.stringify({ realTime: true }));
    }
    window.location.reload();
  };

  const handleDateChange = useCallback(() => {
    if (stompClient) {
      stompClient.send(
        "/server/machine/history",
        {},
        JSON.stringify({
          start: "시작 날짜",
          end: "종료 날짜",
        })
      );
    }
  }, [stompClient]);

  const handlehistoryButtonClick = () => {
    if (ws) {
      ws.send(JSON.stringify({ realTime: true }));
    }
  };

  useEffect(() => {
    connectWebSocket();
    return () => {
      if (stompClient) {
        stompClient.disconnect(() => "");
        // stompClient.close();
      }
    };
  }, []);

  useEffect(() => {
    if (stompClient) {
      stompClient.subscribe("/client/machine/history", (data) => {
        setMessage(JSON.parse(data.body));
      });
    }
  }, [stompClient]);

  useEffect(() => {
    const interval = setInterval(() => {
      handleDateChange();
    }, 10000);

    return () => clearInterval(interval);
  }, [handleDateChange]);
  //웹소켓 코드 끝

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
