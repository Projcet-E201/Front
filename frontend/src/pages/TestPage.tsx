import React, { useCallback, useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import Stomp from "stompjs";
import SockJS from "sockjs-client";

const TestPage: React.FC = () => {
  const [stompClient, setStompClient] = useState<Stomp.Client | null>(null);
  const [message, setMessage] = useState<any>();
  const { machine = "" } = useParams();

  const [booleanData, setBooleanData] = useState<any[]>([]);
  const [stringData, setStringData] = useState<any[]>([]);
  const [intData, setIntData] = useState<any[]>([]);
  const [doubleData, setDoubleData] = useState<any[]>([]);

  const connectUrl = "http://k8e201.p.ssafy.io:8091/ws";
  // const connectUrl = "http://localhost:8091/ws";

  const disconnetWebSocket = useCallback(() => {
    if (stompClient) {
      stompClient.disconnect(() => "");
      setStompClient(null);
    }
  }, [stompClient]);
  const [error, setError] = useState<any>();
  const [reconnectTimer, setReconnectTimer] = useState<any>();
  const [reconnectTimeLeft, setReconnectTimeLeft] = useState<number>(0);

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

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

  const handleGetMessage = useCallback(() => {
    if (stompClient) {
      stompClient.send(
        `/server/machine/state`,
        {},
        JSON.stringify(parseInt(machine))
      );
    }
  }, [stompClient, machine]);

  useEffect(() => {
    connectWebsocket();
    // connectWithRetry();
    return () => {
      if (stompClient) {
        disconnetWebSocket();
      }
    };
  }, []);

  useEffect(() => {
    // console.log(booleanData, "zzzzzzzzzzzzzzzzzzzz");
    if (stompClient) {
      stompClient.subscribe(`/client/machine/sensor`, (data) => {
        const parsedData = JSON.parse(data.body);
        setMessage(parsedData);
      });
    }
  }, [stompClient]);

  return (
    <div className="App">
      <div>
        <button>test</button>
        <p>{JSON.stringify(message)}</p>
        {/* {message?.map((item: any, index: number) => (
          <div key={index}>
            <p>Machine{Number(item.name.slice(6))}</p>
            <p>시간: {item.time}</p>
            {item?.value?.map((sensor: any, sensorIndex: any) => (
              <div key={sensorIndex}>
                {sensor.MOTOR && <p>Motor: {sensor.MOTOR}</p>}
                {sensor.VACUUM && <p>Vacuum: {sensor.VACUUM}</p>}
                {sensor.AIR_IN_KPA && <p>AirIn: {sensor.AIR_IN_KPA}</p>}
                {sensor.AIR_OUT_KPA && <p>AirOut(kPa): {sensor.AIR_OUT_KPA}</p>}
                {sensor.AIR_OUT_MPA && <p>AirOut(MPa): {sensor.AIR_OUT_MPA}</p>}
                {sensor.LOAD && <p>Load: {sensor.LOAD}</p>}
                {sensor.WATER && <p>Water: {sensor.WATER}</p>}
                {sensor.VELOCITY && <p>Velocity: {sensor.VELOCITY}</p>}
              </div>
            ))}
            <p>-----------------</p>
          </div>
        ))} */}
      </div>
    </div>
  );
};

export default TestPage;
