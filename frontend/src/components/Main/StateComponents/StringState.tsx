import React, { useState, useEffect } from "react";

const StringState = () => {
  const [messages, setMessages] = useState<{ time: string; content: string }[]>(
    []
  );

  useEffect(() => {
    const intervalId = setInterval(() => {
      const date = new Date();
      const time = date.toLocaleString();
      const content = `새로운 메시지가 생성되었습니다.`;
      setMessages((prevMessages) => {
        const newMessages = [{ time, content }, ...prevMessages.slice(0, 9)];
        return newMessages;
      });
    }, 5000);
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div style={{ width: "100%" }}>
      {/* <h3 style={{ margin: "0" }}>StringState입니다.</h3> */}
      <table style={{ width: "100%" }}>
        <thead>
          <tr style={{ borderBottom: "1px solid black" }}>
            <th style={{ padding: "8px 0" }}>시간</th>
            <th style={{ padding: "8px 0" }}>내용</th>
          </tr>
        </thead>
        <tbody>
          {messages.map((message, index) => (
            <tr key={index}>
              <td
                style={{
                  padding: "8px 0",
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <span>{message.time}</span>
              </td>
              <td
                style={{
                  padding: "8px 0",
                  // display: "flex",
                  justifyContent: "center",
                }}
              >
                <span>{message.content}</span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default StringState;
