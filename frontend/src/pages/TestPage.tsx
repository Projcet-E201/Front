import React, { useState, useEffect } from "react";
import Stomp from "stompjs";

const TestPage = () => {
  const [data, setData] = useState<string>("");

  useEffect(() => {
    const socket = new WebSocket("ws://localhost:8080/data-websocket");
    const stompClient = Stomp.over(socket);

    // WebSocket 연결 초기화
    stompClient.connect({}, () => {
      console.log("Connected to WebSocket");
      stompClient.subscribe("/data-websocket/post", (message: Stomp.Message) => {
        setData(message.body as string); // 데이터 수신 시 상태 업데이트
      });
    });

    return () => {
      stompClient.disconnect(); // 컴포넌트 언마운트 시 WebSocket 닫기
    };
  }, []);

  return (
    <div>
      <h1>WebSocket Example</h1>
      <p>Data received: {data}</p>
    </div>
  );
};

export default TestPage;
