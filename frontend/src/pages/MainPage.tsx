import React from "react";
import { useNavigate } from "react-router-dom";

import MainLayout from "../layout/MainLayout";

import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";

import styles from "./MainPage.module.css";

const MainPage = () => {
  const navigate = useNavigate();
  const machines = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
  return (
    <MainLayout>
      <div style={{ width: "100%" }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: "1rem",
            // display: "flex",
            // width: "20%",
          }}
        >
          {machines.map((machine) => (
            <Card
              key={machine}
              className={styles.card}
              style={{ width: "100%" }}
            >
              <CardContent>
                <button onClick={() => navigate(`/machine/${machine}`)}>
                  머신{machine} ㄱㄱ
                </button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </MainLayout>
  );
};

export default MainPage;
