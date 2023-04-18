import React from "react";

import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";

import styles from "./State.module.css";

const State = () => {
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
                <p>bool 5개</p>
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
                <p>bool 5개</p>
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
              <p>string type</p>
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
            <CardContent>
              <p>double</p>
            </CardContent>
          </Card>
        </div>
        <div>
          <Card
            className={styles.card}
            style={{ height: "42vh", minHeight: "393.53px" }}
          >
            <CardContent>
              <p>int type</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default State;
