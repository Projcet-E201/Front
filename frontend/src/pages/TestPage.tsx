import React, { useCallback, useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import Stomp from "stompjs";
import SockJS from "sockjs-client";

const TestPage: React.FC = () => {
  const [message, setMessage] = useState("");

  useEffect(() => {
    const eventSource = new EventSource(
      "http://52.79.42.131:8090/subscribe/error"
    );

    eventSource.onmessage = (event) => {
      setMessage(event.data);
    };

    eventSource.onerror = (event) => {
      console.log("SSE error", event);
      eventSource.close();
    };

    return () => {
      eventSource.close();
    };
  }, []);
  return (
    <div className="App">
      <div>
        <button>test</button>
        <p>{JSON.stringify(message)}</p>
      </div>
    </div>
  );
};

export default TestPage;
