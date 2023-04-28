import React, { useState, useEffect } from "react";

import styles from "./MainError.module.css";

interface Message {
  id: string;
  time: string;
  content: string;
}

const StringState = () => {
  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    let count = 0;
    const intervalId = setInterval(() => {
      const date = new Date();
      const time = date.toLocaleString();
      const content = `Machine1 > Motor > Motor ${
        count + 1
      }  에러 발생했습니다.`;
      setMessages((prevMessages) => [
        { id: `S${count}`, time, content },
        ...prevMessages.slice(0, 4),
      ]);
      count = (count + 1) % 5;
    }, 2000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div style={{ width: "100%", margin: "0" }}>
      {/* <h3 style={{ margin: "0" }}>StringState입니다.</h3> */}

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

export default StringState;
