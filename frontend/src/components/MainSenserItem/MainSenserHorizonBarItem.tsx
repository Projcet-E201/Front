import { useNavigate } from "react-router-dom";
import React, { useCallback, useEffect, useRef, useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import styles from "./MainSenserHorizonBarItem.module.css";
import SensorHorizonBarChart from "../Chart/MainChart/SensorHorizonBarChart";
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from "react-beautiful-dnd";
import { ResponsiveBar } from "@nivo/bar";

export type SenserPropsType = {
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

type MainSenserItemProps = {
  clientData: SenserPropsType;
};

const MainSenserHorizonBarItem = (props: MainSenserItemProps) => {
  const navigate = useNavigate();
  const savedSensorOrder = localStorage.getItem("sensorOrder");
  const [sensors, setsensors] = useState<string[]>(
    savedSensorOrder
      ? JSON.parse(savedSensorOrder)
      : [
          "MOTOR",
          "VACUUM",
          "AIR_IN_KPA",
          "AIR_OUT_KPA",
          "AIR_OUT_MPA",
          "WATER",
          "ABRASION",
          "LOAD",
          "VELOCITY",
        ]
  );

  interface SensorAddressMap {
    [key: string]: string;
  }

  const sensorAddressMap: SensorAddressMap = {
    MOTOR: "motor",
    VACUUM: "vacuum",
    AIR_IN_KPA: "air-in",
    AIR_OUT_KPA: "air-out-kpa",
    AIR_OUT_MPA: "air-out-mpa",
    WATER: "water",
    ABRASION: "abrasion",
    LOAD: "load",
    VELOCITY: "velocity",
  };

  const sensorCards = sensors.map((sensor, index) => {
    const chartData = Object.entries(props.clientData).map(
      ([key, data], chartindex) => ({
        key: chartindex,
        id: key,
        [sensor]: data[sensor as keyof typeof data],
      })
    );

    return (
      <Draggable
        key={`sensor-${sensor}`}
        draggableId={`sensor-${sensor}`}
        index={index}
      >
        {(provided) => (
          <Card
            className={styles.sensorcard}
            ref={provided.innerRef}
            {...provided.draggableProps}
          >
            <h3
              className={styles.sensorheader}
              {...provided.dragHandleProps}
              {...(index === 0 ? {} : { isdragdisabled: "true" })}
            >
              {sensor === "MOTOR"
                ? "모터 가동"
                : sensor === "VACUUM"
                ? "압력"
                : sensor === "AIR_IN_KPA"
                ? "공기 주입"
                : sensor === "AIR_OUT_KPA"
                ? "공기 출력 (kPa)"
                : sensor === "AIR_OUT_MPA"
                ? "공기 출력 (MPa)"
                : sensor === "WATER"
                ? "유량"
                : sensor === "ABRASION"
                ? "마모량"
                : sensor === "LOAD"
                ? "부하량"
                : "회전 속도"}
            </h3>
            <CardContent style={{ height: "32vh" }}>
              <SensorHorizonBarChart data={chartData} sensor={sensor} />
            </CardContent>
          </Card>
        )}
      </Draggable>
    );
  });

  const handleDragEnd = (result: DropResult) => {
    if (!result.destination) return;
    const items = Array.from(sensors);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    setsensors(items.map((item, index) => `${item}`));

    // Save the updated sensor order to local storage
    localStorage.setItem("sensorOrder", JSON.stringify(items));
  };

  return (
    <div>
      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="sensors">
          {(provided) => (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
              className={styles.sensordatastyle}
            >
              {sensorCards}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
};

export default MainSenserHorizonBarItem;
