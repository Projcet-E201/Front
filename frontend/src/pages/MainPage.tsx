import { useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import MainLayout from "../layout/MainLayout";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import styles from "./MainPage.module.css";
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from "react-beautiful-dnd";
import { fontWeight } from "@mui/system";
import { useRecoilState } from "recoil";
import { indexAtom } from "../store/atoms";
import { faker } from "@faker-js/faker";
import MainError from "../components/MainError/MainError";

const MainPage = () => {
  const [selectedIndex, setSelectedIndex] = useRecoilState(indexAtom);
  const indexClick = (value: string) => {
    setSelectedIndex(value);
  };
  const navigate = useNavigate();
  const machines = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
  const [sensors, setsensors] = useState<string[]>([
    "motor",
    "vacuum",
    "air-in",
    "air-out-kpa",
    "air-out-mpa",
    "water",
    "abrasion",
    "load",
    "rpm",
  ]);

  const [currentPage, setCurrentPage] = useState<number>(1);
  const [data, setData] = useState<{ [key: string]: number }>({});

  useEffect(() => {
    const interval = setInterval(() => {
      setData({
        a: Math.floor(Math.random() * 301),
        b: Math.floor(Math.random() * 101),
        c: Math.floor(Math.random() * 901),
        d: -0.1 + Math.random() * 1.1,
        e: Math.floor(Math.random() * 901),
        f: Math.floor(Math.random() * 5),
        g: Math.floor(Math.random() * 41),
        h: Math.floor(Math.random() * 17),
        i: Math.floor(Math.random() * 50001),
        j: Math.floor(Math.random() * 101),
      });
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      const newValues: { [key: string]: number } = {};
      newValues["motor"] = data.a;
      newValues["압력"] = data.b;
      newValues["유량"] = data.f;
      setData({ ...data, ...newValues });
    }, 100);
    return () => clearInterval(interval);
  }, [data]);

  const machineData = machines.map((machine, index) => (
    <div className={styles.sensordatacontent} key={index}>
      <div>Machine {machine}</div>
      <div className={styles.sensordatascore}>56</div>
    </div>
  ));

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
        >
          <h3
            className={styles.sensorheader}
            {...provided.dragHandleProps}
            {...(index === 0 ? {} : { isdragdisabled: "true" })}
          >
            {sensor}
          </h3>
          <CardContent>
            {machineData.map((data, dataIndex) => (
              <div
                key={`sensordata-${dataIndex}`}
                onClick={() =>
                  navigate(`/machine/${machines[dataIndex]}/${sensor}`)
                }
              >
                {data}
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
  };
  return (
    <MainLayout>
      <div
        style={{
          display: "flex",
          maxHeight: "80vh",
          // justifyContent: "space-between",
        }}
      >
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            width: "54%",
          }}
        >
          {machines.map((machine, index) => (
            <Card className={styles.maincard} key={index}>
              <div>
                <h3
                  className={styles.maincardtitle}
                  onClick={() => {
                    navigate(`/machine/${machine}`);
                    indexClick("Monitoring");
                  }}
                  style={
                    data.j < 30
                      ? { backgroundColor: "red" }
                      : { backgroundColor: "#5e5e5e" }
                  }
                >
                  Machine {machine}
                </h3>
              </div>
              <CardContent
                style={{
                  lineHeight: "2.8em",
                }}
              >
                <div
                  className={styles.maincardcontent}
                  onClick={() => navigate(`/machine/${machine}/vacuum`)}
                >
                  <div className={styles.maincardcontentname}>압력</div>
                  <div className={styles.maincardcontentscore}>{data.압력}</div>
                </div>
                <div
                  className={styles.maincardcontent}
                  onClick={() => navigate(`/machine/${machine}/water`)}
                >
                  <div className={styles.maincardcontentname}>유량</div>
                  <div className={styles.maincardcontentscore}>{data.유량}</div>
                </div>
                <div
                  className={styles.maincardcontent}
                  onClick={() => navigate(`/machine/${machine}/motor`)}
                >
                  <div className={styles.maincardcontentname}>모터 가동</div>
                  <div className={styles.maincardcontentscore}>
                    {data.motor}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
          <Card className={styles.errorcard}>
            <CardContent
              style={{
                lineHeight: "2.8em",
              }}
            >
              <MainError />
            </CardContent>
          </Card>
        </div>

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
    </MainLayout>
  );
};

export default MainPage;
