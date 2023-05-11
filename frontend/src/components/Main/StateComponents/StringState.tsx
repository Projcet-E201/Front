import React, { useState, useEffect } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import styles from "./StringState.module.css";

// interface Message {
//   id: string;
//   time: string;
//   content: string;
// }

const StringState = ({ data }: any) => {
  const [messages, setMessages] = useState<any>([]);
  console.log(data);
  // const [messages, setMessages] = useState<Message[]>(
  //   Array.from({ length: 10 }, (_, i) => {
  //     const id = `S${i + 1}`;
  //     return { id, time: "", content: "" };
  //   })
  // );

  // useEffect(() => {
  //   const intervalIds = Array.from({ length: 10 }, (_, i) => {
  //     const id = `S${i + 1}`;
  //     return setInterval(() => {
  //       const date = new Date();
  //       const time = date.toLocaleString();
  //       const content = `새로운 String data 생성 -${id}`;
  //       setMessages((prevMessages) => {
  //         const newMessages = [...prevMessages];
  //         const index = i % 10;
  //         newMessages[index] = { id, time, content };
  //         return newMessages;
  //       });
  //     }, (i + 1) * 1000); // 각 id마다 주기를 다르게 설정 (1초부터 10초까지)
  //   });
  //   return () => {
  //     intervalIds.forEach(clearInterval);
  //   };
  // }, []);

  return (
    <div style={{ width: "100%", margin: "0", height: "100%" }}>
      {data.length > 0 ? (
        <table
          style={{
            borderCollapse: "collapse",
            width: "100%",
            // marginTop: "1rem",
            height: "90%",
          }}
        >
          <thead>
            <tr>
              <th
                style={{
                  padding: "0.5rem",
                  border: "1px solid black",
                  width: "14%",
                }}
              >
                State ID
              </th>
              <th
                style={{
                  padding: "0.5rem",
                  border: "1px solid black",
                  width: "25%",
                }}
              >
                Time
              </th>
              <th style={{ padding: "0.5rem", border: "1px solid black" }}>
                Issue
              </th>
            </tr>
          </thead>
          <tbody>
            {data.map((message: any, index: number) => (
              <tr key={index}>
                <td
                  style={{
                    padding: "0.5rem",
                    border: "1px solid black",
                    textAlign: "center",
                  }}
                >
                  {message.id}
                </td>
                <td
                  style={{
                    padding: "0.5rem",
                    border: "1px solid black",
                    textAlign: "center",
                  }}
                >
                  {message.time}
                </td>
                <td
                  style={{
                    padding: "0.5rem",
                    border: "1px solid black",
                    textAlign: "center",
                  }}
                >
                  {message.content}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <Box
          sx={{
            height: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <CircularProgress />
          <h3>String 데이터를 불러오는 중 입니다...</h3>
        </Box>
      )}
    </div>
  );
};

export default StringState;
