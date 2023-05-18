import React, { useState, useEffect } from "react";
import axios from "axios";

import styles from "./MainError.module.css";

interface Message {
  id: string;
  content: string;
}

const MainError: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    const eventSource = new EventSource(
      "https://datadivision.semse.info/subscribe/error"
    );

    eventSource.onmessage = (event) => {
      const newMessage = {
        id: "",
        content: event.data,
      };
      setMessages((prevMessages) => [newMessage, ...prevMessages]);
    };

    eventSource.onerror = (event) => {
      eventSource.close();
    };

    return () => {
      eventSource.close();
    };
  }, []);

  return (
    <div className={styles.errorbox}>
      <div className={styles.errorboxcontent}>
        {messages.map((message, index) => (
          <div key={index}>{message.content}</div>
        ))}
      </div>
    </div>
  );
};

export default MainError;
