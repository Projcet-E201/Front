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
    <div>
      {/* <div style={{ border: "3px solid red", width: "fit-content" }}>
        <h3>일단 쉽게 이동하려고 만든 버튼들(나중에 없애기)</h3>
        <div style={{ display: "flex" }}>
          <button onClick={() => navigate("/motor")}>Motor</button>
          <button onClick={() => navigate("/vacuum")}>Vacuum</button>
          <button onClick={() => navigate("/air-out1")}>AirOut1</button>
          <button onClick={() => navigate("/air-out2")}>AirOut2</button>
          <button onClick={() => navigate("/air-in")}>AirIn</button>
          <button onClick={() => navigate("/water")}>Water</button>
          <button onClick={() => navigate("/abrasion")}>abrasionlose</button>
          <button onClick={() => navigate("/load")}>loadingDose</button>
          <button onClick={() => navigate("/rpm")}>RPM</button>
        </div>
      </div> */}
      <div style={{ border: "2px solid yellow" }}>
        <h3>센서 컴포넌트 입니다.</h3>
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
              className={styles.card}
              onClick={() => navigate("/motor")}
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
