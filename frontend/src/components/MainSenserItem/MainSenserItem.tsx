import { useNavigate } from "react-router-dom";
import React, { useCallback, useEffect, useRef, useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import styles from "./MainSenserItem.module.css";
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from "react-beautiful-dnd";

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
    // SCORE: number;
  };
};

type MainSenserItemProps = {
  clientData: SenserPropsType;
};

const MainSenserItem = (props: MainSenserItemProps) => {
  const navigate = useNavigate();
  const machines = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
  const [sensors, setsensors] = useState<string[]>([
    "MOTOR",
    "VACUUM",
    "AIR_IN_KPA",
    "AIR_OUT_KPA",
    "AIR_OUT_MPA",
    "WATER",
    "ABRASION",
    "LOAD",
    "VELOCITY",
  ]);

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

  const sensorCards = sensors.map((sensor, index) => (
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
          {...provided.dragHandleProps}
        >
          <h3
            className={styles.sensorheader}
            {...(index === 0 ? {} : { isdragdisabled: "true" })}
          >
            {sensor}
          </h3>
          <CardContent>
            {Object.entries(props.clientData).map(([key, data], dataIndex) => (
              <div
                className={styles.sensordatacontent}
                key={`sensordata-${dataIndex}`}
                onClick={() =>
                  navigate(
                    `/machine/${machines[dataIndex]}/${sensorAddressMap[sensor]}`
                  )
                }
              >
                <div>{key}</div>
                <div className={styles.sensordatascore}>
                  {data[sensor as keyof typeof data]}
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      )}
    </Draggable>
  ));

  const handleDragEnd = (result: DropResult) => {
    if (!result.destination) return;
    const items = Array.from(sensors);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    setsensors(items.map((item, index) => `${item}`));

    // Save the updated sensor order to local storage
    localStorage.setItem("sensorOrder", JSON.stringify(items));

    // Rest of your code
  };

  useEffect(() => {
    // Load the sensor order from local storage on component mount
    const savedSensorOrder = localStorage.getItem("sensorOrder");
    if (savedSensorOrder) {
      const parsedOrder = JSON.parse(savedSensorOrder);
      setsensors(parsedOrder);
    }
  }, []);

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

export default MainSenserItem;
