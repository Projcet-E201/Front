import React, { useCallback, useEffect, useRef, useState } from "react";
import Stomp from "stompjs";
import SockJS from "sockjs-client";

const TestPage = () => {
  const [stompClient, setStompClient] = useState(null);
  const connectUrl = "http://localhost:8080/ws";
  const [message, setMessage] = useState("")

  const connectWebSocket = () => {
    console.log(connectUrl);
    const socket = new SockJS(connectUrl);
    const stompClient = Stomp.over(socket);
    stompClient.connect(
      // 헤더
      {},
      () => {
        // 연결 성공시 이벤트
        console.log("WebSocket connected");
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
      stompClient.send(`/server/post`, {}, JSON.stringify({ data: "data" }));
    }
  }, [stompClient]);

  useEffect(() => {
    connectWebSocket();
    return () => {
      if (stompClient) {
        stompClient.disconnect();
        // stompClient.close();
      }
    };
  }, []);

  useEffect(() => {
    // server 에서 보내는 데이터를 실시간으로 받는 코드
    if (stompClient) {
      console.log("stompClient2");
      stompClient.subscribe(`/client/get`, (data) => {
        console.log(data);
        setMessage(data.body)
      });
    }
  }, [stompClient]);

  useEffect(() => {
    const interval = setInterval(() => {
      handleTitleModify();
    }, 1000);

    return () => clearInterval(interval);
  }, [handleTitleModify]);

  return (
    <div className="App">
      <div>
        <button onClick={handleTitleModify}>test</button>
        <p>{message}</p>
      </div>
    </div>
  );
};

export default TestPage;
