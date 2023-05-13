import React, { useState, useEffect, useCallback } from "react";

import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { useParams } from "react-router-dom";

import { Link } from "@mui/material";

import styles from "./State.module.css";

// 각 컴포넌트 불러오기
import BooleanState from "./StateComponents/BooleanState";
import StringState from "./StateComponents/StringState";
import DoubleState from "./StateComponents/DoubleState";
import IntState from "./StateComponents/IntState";

import axios from "axios";

const State = () => {
  const { machine = "" } = useParams();

  const [booleanData, setBooleanData] = useState<any[]>([]);
  const [stringData, setStringData] = useState<any[]>([]);
  const [intData, setIntData] = useState<any[]>([]);
  const [doubleData, setDoubleData] = useState<any[]>([]);

  const [error, setError] = useState<any>();
  const [reconnectTimer, setReconnectTimer] = useState<any>();
  const [reconnectTimeLeft, setReconnectTimeLeft] = useState<number>(0);

  const getStateData = () => {
    console.log("ㄱㄱㄱㄱ");
    axios
      // .get(`https://semse.info/api/machine/${machine}/state`)
      .get(`http://localhost:8091/api/machine/${machine}/state`)
      .then((response) => {
        console.log(response.data, "datadata", `${machine}`);
        // Boolean Data 정렬

        const booleanDataArray = new Array(10).fill(null);
        for (const [key, value] of Object.entries(response.data[0])) {
          if (key.startsWith("boolean")) {
            const id = parseInt(key.slice(7));
            booleanDataArray[id - 1] = { id: id, value: value };
          }
        }

        setBooleanData(booleanDataArray);

        const doubleDataArray = new Array(10).fill(null);
        for (const [key, value] of Object.entries(response.data[1])) {
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

        const intDataArray = new Array(10).fill(null);
        for (const [key, value] of Object.entries(response.data[2])) {
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

        const stringDataArray = new Array(10).fill(null);
        for (const [key, value] of Object.entries(response.data[3])) {
          if (key.startsWith("string")) {
            const id = parseInt(key.slice(6));
            const { value: itemValue, time } = value as {
              value: any;
              time: any;
            };
            stringDataArray[id - 1] = {
              id: key + 1,
              value: itemValue,
              time,
            };
          }
        }
        setStringData(stringDataArray);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setError("error");
        let timeLeft = 5000;
        const timer = setInterval(() => {
          timeLeft -= 1000;
          setReconnectTimeLeft(timeLeft);
          if (timeLeft <= 0) {
            clearInterval(timer);
            getStateData();
            setError("");
          }
        }, 1000);
      });
  };

  useEffect(() => {
    getStateData();

    const interval = setInterval(() => {
      getStateData();
    }, 5000);

    return () => {
      clearInterval(interval);
      clearInterval(reconnectTimer);
      setBooleanData([]);
      setIntData([]);
      setDoubleData([]);
      setStringData([]);
    };
  }, [machine]);

  return (
    <div>
      {error !== "error" ? (
        <div className={styles.state}>
          <div className={styles.left}>
            <div className={styles.boolean}>
              <div>
                <Card
                  className={styles.card}
                  style={{ height: "17vh", minHeight: "159.28px" }}
                >
                  <CardContent
                    sx={{
                      height: "100%",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <BooleanState
                      // data={firstHalf}
                      data={booleanData.slice(0, 5)}
                      error={error}
                      time={reconnectTimeLeft}
                    />
                  </CardContent>
                </Card>
              </div>
              <div>
                <Card
                  className={styles.card}
                  style={{ height: "17vh", minHeight: "159.28px" }}
                >
                  <CardContent
                    sx={{
                      height: "100%",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <BooleanState
                      // data={secondHalf}
                      data={booleanData.slice(5, 10)}
                      error={error}
                      time={reconnectTimeLeft}
                    />
                  </CardContent>
                </Card>
              </div>
            </div>
            <div className={styles.string}>
              <Card
                className={styles.card}
                style={{ height: "50vh", minHeight: "468.5px" }}
              >
                <CardContent
                  sx={{
                    height: "100%",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
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
