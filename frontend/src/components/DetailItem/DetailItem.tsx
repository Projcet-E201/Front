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

const { RangePicker } = DatePicker;

const DetailItem: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [data, setData] = useState<{ x: number; [key: string]: number }[]>([]);
  const [intervalSeconds, setIntervalSeconds] = useState<number>(1);
  const [sensorId, setSensorId] = useState<string>("");
  const [startDate, setStartDate] = useState<Date | undefined>();
  const [endDate, setEndDate] = useState<Date | undefined>();

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

  //웹소켓 코드 시작

  // const connectUrl = "http://k8e201.p.ssafy.io:8091/ws";
  const connectUrl = "http://localhost:8091/ws";

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

  const handlehistoryButtonClick = useCallback(() => {
    if (stompClient) {
      stompClient.send(
        "/server/machine/history",
        {},
        JSON.stringify({
          sensorId: sensorId,
          start: startDate,
          end: endDate,
        })
      );
    }
  }, [stompClient, startDate, endDate]);

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
    //WebSocket으로 데이터 수신
    if (stompClient) {
      const subscription = stompClient.subscribe(
        "/client/machine/history",
        (message) => {
          const data = JSON.parse(message.body);
          setData(data.data.map((d: any) => ({ x: new Date(d.x), y: d.y })));
        }
      );
      return () => subscription.unsubscribe();
    }
  }, [location, intervalSeconds, stompClient]);

  //웹소켓 코드 끝
  console.log(datasets);

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

export default DetailItem;
