import React, { useState, useEffect } from "react";
import axios from "axios";

import styles from "./MainError.module.css";

interface Message {
  id: string;
  time: string;
  content: string;
}

const MainError = () => {
  const [messages, setMessages] = useState<Message[]>([]);

  const getErrorData = async () => {
    console.log("요청했다냥");

    await axios

      .get("https://semse.info/api/main/error")

      // .get("http://localhost8091/api/main/machine")
      .then((response) => {
        console.log("성공이다냥", response.data);
        setMessages(response.data);
      })
      .catch((error) => {
        console.error("실패다냥", error);
      });
  };
  useEffect(() => {
    getErrorData();

    const interval = setInterval(() => {
      getErrorData();
    }, 5000);
    return () => {
      clearInterval(interval);
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
