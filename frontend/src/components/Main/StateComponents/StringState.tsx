import React, { useState, useEffect } from "react";

import styles from "./StringState.module.css";

interface Message {
  id: string;
  time: string;
  content: string;
}

const StringState = () => {
  const [messages, setMessages] = useState<Message[]>(
    Array.from({ length: 10 }, (_, i) => {
      const id = `S${i + 1}`;
      return { id, time: "", content: "" };
    })
  );

  useEffect(() => {
    const intervalIds = Array.from({ length: 10 }, (_, i) => {
      const id = `S${i + 1}`;
      return setInterval(() => {
        const date = new Date();
        const time = date.toLocaleString();
        const content = `새로운 메시지가 생성되었습니다.${id}`;
        setMessages((prevMessages) => {
          const newMessages = [...prevMessages];
          const index = i % 10;
          newMessages[index] = { id, time, content };
          return newMessages;
        });
      }, (i + 2) * 1000); // 각 id마다 주기를 다르게 설정 (1초부터 10초까지)
    });
    return () => {
      intervalIds.forEach(clearInterval);
    };
  }, []);

  return (
    <div style={{ width: "100%", margin: "0" }}>
      {/* <h3 style={{ margin: "0" }}>StringState입니다.</h3> */}
      <table
        style={{
          borderCollapse: "collapse",
          width: "100%",
          marginTop: "1rem",
        }}
      >
        <thead>
          <tr>
            <th style={{ padding: "0.5rem", border: "1px solid black" }}>
              Machine ID
            </th>
            <th style={{ padding: "0.5rem", border: "1px solid black" }}>
              Time
            </th>
            <th style={{ padding: "0.5rem", border: "1px solid black" }}>
              Content
            </th>
          </tr>
        </thead>
        <tbody>
          {messages.map((message, index) => (
            <tr key={index}>
              <td style={{ padding: "0.5rem", border: "1px solid black" }}>
                {message.id}
              </td>
              <td style={{ padding: "0.5rem", border: "1px solid black" }}>
                {message.time}
              </td>
              <td style={{ padding: "0.5rem", border: "1px solid black" }}>
                {message.content}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default StringState;
