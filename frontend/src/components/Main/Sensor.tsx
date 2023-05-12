import React, { useState, useEffect, useCallback } from "react";
import { useNavigate, useParams } from "react-router-dom";
// DnD 기능
// import { DragDropContext } from "react-beautiful-dnd";

import styles from "./Sensor.module.css";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";

import CardMotorChart from "./CardChart/CardMotorChart";
import CardAirInChart from "./CardChart/CardAirInChart";
import CardVacuumChart from "./CardChart/CardVacuumChart";
//air 출력 2개
import CardAirOutKpaChart from "./CardChart/CardAirOutKpaChart";
import CardAirOutMpaChart from "./CardChart/CardAirOutMpaChart";

import CardWaterChart from "./CardChart/CardWaterChart";
import CardRpmChart from "./CardChart/CardRpmChart";
import CardLoadChart from "./CardChart/CardLoadChart";
import CardAbrasionChart from "./CardChart/CardAbrasionChart";

// import { useParams } from "react-router-dom";
import Stomp from "stompjs";
import SockJS from "sockjs-client";
import derivative from "antd/es/theme/themes/default";

import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

const Sensor = () => {
  const navigate = useNavigate();
  const { machine }: any = useParams();
  const repeat = [1, 2, 3, 4, 5, 6, 7, 8, 9];

  //socket
  const [stompClient, setStompClient] = useState<Stomp.Client | null>(null);
  const [message, setMessage] = useState<any>();

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [error, setError] = useState<any>();
  const [reconnectTimer, setReconnectTimer] = useState<any>();
  const [reconnectTimeLeft, setReconnectTimeLeft] = useState<number>(0);

  // const connectUrl = "http://k8e201.p.ssafy.io:8091/ws";
  const connectUrl = "https://semse.info/api/ws-sensor";
  // const connectUrl = "https://k8e201.p.ssafy.io:8091/ws";
  // const connectUrl = "http://localhost:8091/ws";

  const disconnetWebSocket = useCallback(() => {
    if (stompClient) {
      stompClient.disconnect(() => "");
      setStompClient(null);
    }
  }, [stompClient]);

  const connectWebsocket = () => {
    const socket = new SockJS(connectUrl);
    const stompClient = Stomp.over(socket);
    setOpen(false);
    stompClient.connect(
      {},
      () => {
        setStompClient(stompClient);
        setError(undefined);
        // 연결이 성공하면 reconnectTimer 해제
        if (reconnectTimer) clearTimeout(reconnectTimer);
        setReconnectTimeLeft(0);
      },
      (err) => {
        console.error(err, "에러에러에러");
        setError("error");
        setOpen(true);
        // 연결이 실패하면 5초 후에 재연결 시도
        let timeLeft = 5000;
        const timer = setInterval(() => {
          timeLeft -= 1000;
          setReconnectTimeLeft(timeLeft);
          if (timeLeft <= 0) {
            clearInterval(timer);
            connectWebsocket();
            setError("");
          }
        }, 1000);
        setReconnectTimer(timer);
        setReconnectTimeLeft(timeLeft);
      }
    );
  };

  const handleGetSensor = useCallback(() => {
    if (stompClient) {
      stompClient.send(
        `/server/machine/sensor`,
        {},
        JSON.stringify(parseInt(machine))
      );
    }
  }, [stompClient, machine]);

  useEffect(() => {
    connectWebsocket();
    return () => {
      if (stompClient) {
        disconnetWebSocket();
      }
    };
  }, []);

  const [motorData, setMotorData] = useState<any[]>([]);
  const [vacuumData, setVacuumData] = useState<any[]>([]);
  const [airInData, setAirInData] = useState<any[]>([]);
  const [airOutKpaData, setAirOutKpaData] = useState<any[]>([]);
  const [airOutMpaData, setAirOutMpaData] = useState<any[]>([]);
  const [waterData, setWaterData] = useState<any[]>([]);
  const [loadData, setLoadData] = useState<any[]>([]);
  const [velocityData, setVelocityData] = useState<any[]>([]);
  const [abrasionData, setAbrasionData] = useState<any[]>([]);

  useEffect(() => {
    // console.log(booleanData, "zzzzzzzzzzzzzzzzzzzz");
    if (stompClient) {
      stompClient.subscribe(`/client/machine/sensor`, (data) => {
        const parsedData = JSON.parse(data.body);
        if (parsedData.length > 0) {
          setMessage(parsedData);
          // console.log(parsedData[0].MOTOR, "zzzz");
          const motorDataArray = new Array(10).fill(null);
          for (const [key, value] of Object.entries(parsedData[0].MOTOR)) {
            if (key.startsWith("motor")) {
              const id = parseInt(key.slice(7));
              // 순서대로 array에 넣기
              // console.log(key, "key");
              // console.log(value, "value");
              motorDataArray[id - 1] = { x: key, y: value };
            }
            // console.log(key, "key");
            // console.log(value, "value");
            // console.log("---------------------");
          }
          setMotorData(motorDataArray);
        }
      });
    }
  }, [stompClient]);

  // 주소 바뀌면 새로 가져오깅
  useEffect(() => {
    // setBooleanData([]);
    // setIntData([]);
    // setDoubleData([]);
    // setFirstBoolean([]);
    // setSecondBoolean([]);
  }, [machine]);

  useEffect(() => {
    const interval = setInterval(() => {
      handleGetSensor();
    }, 3000);

    return () => clearInterval(interval);
  }, [handleGetSensor]);

  // console.log(message[0], "message!!");

  return (
    <div>
      <div>
        {/* <h3>센서 컴포넌트 입니다.</h3> */}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "space-between",
          }}
        >
          {repeat.map((item, index) => (
            <Card
              key={index}
              className={
                index < 2
                  ? styles.topcard
                  : index >= 2 && index < 5
                  ? styles.midcard
                  : styles.botcard
              }
              // onClick={() => navigate("/")}
            >
              <CardContent>
                {index === 0 && (
                  <div
                    onClick={() => navigate(`/machine/${machine}/motor`)}
                    style={{ width: "auto", height: "23vh" }}
                  >
                    {/* motorData가 []이면 연결조차 되지 않았다는 것이고
                null로 채워져 있으면 연결을 되었지만 데이터를 받아오지 못했다는 것이고 */}

                    {motorData.length === 0 ? (
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
                        <h3>Motor 데이터를 불러오는 중 입니다...</h3>
                      </Box>
                    ) : (
                      <div style={{ height: "100%" }}>
                        <h3 style={{ margin: "0" }}>Motor Toque(%)</h3>

                        <CardMotorChart motorData={motorData} />
                      </div>
                    )}
                  </div>
                )}
                {index === 1 && (
                  <div
                    onClick={() => navigate(`air-in`)}
                    style={{ width: "auto", height: "23vh" }}
                  >
                    <h3 style={{ margin: "0" }}>Air입력(kPa)</h3>
                    <CardAirInChart />
                  </div>
                )}
                {index === 2 && (
                  <div
                    onClick={() => navigate(`/machine/${machine}/vacuum`)}
                    style={{ width: "auto", height: "23vh" }}
                  >
                    <h3 style={{ margin: "0" }}>Vacuum입력(kPa)</h3>
                    <CardVacuumChart />
                  </div>
                )}
                {index === 3 && (
                  <div
                    onClick={() => navigate(`air-out-kpa`)}
                    style={{ width: "auto", height: "23vh" }}
                  >
                    <h3 style={{ margin: "0" }}>Air출력(kPa)</h3>
                    <CardAirOutKpaChart />
                  </div>
                )}
                {index === 4 && (
                  <div
                    onClick={() => navigate(`air-out-mpa`)}
                    style={{ width: "auto", height: "23vh" }}
                  >
                    <h3 style={{ margin: "0" }}>Air출력(MPa)</h3>
                    <CardAirOutMpaChart />
                  </div>
                )}
                {index === 5 && (
                  <div
                    onClick={() => navigate(`water`)}
                    style={{ width: "auto", height: "23vh" }}
                  >
                    <h3 style={{ margin: "0" }}>Water출력(L/min)</h3>
                    <CardWaterChart />
                  </div>
                )}
                {index === 6 && (
                  <div
                    onClick={() => navigate(`rpm`)}
                    style={{ width: "auto", height: "23vh" }}
                  >
                    <h3 style={{ margin: "0" }}>기구부 회전속도(/min)</h3>
                    <CardRpmChart />
                  </div>
                )}
                {index === 7 && (
                  <div
                    onClick={() => navigate(`load`)}
                    style={{ width: "auto", height: "23vh" }}
                    // style={{ width: "auto", height: "50.5vh" }}
                  >
                    <h3 style={{ margin: "0" }}>기구부 부하량(Ampere)</h3>
                    <CardLoadChart />
                  </div>
                )}
                {index === 8 && (
                  <div
                    onClick={() => navigate(`abrasion`)}
                    style={{ width: "auto", height: "23vh" }}
                  >
                    <h3 style={{ margin: "0" }}>기구부 마모량(mm)</h3>
                    <CardAbrasionChart />
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Sensor;
