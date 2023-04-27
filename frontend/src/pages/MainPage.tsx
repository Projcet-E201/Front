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

const MainPage = () => {
  const [selectedIndex, setSelectedIndex] = useRecoilState(indexAtom);
  const indexClick = (value: string) => {
    setSelectedIndex(value);
  };
  const navigate = useNavigate();
  const machines = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
  const [sensers, setSensers] = useState<string[]>([
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
    }, 10000);
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
    <div className={styles.senserdatacontent}>
      <div>Machine {machine}</div>
      <div className={styles.senserdatascore}>56</div>
    </div>
  ));

  const senserCards = sensers.map((senser, index) => (
    <Draggable
      key={`senser-${senser}`}
      draggableId={`senser-${senser}`}
      index={index}
    >
      {(provided) => (
        <Card
          className={styles.sensercard}
          ref={provided.innerRef}
          {...provided.draggableProps}
        >
          <h3
            className={styles.senserheader}
            {...provided.dragHandleProps}
            {...(index === 0 ? {} : { isDragDisabled: true })}
          >
            {senser}
          </h3>
          <CardContent>
            {machineData.map((data, dataIndex) => (
              <div
                key={`senserdata-${dataIndex}`}
                onClick={() =>
                  navigate(`/machine/${machines[dataIndex]}/${senser}`)
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
    const items = Array.from(sensers);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    setSensers(items.map((item, index) => `${item}`));
  };
  return (
    <MainLayout>
      <div
        style={{
          display: "flex",
        }}
      >
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            width: "54%",
            minHeight: "200px",
          }}
        >
          {machines.map((machine) => (
            <Card className={styles.maincard}>
              <div>
                <h3
                  className={styles.maincardtitle}
                  onClick={() => {
                    navigate(`/machine/${machine}`);
                    indexClick("Monitoring");
                  }}
                >
                  Machine {machine}
                </h3>
              </div>
              <CardContent
                style={{
                  lineHeight: "2.8rem",
                }}
              >
                <div className={styles.maincardcontent}>
                  <div className={styles.maincardcontentname}>압력</div>
                  <div className={styles.maincardcontentscore}>{data.압력}</div>
                </div>
                <div className={styles.maincardcontent}>
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
        </div>

        <DragDropContext onDragEnd={handleDragEnd}>
          <Droppable droppableId="sensers">
            {(provided) => (
              <div
                {...provided.droppableProps}
                ref={provided.innerRef}
                className={styles.senserdatastyle}
              >
                {senserCards}
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
