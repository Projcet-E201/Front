import React, { useEffect } from "react";
import Stomp from "stompjs";
import SockJS from "sockjs-client";

const TestPage = () => {
  useEffect(() => {
    // SockJS와 Stomp 클라이언트 객체 생성
    const socket = new SockJS("ws://localhost:8080/ws");
    const stompClient = Stomp.over(socket);

    // SockJS를 사용하여 WebSocket 연결 생성
    socket.onopen = () => {
      console.log("WebSocket 연결 성공");
    };

    // Stomp 클라이언트를 사용하여 SockJS WebSocket 연결 초기화
    stompClient.connect(
      {},
      () => {
        console.log("Stomp 연결 성공");

        // WebSocket을 통해 메시지 수신
        stompClient.subscribe("/client/get", (msg) => {
          console.log("메시지 수신: ", msg.body);
        });
      },
      (error) => {
        console.log("Stomp 연결 실패: ", error);
      }
    );

    // 컴포넌트 언마운트시 연결 종료
    return () => {
      // stompClient.disconnect();
      console.log("Stomp 연결 종료");
    };
  }, []);

  return (
    <div>
      <h1>hello</h1>
    </div>
  );
};

export default TestPage;
