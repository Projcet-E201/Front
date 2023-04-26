import React, { useEffect, useState } from "react";
import SockJS from "sockjs-client";
import { Client, Message } from "@stomp/stompjs";

const connectUrl = "http://localhost:8080/ws";
const TestPage = () => {
  const [client, setClient] = useState(null);
  const [isConnected, setIsConnected] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const socket = new SockJS(connectUrl);
    const stompClient = new Client({
      webSocketFactory: () => socket,
      debug: (str) => console.log(str),
      reconnectDelay: 5000,
      heartbeatIncoming: 4000,
      heartbeatOutgoing: 4000,
    });

    stompClient.onConnect = (frame) => {
      console.log("connected");
      setIsConnected(true);
      stompClient.subscribe("/send/server", (message) => {
        console.log("메세지 받음", message.body);
        setMessage(message.body);
      });
    };

    stompClient.onWebSocketClose = () => {
      console.log("disconnected");
      setIsConnected(false);
    };

    stompClient.activate();
    setClient(stompClient);

    return () => {
      if (client) {
        client.deactivate();
      }
    };
  }, []);

  useEffect(() => {
    if (isConnected) {
      const intervalId = setInterval(() => {
        client.publish({ destination: "/send/client", body: "hello" });
      }, 1000);
      return () => clearInterval(intervalId);
    }
  }, [isConnected]);

  return (
    <div>
      <h1>WebSocket Test</h1>
      <p>{isConnected ? "Connected" : "Not connected"}</p>
      <p>Message: {message}</p>
    </div>
  );
};

export default TestPage;



// export default TestPage;
// import React, { useEffect, useRef, useState } from "react";
// import SockJS from "sockjs-client";

// const connectUrl = `http://localhost:8080/ws`;

// const TestPage = () => {
//   const [sockJsClient, setSockJsClient] = useState<WebSocket | null>(null);
//   const [isConnected, setIsConnected] = useState(false);
//   const [message, setMessage] = useState("");

//   useEffect(() => {
//     const socket = new SockJS(connectUrl);
//     setSockJsClient(socket);
//     socket.onopen = () => {
//       console.log("connected");
//       setIsConnected(true);
//     };

//     socket.onmessage = (event) => {
//       console.log("received message", event.data);
//       setMessage(event.data);
//     };

//     socket.onclose = () => {
//       console.log("disconnected");
//       setIsConnected(false);
//     };

//     return () => {
//       if (sockJsClient) {
//         sockJsClient.close();
//       }
//     };
//   }, []);

//   useEffect(() => {
//     if (isConnected) {
//       const intervalId = setInterval(() => {
//         if (sockJsClient) {
//           sockJsClient.send("hello");
//         }
//       }, 1000);
//       return () => clearInterval(intervalId);
//     }
//   }, [isConnected, sockJsClient]);

//   return (
//     <div>
//       <h1>WebSocket Test</h1>
//       <p>{isConnected ? "Connected" : "Not connected"}</p>
//       <p>Message: {message}</p>
//     </div>
//   );
// };

// export default TestPage;


