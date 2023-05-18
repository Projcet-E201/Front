import React, { useCallback, useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";

const TestPage: React.FC = () => {
  const [message, setMessage] = useState("");

  useEffect(() => {
    const eventSource = new EventSource(
      "https://datadivision.semse.info/subscribe/1/info"
    );

    eventSource.onmessage = (event) => {
      setMessage(event.data);
    };

    eventSource.onerror = (event) => {
      // console.log("SSE error", event);
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
        <p>{message}</p>
      </div>
    </div>
  );
};

export default TestPage;
