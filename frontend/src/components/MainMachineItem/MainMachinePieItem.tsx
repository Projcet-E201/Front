import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import MachineBarChart from "../Chart/MainChart/MachineBarChart";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";

export type MachinePropsType = {
  [key: string]: {
    MOTOR: number;
    VACUUM: number;
    AIR_IN_KPA: number;
    AIR_OUT_KPA: number;
    AIR_OUT_MPA: number;
    WATER: number;
    ABRASION: number;
    LOAD: number;
    VELOCITY: number;
    SCORE: number;
  };
};

type MainMachinePieItemProps = {
  clientData: MachinePropsType;
};

const MainMachinePieItem = ({ clientData }: MainMachinePieItemProps) => {
  const navigate = useNavigate();

  // 추출할 데이터를 배열로 변환합니다.
  const pieData = Object.entries(clientData).map(([key, data]) => ({
    id: key,
    value: data.LOAD,
  }));

  return (
    <Card
      style={{
        margin: "0.5em",
        width: "calc(96% - 1em)",
        height: "73.1%",
      }}
    >
      <CardContent
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          padding: "0",
          overflow: "auto",
        }}
      >
        <div
          style={{
            margin: "auto",
            width: "100%",
            height: "100%",
            padding: "0",
          }}
        >
          <MachineBarChart data={pieData} />
        </div>
      </CardContent>
    </Card>
  );
};

export default MainMachinePieItem;
