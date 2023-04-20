import React from "react";
import { useNavigate } from "react-router-dom";

import styles from "./Sensor.module.css";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";

import CardMotorChart from "./CardChart/CardMotorChart";
import CardVacuumChart from "./CardChart/CardVacuumCart";

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
                {/* {index === 0 ? (
                  <CardMotorChart h={"22.5vh"} />
                ) : (
                  <div style={{ width: "auto", height: "22.5vh" }}>
                    <h3 style={{ margin: "0" }}>Vacuum</h3>
                    <CardVacuumChart />
                  </div>
                )} */}
                {index === 0 && (
                  <div onClick={() => navigate(`motor`)}>
                    <h3 style={{ margin: "0" }}>Motor Toque(%)</h3>
                    <CardMotorChart h={"22.5vh"} />
                  </div>
                )}
                {index === 1 && (
                  <div onClick={() => navigate(`air-in`)}>
                    <h3 style={{ margin: "0" }}>Air입력(kPa)</h3>
                    <CardMotorChart h={"22.5vh"} />
                  </div>
                )}
                {index === 2 && (
                  <div
                    onClick={() => navigate(`vacuum`)}
                    style={{ width: "auto", height: "22.5vh" }}
                  >
                    <h3 style={{ margin: "0" }}>Vacuum입력(kPa)</h3>
                    <CardVacuumChart />
                  </div>
                )}
                {index === 3 && (
                  <div
                    onClick={() => navigate(`air-out1`)}
                    style={{ width: "auto", height: "22.5vh" }}
                  >
                    <h3 style={{ margin: "0" }}>Air출력(kPa)</h3>
                    <CardVacuumChart />
                  </div>
                )}
                {index === 4 && (
                  <div
                    onClick={() => navigate(`air-out2`)}
                    style={{ width: "auto", height: "22.5vh" }}
                  >
                    <h3 style={{ margin: "0" }}>Air출력(MPa)</h3>
                    <CardVacuumChart />
                  </div>
                )}
                {index === 5 && (
                  <div
                    onClick={() => navigate(`water`)}
                    style={{ width: "auto", height: "22.5vh" }}
                  >
                    <h3 style={{ margin: "0" }}>Water출력(L/min)</h3>
                    <CardVacuumChart />
                  </div>
                )}
                {index === 6 && (
                  <div
                    onClick={() => navigate(`abrasion`)}
                    style={{ width: "auto", height: "22.5vh" }}
                  >
                    <h3 style={{ margin: "0" }}>기구부 마모량(mm)</h3>
                    <CardVacuumChart />
                  </div>
                )}
                {index === 7 && (
                  <div
                    onClick={() => navigate(`load`)}
                    style={{ width: "auto", height: "22.5vh" }}
                  >
                    <h3 style={{ margin: "0" }}>기구부 부하량(Ampere)</h3>
                    <CardVacuumChart />
                  </div>
                )}
                {index === 8 && (
                  <div
                    onClick={() => navigate(`rpm`)}
                    style={{ width: "auto", height: "22.5vh" }}
                  >
                    <h3 style={{ margin: "0" }}>기구부 회전속도(/min)</h3>
                    <CardVacuumChart />
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Sensor;
