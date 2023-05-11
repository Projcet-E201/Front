import React, { useState, useEffect, useCallback } from "react";

import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { useParams } from "react-router-dom";

import { Modal, Box, Typography, Link } from "@mui/material";

import styles from "./State.module.css";

// 각 컴포넌트 불러오기
import BooleanState from "./StateComponents/BooleanState";
import StringState from "./StateComponents/StringState";
import DoubleState from "./StateComponents/DoubleState";
import IntState from "./StateComponents/IntState";

// socket 통신
import Stomp from "stompjs";
import SockJS from "sockjs-client";

const State = () => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const { machine = "" } = useParams();
  const [stompClient, setStompClient] = useState<Stomp.Client | null>(null);
  const [message, setMessage] = useState<any>();

  const [booleanData, setBooleanData] = useState<any[]>([]);
  const [stringData, setStringData] = useState<any[]>([]);
  const [intData, setIntData] = useState<any[]>([]);
  const [doubleData, setDoubleData] = useState<any[]>([]);

  // const connectUrl = "http://k8e201.p.ssafy.io:8091/ws";
  const connectUrl = "https://semse.info/api/ws";
  // const connectUrl = "https://k8e201.p.ssafy.io:8091/ws";
  // const connectUrl = "http://localhost:8091/ws";

  const disconnetWebSocket = useCallback(() => {
    if (stompClient) {
      stompClient.disconnect(() => "");
      setStompClient(null);
    }
  }, [stompClient]);
  const [error, setError] = useState<any>();
  const [reconnectTimer, setReconnectTimer] = useState<any>();
  const [reconnectTimeLeft, setReconnectTimeLeft] = useState<number>(0);

  const connectWebsocket = () => {
    const socket = new SockJS(connectUrl);
    const stompClient = Stomp.over(socket);
    setOpen(false);
    stompClient.connect(
      {},
      () => {
        setStompClient(stompClient);
        setError(undefined);
        // 연결이 성공하면 reconnectTimer 해제
        if (reconnectTimer) clearTimeout(reconnectTimer);
        setReconnectTimeLeft(0);
      },
      (err) => {
        console.error(err, "에러에러에러");
        setError("error");
        setOpen(true);
        // 연결이 실패하면 5초 후에 재연결 시도
        let timeLeft = 5000;
        const timer = setInterval(() => {
          timeLeft -= 1000;
          setReconnectTimeLeft(timeLeft);
          if (timeLeft <= 0) {
            clearInterval(timer);
            connectWebsocket();
            setError("");
          }
        }, 1000);
        setReconnectTimer(timer);
        setReconnectTimeLeft(timeLeft);
      }
    );
  };

  const handleGetState = useCallback(() => {
    if (stompClient) {
      stompClient.send(
        `/server/machine/state`,
        {},
        JSON.stringify(parseInt(machine))
      );
    }
  }, [stompClient, machine]);

  useEffect(() => {
    connectWebsocket();
    // connectWithRetry();
    return () => {
      if (stompClient) {
        disconnetWebSocket();
      }
    };
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      handleGetState();
    }, 5000);

    return () => clearInterval(interval);
  }, [handleGetState]);

  // const firstHalf = booleanData.slice(0, 5);
  // const secondHalf = booleanData.slice(5, 10);
  const [firstBoolean, setFirstBoolean] = useState<any>([]);
  const [secondBoolean, setSecondBoolean] = useState<any>([]);

  useEffect(() => {
    // console.log(booleanData, "zzzzzzzzzzzzzzzzzzzz");
    if (stompClient) {
      stompClient.subscribe(`/client/machine/state`, (data) => {
        const parsedData = JSON.parse(data.body);
        if (parsedData.length > 0) {
          // 수정된 부분
          setMessage(parsedData);

          const booleanDataArray = new Array(10).fill(null);
          for (const [key, value] of Object.entries(parsedData[0])) {
            if (key.startsWith("boolean")) {
              const id = parseInt(key.slice(7));
              // 순서대로 array에 넣기
              booleanDataArray[id - 1] = { id: id, value: value };
            }
          }
          // setBooleanData(booleanDataArray);
          setFirstBoolean(booleanDataArray.slice(0, 5));
          setSecondBoolean(booleanDataArray.slice(5, 10));

          const intDataArray = new Array(10).fill(null);
          for (const [key, value] of Object.entries(parsedData[2])) {
            if (key.startsWith("int")) {
              const id = parseInt(key.slice(3));
              intDataArray[id - 1] = {
                id: key,
                name: `I${id}`,
                value: value,
                color: (id - 1) % 2 === 0 ? "#C1EAF3" : "#5CC2F2",
              };
            }
          }
          setIntData(intDataArray);

          const doubleDataArray = new Array(10).fill(null);
          for (const [key, value] of Object.entries(parsedData[1])) {
            if (key.startsWith("double")) {
              const id = parseInt(key.slice(6));
              doubleDataArray[id - 1] = {
                id: key,
                name: `D${id}`,
                value: value,
                color: (id - 1) % 2 === 0 ? "#C1EAF3" : "#5CC2F2",
              };
            }
          }
          setDoubleData(doubleDataArray);

          const stringDataArray = new Array(10).fill(null);
          // for (const [key, value] of Object.entries(parsedData[3])) {
          //   if (key.startsWith("string")) {
          //     const id = parseInt(key.slice(6));
          //     stringDataArray[id - 1] = {
          //       id: key,
          //       name: `S${id}`,
          //       value: value,
          //     };
          //   }
          // }

          setStringData(parsedData[3]);
        }
      });
    }
  }, [stompClient]);

  // 주소 바뀌면 새로 가져오깅
  useEffect(() => {
    setBooleanData([]);
    setIntData([]);
    setDoubleData([]);
    setStringData([]);
    setFirstBoolean([]);
    setSecondBoolean([]);
  }, [machine]);

  useEffect(() => {
    if (stompClient) {
      handleGetState();
    }
  }, [stompClient]);

  return (
    <div>
      {error !== "error" ? (
        <div className={styles.state}>
          <div className={styles.left}>
            <div className={styles.boolean}>
              {/* <h3>여기는 Bool state</h3> */}
              <div>
                {/* <p>bool 1</p> */}
                <Card
                  className={styles.card}
                  style={{ height: "17vh", minHeight: "159.28px" }}
                >
                  <CardContent
                    sx={{
                      // height: "100%",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <BooleanState
                      // data={firstHalf}
                      data={firstBoolean}
                      error={error}
                      time={reconnectTimeLeft}
                    />
                  </CardContent>
                </Card>
              </div>
              <div>
                {/* <p>bool 2</p> */}
                <Card
                  className={styles.card}
                  style={{ height: "17vh", minHeight: "159.28px" }}
                >
                  <CardContent
                    sx={{
                      // height: "100%",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <BooleanState
                      // data={secondHalf}
                      data={secondBoolean}
                      error={error}
                      time={reconnectTimeLeft}
                    />
                  </CardContent>
                </Card>
              </div>
            </div>
            <div className={styles.string}>
              {/* <h3>여기는 string</h3> */}
              <Card
                className={styles.card}
                style={{ height: "50vh", minHeight: "468.5px" }}
              >
                <CardContent
                  sx={{
                    height: "40vh",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  {/* <p>string type</p> */}
                  <StringState data={stringData} />
                </CardContent>
              </Card>
            </div>
          </div>
          <div className={styles.right}>
            <div>
              <Card
                className={styles.card}
                style={{ height: "42vh", minHeight: "393.53px" }}
              >
                <CardContent
                  style={{
                    height: "100%",
                  }}
                >
                  {/* <p>double</p> */}
                  <DoubleState data={doubleData} />
                </CardContent>
              </Card>
            </div>
            <div>
              <Card
                className={styles.card}
                style={{ height: "42vh", minHeight: "393.53px" }}
              >
                <CardContent
                  style={{
                    height: "100%",
                  }}
                >
                  <IntState data={intData} />
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      ) : (
        <div>
          <Card
            className={styles.card}
            style={{
              height: "85vh",
              minHeight: "393.53px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              textAlign: "center",
            }}
          >
            <CardContent>
              {/* <Typography variant="h3">
                서버와 연결에 실패하였습니다.
              </Typography>
              <Typography>
                재연결시도...{Math.ceil(reconnectTimeLeft / 1000)}
              </Typography> */}
              <h2>서버와 연결에 실패하였습니다.</h2>
              <h4>재연결시도...{Math.ceil(reconnectTimeLeft / 1000)}</h4>
              <br />
              <Link href="/">홈으로가기</Link>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default State;
