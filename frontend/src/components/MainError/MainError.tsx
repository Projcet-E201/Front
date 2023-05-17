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
    console.log("요청했다어흥");
    const eventSource = new EventSource(
      "http://52.79.42.131:8090/subscribe/error"
    );

    eventSource.onmessage = (event) => {
      console.log("요청왔다어흥", event.data);

      const newMessage = {
        id: "",
        content: event.data,
      };
      setMessages((prevMessages) => [newMessage, ...prevMessages]);
    };

    eventSource.onerror = (event) => {
      console.log("요청실패어흥", event);
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
