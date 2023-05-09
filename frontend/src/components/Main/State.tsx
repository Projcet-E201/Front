import React, { useState, useEffect, useCallback } from "react";

import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { useParams } from "react-router-dom";

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
  const { machine = "" } = useParams();
  const [stompClient, setStompClient] = useState<Stomp.Client | null>(null);
  const [message, setMessage] = useState<any>();

  const [booleanData, setBooleanData] = useState<any[]>([]);
  const [stringData, setStringData] = useState<any[]>([]);
  const [intData, setIntData] = useState<any[]>([]);
  const [doubleData, setDoubleData] = useState<any[]>([]);

  // const connectUrl = "https://k8e201.p.ssafy.io:8091/ws";
  const connectUrl = "http://localhost:8091/ws";

  const disconnetWebSocket = useCallback(() => {
    if (stompClient) {
      stompClient.disconnect(() => "");
      setStompClient(null);
    }
  }, [stompClient]);

  const connectWebsocket = () => {
    disconnetWebSocket();

    const socket = new SockJS(connectUrl);
    const stompClient = Stomp.over(socket);
    stompClient.connect(
      {},
      () => {
        setStompClient(stompClient);
      },
      (err) => {
        console.error(err);
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
    return () => {
      if (stompClient) {
        disconnetWebSocket();
      }
    };
  }, []);

  useEffect(() => {
    console.log(booleanData, "zzzzzzzzzzzzzzzzzzzz");
    if (stompClient) {
      stompClient.subscribe(`/client/machine/state`, (data) => {
        const parsedData = JSON.parse(data.body);

        if (parsedData === Object) {
          // 수정된 부분
          setMessage(parsedData);

          const booleanDataArray = new Array(10).fill(null);
          for (const [key, value] of Object.entries(parsedData[0])) {
            if (key.startsWith("boolean")) {
              const id = parseInt(key.slice(7));
              booleanDataArray[id - 1] = { id: id, value: value };
            }
          }
          setBooleanData(booleanDataArray);

          const intDataArray = new Array(10).fill(null);
          for (const [key, value] of Object.entries(parsedData[2])) {
            if (key.startsWith("int")) {
              const id = parseInt(key.slice(3));
              intDataArray[id - 1] = {
                id: key,
                name: `I${id}`,
                value: value,
                color: "#000000",
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
                color: "#000000",
              };
            }
          }
          setDoubleData(doubleDataArray);
        }
      });
    }
  }, [stompClient]);

  // 주소 바뀌면 새로 가져오깅
  useEffect(() => {
    setBooleanData([]);
    setIntData([]);
    setDoubleData([]);
  }, [machine]);

  useEffect(() => {
    if (stompClient) {
      handleGetState();
    }
  }, [stompClient]);

  const firstHalf = booleanData.slice(0, 5);
  const secondHalf = booleanData.slice(5, 10);

  return (
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
              <CardContent>
                {/* <p>bool 5개</p> */}
                {/* {JSON.stringify(booleanData)} */}
                <BooleanState data={firstHalf} />
              </CardContent>
            </Card>
          </div>
          <div>
            {/* <p>bool 2</p> */}
            <Card
              className={styles.card}
              style={{ height: "17vh", minHeight: "159.28px" }}
            >
              <CardContent>
                <BooleanState data={secondHalf} />
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
            <CardContent>
              {/* <p>string type</p> */}
              <StringState />
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
            <CardContent style={{ height: "40vh" }}>
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
            <CardContent style={{ height: "40vh" }}>
              {/* <p>int type</p> */}
              <IntState data={intData} />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default State;
