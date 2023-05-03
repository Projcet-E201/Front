import React, { useCallback, useEffect, useRef, useState } from "react";
import Stomp from "stompjs";
import SockJS from "sockjs-client";

const TestPage: React.FC = () => {
  const [stompClient, setStompClient] = useState<Stomp.Client | null>(null);
  const [message, setMessage] = useState<any>();

  const connectUrl = "http://api:8091/ws";
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

  const handleTitleModify = useCallback(() => {
    if (stompClient) {
      // stompClient.send(`/server/post`, {}, JSON.stringify({ data: "data" }));
      stompClient.send(
        `/server/main/machine`,
        {},
        JSON.stringify({ data: "data" })
      );
    }
  }, [stompClient]);

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
    // server 에서 보내는 데이터를 실시간으로 받는 코드
    if (stompClient) {
      // console.log("stompClient2");
      stompClient.subscribe(`/client/main/machine`, (data) => {
        // console.log(data);
        setMessage(JSON.parse(data.body)); // JSON.parse() 함수를 사용하여 데이터를 파싱합니다.
        // setMessage(data.body); // JSON.parse() 함수를 사용하여 데이터를 파싱합니다.
      });
    }
  }, [stompClient]);

  useEffect(() => {
    const interval = setInterval(() => {
      handleTitleModify();
    }, 5000);

    return () => clearInterval(interval);
  }, [handleTitleModify]);

  // console.log(message);

  return (
    <div className="App">
      <div>
        <button>test</button>
        {message?.map((item: any, index: number) => (
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
        ))}
      </div>
    </div>
  );
};

export default TestPage;
