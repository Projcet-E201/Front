import React from "react";
import { useNavigate } from "react-router-dom";

import styles from "./Sensor.module.css";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";

import MotorChart from "../Chart/MotorChart";

const Sensor = () => {
  const navigate = useNavigate();
  const repeat = [1, 2, 3, 4, 5, 6, 7, 8];

  return (
    <div style={{ display: "flex", justifyContent: "center", width: "100%" }}>
      <div>
        {/* <h3>센서 컴포넌트 입니다.</h3> */}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            // gap: "1rem",
            justifyContent: "space-around",
          }}
        >
          {repeat.map((item, index) => (
            <Card
              key={index}
              className={styles.card}
              // onClick={() => navigate("/")}
            >
              <CardContent>
                <MotorChart h={"15rem"} />
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Sensor;
