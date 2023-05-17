import React, { useState, useEffect } from "react";
import axios from "axios";

import styles from "./MainError.module.css";

interface Message {
  id: string;
  time: string;
  content: string;
}

const MainError: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    console.log("요청했다어흥");
    const eventSource = new EventSource(
      // "http://localhost:8090/subscribe/error"
      "https://semse.info/subscribe/error"
    );

    eventSource.onmessage = (event) => {
      console.log("요청왔다어흥");
      setMessages(event.data);
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
      <table>
        <tbody>
          {messages.map((message) => (
            <tr key={message.id} className={styles.errorstyle}>
              {message.time && <td>[{message.time}]</td>}
              <td>{message.content}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MainError;
