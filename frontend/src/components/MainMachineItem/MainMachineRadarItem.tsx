import { useNavigate } from "react-router-dom";
import React, { useCallback, useEffect, useRef, useState } from "react";
import MachineRadarChart from "../Chart/MainChart/MachineRadarChart";
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

type MainMachineItemProps = {
  clientData: MachinePropsType;
};

const MainMachineRadarItem = (props: MainMachineItemProps) => {
  const navigate = useNavigate();

  // 추출할 데이터를 배열로 변환합니다.
  const radarData = Object.entries(props.clientData).map(([key, data]) => ({
    id: key,
    SCORE: data.SCORE,
  }));

  // radarData 배열들을 하나의 큰 배열로 모읍니다.
  const mergedRadarData = radarData.flat();

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
          display: "Flex",
          padding: "0",
          overflow: "auto",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div
          style={{
            width: `90%`,
            height: "90%",
            margin: "auto",
            padding: "0",
          }}
        >
          <MachineRadarChart data={mergedRadarData} />
        </div>
      </CardContent>
    </Card>
  );
};

export default MainMachineRadarItem;
