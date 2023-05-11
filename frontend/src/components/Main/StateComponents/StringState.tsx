import React, { useState, useEffect } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import styles from "./StringState.module.css";

interface Message {
  id: string;
  time: string;
  content: string;
}

const StringState = ({ data }: any) => {
  // console.log(data, "zxczczxc");
  // console.log(typeof data, "타입");
  const [messages, setMessages] = useState<Message[]>(
    Array.from({ length: 10 }, (_, i) => {
      const id = `S${i + 1}`;
      return { id, time: "", content: "" };
    })
  );

  useEffect(() => {
    const formattedData: Message[] = Object.keys(data).map((key) => ({
      id: key,
      time: data[key].time,
      content: data[key].value,
    }));
    setMessages(formattedData);
  }, [data]);

  console.log(data, "zzxxxxxxxx020202020");

  return (
    <div style={{ width: "100%", margin: "0", height: "100%" }}>
      <p>{data.length}</p>
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
                  {message.value}
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
