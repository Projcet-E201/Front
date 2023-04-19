import React, { useState, useEffect } from "react";

const StringState = () => {
  const [messages, setMessages] = useState<string[]>([]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      const date = new Date();
      const message = `새로운 메시지가 생성되었습니다. (${date.toLocaleString()})`;
      setMessages((prevMessages) => {
        const newMessages = [message, ...prevMessages.slice(0, 9)];
        return newMessages;
      });
    }, 5000);
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div>
      <h3 style={{ margin: "0" }}>StringState입니다.</h3>
      <ul>
        {messages.map((message, index) => (
          <li key={index}>{message}</li>
        ))}
      </ul>
    </div>
  );
};

export default StringState;
