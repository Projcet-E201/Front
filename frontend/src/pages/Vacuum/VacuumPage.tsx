import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import VacuumChart from "../../components/Chart/VacuumChart";

import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";

import SensorLayout from "../../layout/SensorLayout";

import styles from "./VacuumPage.module.css";

const VacuumPage = () => {
  const { machine } = useParams();
  const navigate = useNavigate();

  const vacuums = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  return (
    <SensorLayout>
      <div>
        {/* <button onClick={() => navigate(-1)}>메인페이지</button> */}
      </div>
      <div>
        <div onClick={() => navigate(`/machine/${machine}`)}>
          <span>메인페이지</span>
        </div>
        <h3>Vacuum 페이지</h3>
        <div style={{ display: "flex" }}>
          {vacuums.map((vacuumId) => (
            <div key={vacuumId}>
              <button
                onClick={() =>
                  navigate(`/machine/${machine}/vacuum/${vacuumId}`)
                }
              >
                {vacuumId}
              </button>
            </div>
          ))}
        </div>
        <div>
          <Card className={styles.card}>
            <CardContent style={{ height: "40vh" }}>
              <VacuumChart />
            </CardContent>
          </Card>
        </div>
      </div>
    </SensorLayout>
  );
};

export default VacuumPage;
