import React from "react";
import { useNavigate, useParams } from "react-router-dom";

import SensorLayout from "../../layout/SensorLayout";
import MotorChart from "../../components/Chart/MotorChart";

import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";

import styles from "./MotorPage.module.css";

const MotorPage = () => {
  const { machine } = useParams();
  const navigate = useNavigate();

  const motors = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  return (
    <SensorLayout>
      <div>
        {/* <button onClick={() => navigate(-1)}>메인페이지</button> */}
      </div>
      <div>
        <div onClick={() => navigate(`/machine/${machine}`)}>
          <span>메인페이지</span>
        </div>
        <h3>모터 페이지</h3>
        <div style={{ display: "flex" }}>
          {motors.map((motorId) => (
            <div key={motorId}>
              <button
                onClick={() => navigate(`/machine/${machine}/motor/${motorId}`)}
              >
                {motorId}
              </button>
            </div>
          ))}
        </div>
        <div>
          <Card className={styles.card}>
            <CardContent style={{ height: "40vh" }}>
              <MotorChart h={"25rem"} />
            </CardContent>
          </Card>
        </div>
      </div>
    </SensorLayout>
  );
};

export default MotorPage;
