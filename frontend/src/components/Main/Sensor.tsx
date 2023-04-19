import React from "react";
import { useNavigate } from "react-router-dom";

import styles from "./Sensor.module.css";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";

import MotorChart from "../Chart/MotorChart";
import VacuumChart from "../Chart/VacuumChart";

const Sensor = () => {
  const navigate = useNavigate();
  const repeat = [1, 2, 3, 4, 5, 6, 7, 8, 9];

  return (
    <div>
      <div>
        {/* <h3>센서 컴포넌트 입니다.</h3> */}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "space-between",
          }}
        >
          {repeat.map((item, index) => (
            <Card
              key={index}
              className={
                index < 2
                  ? styles.topcard
                  : index >= 2 && index < 5
                  ? styles.midcard
                  : styles.botcard
              }
              // onClick={() => navigate("/")}
            >
              <CardContent>
                <MotorChart h={"23vh"} />
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Sensor;
