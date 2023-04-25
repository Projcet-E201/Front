import React, { useState, useEffect } from "react";

const TestPage = () => {
  const [data, setData] = useState([]);
  useEffect(() => {
    const ws = new WebSocket(`ws://localhost:8080/server1`);
    ws.onmessage = (event: MessageEvent) => {
      setData(JSON.parse(event.data));
    };
    return () => {
      ws.close();
    };
  });
  return (
    <div>
      <h1>{data}</h1>
    </div>
  );
};

export default TestPage;
