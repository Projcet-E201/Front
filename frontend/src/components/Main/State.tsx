import React, { useState, useEffect } from "react";

import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";

import styles from "./State.module.css";

// 각 컴포넌트 불러오기
import BooleanState from "./StateComponents/BooleanState";
import StringState from "./StateComponents/StringState";
import DoubleState from "./StateComponents/DoubleState";
import IntState from "./StateComponents/IntState";

const State = () => {
  const [booleanData, setBooleanData] = useState([
    { id: 1, value: true },
    { id: 2, value: false },
    { id: 3, value: false },
    { id: 4, value: true },
    { id: 5, value: false },
    { id: 6, value: true },
    { id: 7, value: false },
    { id: 8, value: true },
    { id: 9, value: true },
    { id: 10, value: false },
  ]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setBooleanData(
        booleanData.map((data) => ({
          id: data.id,
          value: Math.random() >= 0.5,
        }))
      );
    }, 5000);

    return () => clearInterval(intervalId);
  }, []);

  const firstHalf = booleanData.slice(0, 5);
  const secondHalf = booleanData.slice(5, 10);

  // console.log(firstHalf);
  // console.log(secondHalf);

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
            style={{ height: "30vh", minHeight: "468.5px" }}
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
            style={{ height: "43vh", minHeight: "393.53px" }}
          >
            <CardContent style={{ height: "42vh" }}>
              <DoubleState />
            </CardContent>
          </Card>
        </div>
        <div>
          <Card
            className={styles.card}
            style={{ height: "43vh", minHeight: "393.53px" }}
          >
            <CardContent style={{ height: "42vh" }}>
              {/* <p>int type</p> */}
              <IntState />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default State;
