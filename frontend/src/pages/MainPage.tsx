import React from "react";
import { useNavigate } from "react-router-dom";

import MainLayout from "../layout/MainLayout";

import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";

const MainPage = () => {
  const navigate = useNavigate();
  const machines = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
  return (
    <MainLayout>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-between",
        }}
      >
        {machines.map((machine) => (
          <Card>
            <CardContent>
              <button onClick={() => navigate(`/machine/${machine}`)}>
                머신{machine} ㄱㄱ
              </button>
            </CardContent>
          </Card>
        ))}
      </div>
    </MainLayout>
  );
};

export default MainPage;
